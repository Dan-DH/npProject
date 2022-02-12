const { Event } = require("../models/Event");
const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { UserInputError } = require("apollo-server-express");
const { ApolloServer, UserInputError } = require("apollo-server");
const checkAuth = require("../utils/checkAuth");
const {
  passRecoveryEmail,
  eventSignUpEmail,
  eventCancellationEmail,
} = require("../API/mailer/mailer");

const secret = process.env.SECRET;

const resolvers = {
  Query: {
    //RETURNS ALL EVENTS -where endDate > currentDate!
    async getEvents(_, args, context) {
      try {
        //checkAuth(context);
        const timeNow = new Date();
        const events = await Event.find({
          ev_end_date: { $gt: timeNow.getTime() },
        }).sort({ ev_start_date: 1 });
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
        //checkAuth(context);
        const users = await User.find({}, { password: 0 });
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

      console.log("this logs");

      try {
        const newUser = await User.create({
          username: username.toLowerCase().trim(),
          password: password,
          email: email.toLowerCase().trim(),
        });
        return newUser;
      } catch (err) {
        throw new Error("Username / email already exists");
      }
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
        ev_start_date,
        ev_end_date,
        ev_location,
        ev_description,
        ev_max_participants,
      },
      context
    ) => {
      checkAuth(context);
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

    //USER LOGIN
    async login(_, { username, password }, { req, res }) {
      const user = await User.findOne({
        username: username.toLowerCase().trim(),
      });

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
      console.log(userId);
      console.log(props);
      try {
        const user = await User.findOneAndUpdate(
          { _id: userId },
          { $set: props },
          { returnOriginal: false }
        );
        return user;
      } catch (err) {
        throw new Error("Username / email already exists");
      }
    },

    //USER BIO UPDATE
    async changeBioUser(_, { userId, bio }) {
      if (bio === "") throw new Error("Empty bio");

      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $set: { bio } },
        { returnOriginal: false }
      );
      console.log(user);
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
      // const link = `https://geekout.netlify.app/password-reset/${user.id}/${emailToken}`;

      //add token to user object
      const addToken = await User.findOneAndUpdate(
        { _id: user.id },
        { $set: { token: emailToken } }
      );

      passRecoveryEmail(user.email, link);
      //TODO: react. Add message 'email has been sent'

      return addToken;
    },

    //PASSWORD RESET
    async passwordReset(_, { id, token, password }) {
      const user = await User.findById({ _id: id });

      if (!user) throw new Error("User does not exist");

      const passSecret = secret + user.password;

      try {
        const payload = jwt.verify(token, passSecret);
        console.log("payload", payload);
        password = await bcrypt.hash(password, 10);
        await User.findOneAndUpdate({ _id: id }, { $set: { password } });
        return "Password updated";
      } catch (error) {
        throw new Error(error);
      }

      return "All good and dandy";
    },

    //DELETE USER
    async deleteUser(_, { id }, context) {
      checkAuth(context);
      const user = await User.deleteOne({ _id: id });
      //TODO: add logic (can't always return success)
      return "User deleted";
    },

    //DELETE EVENT --not used at the moment. Event deletion in USER EVENT SIGNUP
    async deleteEvent(_, { id }, context) {
      checkAuth(context);
      const event = await Event.deleteOne({ _id: id });
      console.log(event);
      if (event.deletedCount === 0) throw new Error("Event doesn't exist");
      //TODO: add send email, then return
      return "Event deleted";
    },

    //USER EVENT SIGNUP
    async attend(_, { userId, eventId }, context) {
      //here's the logic for this function:
      // 1 we check if the user is the owner of the event. If so, we delete it
      // 2 we check if the user is on the waiting list. If so, we take them out
      // 3 we check if the user is already attending the event. If so, we take them out
      // 3a we add the first user of the waiting list to the event (if applicable)
      // 4 we add the user to the attending list
      checkAuth(context);
      // const check = await User.findOne({ _id: userId });
      const check = await Event.findById(eventId);
      //check if user is the organizer and delete event instead of unsubscribing
      if (check.ev_organizer === userId) {
        //remove event from participants' lists and inform them via email
        check.ev_participants.map(async (p) => {
          const user = await User.findOneAndUpdate(
            { _id: p },
            {
              $pull: {
                attendingEvents: eventId,
              },
            }
          );
          if (p !== check.ev_organizer) {
            eventCancellationEmail(user.email, check);
          }
        });
        const event = await Event.deleteOne({ _id: eventId });
        if (event.deletedCount === 0) throw new Error("Event doesn't exist");
        return "Event deleted";
      }

      //check if user is on the attending list, and remove them from it
      if (check.ev_waiting_list.includes(userId)) {
        const user = await User.findOneAndUpdate(
          { _id: userId },
          { $pull: { waitingEvents: eventId } }
        );
        const event = await Event.findOneAndUpdate(
          { _id: eventId },
          { $pull: { ev_waiting_list: userId } }
        );
        return "User removed from waiting list";
      }

      //check if user is attending the event and unsubscribe them from it
      if (check.ev_participants.includes(userId)) {
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

        //check if there are users in the waiting list
        if (check.ev_waiting_list.length > 0) {
          //add first user in waiting list to event
          await Event.findOneAndUpdate(
            { _id: check.id },
            {
              $push: { ev_participants: check.ev_waiting_list[0] },
              $pop: { ev_waiting_list: -1 },
            }
          );
          //add event to user's attendingEvents list
          const addedUser = await User.findOneAndUpdate(
            {
              _id: check.ev_waiting_list[0],
            },
            {
              $push: { attendingEvents: check.id },
            }
          );
          //email user to inform them they have been added to the event
          eventSignUpEmail(addedUser.email, check);
        }

        return "User removed from event list";
      } else {
        //if user was not attending the event, subscribe them to it
        const maxCheck = await Event.findById(eventId);
        //if event is full, add user to waiting list
        if (maxCheck.ev_participants.length >= maxCheck.ev_max_participants) {
          const attend = await User.findOneAndUpdate(
            { _id: userId },
            {
              $push: {
                waitingEvents: eventId,
              },
            }
          );

          const event = await Event.findOneAndUpdate(
            { _id: eventId },
            {
              $push: {
                ev_waiting_list: userId,
              },
            }
          );

          return "Added to waiting list";
        }
        //if event is not full, add user to attending list
        const attend = await User.findOneAndUpdate(
          { _id: userId },
          {
            $push: {
              attendingEvents: eventId,
            },
          }
        );

        const event = await Event.findOneAndUpdate(
          { _id: eventId },
          {
            $push: {
              ev_participants: userId,
            },
          }
        );
        console.log(attend.email, event);
        eventSignUpEmail(attend.email, event);
        return "User added to the event";
      }
    },
  },
};

module.exports = { resolvers };
