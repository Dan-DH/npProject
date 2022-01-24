const { model, Schema } = require("mongoose");

const eventSchema = new Schema({
  ev_organizer: String,
  ev_name: String,
  ev_type: String,
  ev_language: String,
  ev_online: Boolean,
  ev_creation_date: { type: Date, default: Date.now },
  ev_start_date: Date,
  ev_end_date: Date,
  ev_location: String,
  ev_description: String,
  ev_max_participants: Number,
  ev_participants: [String],
  comments: [
    {
      author: { type: Schema.Types.ObjectId, ref: "users" },
      content: String,
      post_date: Date,
    },
  ],
});

const Event = model("events", eventSchema);

module.exports = { eventSchema, Event };
