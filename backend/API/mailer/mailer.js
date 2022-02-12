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
      text: `Hey there, Geek!\nYou are receiving this email because you (or perhaps your evil twin) have requested a password recovery link like this bad boy down here:\n${link}\nThe link expires in 15 minutes, so you have time to get some coffee, but don't forget about it or you will have to request a new link.\nIf you didn't request a password recovery link, feel free to delete this email and get all paranoid about who could possibly want to get into your account. It's probably just someone who wrote their own email wrong when requesting the link... Or is it?\n\nKeep on geeking on!\nThe GeekOut team`,
      html: `<h2>Hey there, Geek!</h2>You are receiving this email because you (or perhaps your evil twin) have requested a password recovery link, like this bad boy down here:<br><br>${link}<br><br>The link expires in 15 minutes, so you have time to get some coffee, but don't forget about it or you will have to request a new link.<br><br>If you didn't request a password recovery link, feel free to delete this email and get all paranoid about who could possibly want to get into your account. It's probably just someone who wrote their own email wrong when requesting the link... Or is it?<br><br>Keep on geeking on!<br>The GeekOut team`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

async function eventSignUpEmail(userEmail, event) {
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

    if (event.ev_online === true) {
      event.ev_online = "In person event";
    } else {
      event.ev_online = "Online event";
    }

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: userEmail,
      subject: `GeekOut: Sign up for ${event.ev_name}`,
      text: `Hey there, Geek!\nYou are receiving this email to confirm your signup to the below event:\n\nEvent: ${event.ev_name}\nStart date: ${event.ev_start_date}\nEnd date: ${event.ev_end_date}\n${event.ev_online}\nLocation: ${event.ev_location}\nEvent description: ${event.ev_description}\n\nThe event sounds awesome if you ask me, but if you change your mind about or can't attend for any reason, please consider unsubscribing for the event on the website. That will allow people in the waiting list to attend in your place, and everyone will have fun.\n\nKeep on geeking on!\nThe GeekOut team`,
      html: `<h2>Hey there, Geek!</h2>You are receiving this email to confirm your signup to the below event:<br/><br/><h3>${event.ev_name}</h3>Start date: ${event.ev_start_date}<br/>End date: ${event.ev_end_date}<br/>${event.ev_online}<br/>Location: ${event.ev_location}<br/>Event description: ${event.ev_description}<br/><br/>The event sounds awesome if you ask me, but if you change your mind about it or can't attend for any reason, please consider unsubscribing from the event on the website. That will allow people in the waiting list to attend in your place, and everyone will have fun.<br/><br/>Keep on geeking on!<br/>The GeekOut team`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

async function eventCancellationEmail(userEmail, event) {
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
      subject: `GeekOut: Cancellation of the event ${event.ev_name}`,
      text: `Hey there, Geek!\n\nWe are sad to inform you that the below event has been cancelled:\n\nEvent: ${event.ev_name}\nStart date: ${event.ev_start_date}\nEnd date: ${event.ev_end_date}\n${event.ev_online}\nLocation: ${event.ev_location}\nEvent description: ${event.ev_description}\n\nIt's always a pity to see an event cancelled, but hey, this could be your chance to organize your own event! Head to the site and make the kind of awesome event you like to attend. Be the geek you want see in the world :)\n\nKeep on geeking on!\nThe GeekOut team`,
      html: `<h2>Hey there, Geek!</h2>We are sad to inform you that the below event has been cancelled:<br/><br/><h3>${event.ev_name}</h3>Start date: ${event.ev_start_date}<br/>End date: ${event.ev_end_date}<br/>${event.ev_online}<br/>Location: ${event.ev_location}<br/>Event description: ${event.ev_description}<br/><br/>It's always a pity to see an event cancelled, but hey, this could be your chance to organize your own event! Head to the site and make the kind of awesome event you like to attend. Be the geek you want see in the world :)<br/><br/>Keep on geeking on!<br/>The GeekOut team`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

module.exports = {
  passRecoveryEmail,
  eventSignUpEmail,
  eventCancellationEmail,
};
