const { Event } = require("../models/Event");
const { User } = require("../models/User");
const bcrypt = require("bcrypt");

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
        const users = await User.find({}, { password: 0 });
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
      await bcrypt.hash(password, 10, (err, hash) => {
        if (err) throw err;
        password = hash;
      });

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

    async login(_, { username, password }) {
      const login = await User.findOne({ username: username });
      return login;
    },
  },
};

module.exports = { resolvers };
