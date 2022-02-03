const { Event } = require("../models/Event");
const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { UserInputError } = require("apollo-server-express");
const { ApolloServer, UserInputError } = require("apollo-server");
const checkAuth = require("../utils/checkAuth");
const { passRecoveryEmail } = require("../API/mailer/mailer");

const secret = process.env.SECRET;

const resolvers = {
  Query: {
    //RETURNS ALL EVENTS
    async getEvents(_, args, context) {
      try {
        // checkAuth(context);
        // TODO: comment in checkAuth;
        const events = await Event.find(); //TODO: order them by start date
        return events;
      } catch (err) {
        throw new Error(err);
      }
    },
    //GET SPECIFIC EVENT
    async getEvent(_, { id }, context) {
      try {
        checkAuth(context);
        const event = await Event.findOne({ _id: id });
        return event;
      } catch (err) {
        throw new Error(err);
      }
    },

    //GET ALL USERS
    async getUsers(_, args, context) {
      try {
        // checkAuth(context);
        const users = await User.find(); //{}, { password: 0 }
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },

    //GET SPECIFIC USER
    async getUser(_, { id }, context) {
      try {
        checkAuth(context);
        const user = await User.findOne({ _id: id });
        return user;
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    //CREATE NEW USER
    async createUser(_, { username, email, password }) {
      password = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        username: username.toLowerCase().trim(),
        password: password,
        email: email.toLowerCase().trim(),
      });

      return newUser;
    },

    //CREATE NEW EVENT
    createEvent: (
      _,
      {
        ev_organizer,
        ev_name,
        ev_type,
        ev_language,
        ev_online,
        // ev_start_date,
        // ev_end_date,
        ev_location,
        ev_description,
        ev_max_participants,
      },
      context
    ) => {
      //checkAuth(context);
      const newEvent = Event.create({
        ev_organizer,
        ev_name,
        ev_type,
        ev_language,
        ev_online,
        // ev_start_date,
        // ev_end_date,
        ev_location,
        ev_description,
        ev_max_participants,
        ev_participants: [ev_organizer],
      });

      return newEvent;
    },

    //USER LOGIN
    async login(_, { username, password }, { req, res }) {
      const user = await User.findOne({ username });

      if (!user) {
        throw new UserInputError("Incorrect username or password");
      }

      const passCheck = await bcrypt.compare(password, user.password);

      if (!passCheck) {
        throw new UserInputError("Incorrect username or password");
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        secret,
        { expiresIn: "1h" }
      );

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    //USER INFO UPDATE
    async changeInfoUser(
      _,
      { userId, username, email, password, profile_pic }
    ) {
      const props = {};
      username !== "" ? (props.username = username.toLowerCase().trim()) : true;
      email !== "" ? (props.email = email.toLowerCase().trim()) : true;
      password !== "" ? (props.password = password) : true;
      profile_pic !== "" ? (props.profile_pic = profile_pic) : true;

      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $set: props },
        { returnOriginal: false }
      );

      return user;
    },

    //PASSWORD RECOVERY
    async passRecovery(_, { email }) {
      const user = await User.findOne({ email });

      if (!user) throw new Error("User does not exist");

      const passSecret = secret + user.password;

      const payload = {
        id: user._id,
        email: user.email,
      };

      const emailToken = jwt.sign(payload, passSecret, { expiresIn: "15m" });
      const link = `http://localhost:3000/password-reset/${user.id}/${emailToken}`;

      //add token to user object
      const addToken = await User.findOneAndUpdate(
        { _id: user.id },
        { $set: { token: emailToken } }
      );

      passRecoveryEmail(user.email, link);
      //TODO: react. Add message 'email has been sent'

      return addToken; //it's working
    },

    //PASSWORD RESET
    async passwordReset(_, { id, token, password }) {
      const user = await User.findById({ _id: id });

      if (!user) throw new Error("User does not exist");

      const passSecret = secret + user.password;

      try {
        const payload = jwt.verify(token, passSecret);
        password = await bcrypt.hash(password, 10);
        await User.findOneAndUpdate({ _id: id }, { $set: { password } });
        return "Password updated";
      } catch (error) {
        console.log(error);
      }
    },

    //DELETE USER
    async deleteUser(_, { id }, context) {
      //checkAuth(context);
      const user = await User.deleteOne({ _id: id });
      //TODO: add logic (can't always return success)
      return "User deleted";
    },

    //DELETE EVENT
    async deleteEvent(_, { id }, context) {
      //checkAuth(context);
      const event = await Event.deleteOne({ _id: id });
      if (event.deletedCount === 0) throw new Error("Event doesn't exist");
      //TODO: add send email, then return
      return "Event deleted";
    },

    //USER EVENT SIGNUP
    async attend(_, { userId, eventId }, context) {
      //checkAuth(context);
      const check = await User.findOne({ _id: userId });
      if (check.attendingEvents.includes(eventId)) {
        const attend = await User.updateOne(
          { _id: userId },
          {
            $pull: {
              attendingEvents: eventId,
            },
          }
        );

        const event = await Event.updateOne(
          { _id: eventId },
          {
            $pull: {
              ev_participants: userId,
            },
          }
        );
      } else {
        const attend = await User.updateOne(
          { _id: userId },
          {
            $push: {
              attendingEvents: eventId,
            },
          }
        );

        const event = await Event.updateOne(
          { _id: eventId },
          {
            $push: {
              ev_participants: userId,
            },
          }
        );
      }

      return "Operation successful";
    },
  },
};

module.exports = { resolvers };
