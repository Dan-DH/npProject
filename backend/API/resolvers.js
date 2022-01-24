const { Event } = require("../models/Event");

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
        const event = await Event.find();
        return event;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

module.exports = { resolvers };
