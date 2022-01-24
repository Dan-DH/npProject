const { Event } = require("../models/Event");
const { User } = require("../models/User");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    //Returns list of all events in the database
    async getEvents() {
      try {
        const events = await Event.find(); //this is an error
        return events;
      } catch (err) {
        throw new Error(err);
      }
    },
    //Returns a specific event
    async getEvent(id) {
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
        const users = await Event.find(); //this is an error
        return users;
      } catch (err) {
        throw new Error(err);
      }
    },
    //Returns a specific event
    async getUser(id) {
      try {
        const user = await User.findOne({ _id: id });
        return user;
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    createUser: (_, req) => {
      var { username, email, password } = req;
      try {
        User.find(
          {
            $or: [
              { username: username.toLowerCase() },
              { email: email.toLowerCase() },
            ],
          },
          function (err, data) {
            if (err) return err;
            if (data.length > 0) {
              return false;
            } else {
              bcrypt.genSalt(10, (err, salt) =>
                bcrypt.hash(password, salt, (err, hash) => {
                  if (err) throw err;
                  password = hash;
                })
              );
              const newUser = User.create({
                username: username.toLowerCase(),
                password: password,
                email: email.toLowerCase(),
              });
              return newUser;
            }
          }
        );
      } catch (err) {
        throw new Error(err);
      }
    },

    createEvent: (_, req) => {
      const newEvent = Event.create({
        ev_orgnanizer: req.ev_orgnanizer,
        ev_name: req.ev_name,
        ev_type: req.ev_type,
        ev_language: req.ev_language,
        ev_online: req.ev_online,
        ev_start_date: req.ev_start_date,
        ev_end_date: req.ev_end_date,
        ev_location: req.ev_location,
        ev_description: req.ev_description,
        ev_participants: req.ev_participants,
      });
    },
  },
};

module.exports = { resolvers };
