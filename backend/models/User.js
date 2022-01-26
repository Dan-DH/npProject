const { model, Schema } = require("mongoose");
const { eventSchema } = require("./Event");

//const { EventSchema } = require("./Event");
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  acc_date: { type: Date, default: Date.now },
  profile_spic: String,
  bio: String,
  moderator: { type: Boolean, default: false },
  supporter: { type: Boolean, default: false },
  ban_status: { type: Number, default: 0 }, //0 okay, 1 temp ban, 2 perm ban
  ban_timer: { type: Number, default: 0 }, //# days of temp ban
  events: [eventSchema],
});

const User = model("users", userSchema);

module.exports = { User };
