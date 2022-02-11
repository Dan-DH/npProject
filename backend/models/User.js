const { model, Schema } = require("mongoose");
const { eventSchema } = require("./Event");

//const { EventSchema } = require("./Event");
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  acc_date: { type: Date, default: Date.now },
  profile_pic: {
    type: String,
    default:
      "https://cdn4.iconfinder.com/data/icons/user-avatar-flat-icons/512/User_Avatar-33-512.png",
  },
  bio: String,
  moderator: { type: Boolean, default: false },
  supporter: { type: Boolean, default: false },
  ban_status: { type: Number, default: 0 }, //0 okay, 1 temp ban, 2 perm ban
  ban_timer: { type: Number, default: 0 }, //# days of temp ban
  // myOrganizedEvents: [String], //this might not be needed
  attendingEvents: [String],
  waitingEvents: [String],
  eventEmails: { type: Boolean, default: true },
  token: String,
});

const User = model("users", userSchema);

module.exports = { User };
