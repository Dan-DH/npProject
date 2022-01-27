const { Event } = require("../models/Event");
const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server-express");
const {
  default: PassRecovery,
} = require("../../client/src/pages/PassRecovery/PassRecovery");

const secret = process.env.SECRET;

const resolvers = {
  Query: {
    //Returns list of all events in the database
    async getEvents() {
      try {
        const events = await Event.find();
        return events;
      } catch (err) {
        throw new Error(err);
      }
    },
    //Returns a specific event
    async getEvent(_, { id }) {
      //id deconstructed from args
      try {
        const event = await Event.findOne({ _id: id });
        return event;
      } catch (err) {
        throw new Error(err);
      }
    },

    //Returns list of all users in the database
    async getUsers() {
      try {
        const users = await User.find(); //{}, { password: 0 }
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
    //Returns a specific event
    async getUser(_, { id }) {
      //id deconstructed from args
      try {
        const user = await User.findOne({ _id: id });
        return user;
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createUser(_, { username, email, password }) {
      password = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        username: username.toLowerCase().trim(),
        password: password,
        email: email.toLowerCase().trim(),
      });

      return newUser;
    },

    createEvent: (
      _,
      {
        ev_organizer,
        ev_name,
        ev_type,
        ev_language,
        ev_online,
        ev_start_date,
        ev_end_date,
        ev_location,
        ev_description,
        ev_participants,
      }
    ) => {
      const newEvent = Event.create({
        ev_organizer,
        ev_name,
        ev_type,
        ev_language,
        ev_online,
        ev_start_date,
        ev_end_date,
        ev_location,
        ev_description,
        ev_participants,
      });

      return newEvent;
    },

    async login(_, { username, password }, { req, res }) {
      const login = await User.findOne({ username });

      if (!login) {
        throw new UserInputError("Incorrect username or password");
      }

      const passCheck = await bcrypt.compare(password, login.password);

      if (!passCheck) {
        throw new UserInputError("Incorrect username or password");
      }

      const token = jwt.sign(
        {
          id: login.id,
          username: login.username,
        },
        secret,
        { expiresIn: "1h" }
      );

      login._doc = { ...login._doc, token };

      //adding token to payload --search for better way
      // login._doc = { ...login._doc, token };
      return login;
    },

    async passRecovery(_, { email }) {
      const user = await User.findOne({ email });
      if (!user) return null;
      //TODO: sending emails
    },
  },
};

module.exports = { resolvers };
