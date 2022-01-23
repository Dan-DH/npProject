const mongoose = require("mongoose");
//const { EventSchema } = require("./Event");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  acc_date: { type: Date, default: Date.now },
  profile_pic: String,
  bio: String,
  moderator: Boolean,
  supporter: Boolean,
  ban_status: Int, //0 okay, 1 temp ban, 2 perm ban
  ban_timer: Int, //# days of temp ban
  events: [
    {
      ev_organizer: String,
      ev_name: String,
      ev_start_date: Date,
      ev_end_date: Date,
      ev_location: String,
      ev_description: String,
      ev_participants: [String],
      comments: [
        {
          author: String,
          content: String,
          post_date: Date,
        },
      ],
    },
  ],
  past_events: [
    {
      ev_organizer: String,
      ev_name: String,
      ev_start_date: Date,
      ev_end_date: Date,
      ev_location: String,
      ev_description: String,
      ev_participants: [String],
      comments: [
        {
          author: String,
          content: String,
          post_date: Date,
        },
      ],
    },
  ],
});

const User = mongoose.model("users", UserSchema);

module.exports = { User };
