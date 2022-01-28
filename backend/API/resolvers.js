const { Event } = require("../models/Event");
const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server-express");
const checkAuth = require("../utils/checkAuth");

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
        ev_max_participants,
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
        ev_max_participants,
        ev_participants: [ev_organizer],
      });

      return newEvent;
    },

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

      return { ...user._doc, id: user._id, token };
    },

    async passRecovery(_, { email }) {
      const user = await User.findOne({ email });
      if (!user) return null;
      //TODO: sending emails
    },

    async deleteUser(_, { id }) {
      const user = await User.deleteOne({ _id: id });
      //TODO: add logic (can't always return success)
      return "User succesfully deleted";
    },

    async deleteEvent(_, { id }) {
      const event = await Event.deleteOne({ _id: id });
      if (event.deletedCount === 0) throw new Error("Event doesn't exist");
      //TODO: add send email, then return
      return "Event succesfully deleted";
    },

    async attend(_, { userId, eventId }) {
      const check = await User.findOne({ _id: userId });
      if (check.attendingEvents.includes(eventId)) {
        throw new Error("You are already attending the event");
      }

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

      return "Succesfully added";
    },
  },
};

module.exports = { resolvers };
