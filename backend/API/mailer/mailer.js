const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function passRecoveryEmail(userEmail, link) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "oAuth2",
        user: process.env.EMAIL_ADDRESS,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: userEmail,
      subject: "GeekOut: Password recovery",
      text: `Hey there, Geek! You are receiving this email because you (or perhaps your evil twin) have requested a password recovery link like this bad boy down here:\n${link}\nThe link expires in 15 minutes, so you have time to get some coffee, but don't forget about it or you will have to request a new link.\nIf you didn't request a password recovery link, feel free to delete this email and get all paranoid about who could possibly want to get into your account. It's probably just someone who wrote their own email wrong when requesting the link... Or is it?\n\nKeep on geeking on!\nThe GeekOut team`,
      html: `<h2>Hey there, Geek!</h2><br>You are receiving this email because you (or perhaps your evil twin) have requested a password recovery link, like this bad boy down here:<br><br>${link}<br><br>The link expires in 15 minutes, so you have time to get some coffee, but don't forget about it or you will have to request a new link.<br><br>If you didn't request a password recovery link, feel free to delete this email and get all paranoid about who could possibly want to get into your account. It's probably just someone who wrote their own email wrong when requesting the link... Or is it?<br><br>Keep on geeking on!<br>The GeekOut team`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

module.exports = { passRecoveryEmail };
