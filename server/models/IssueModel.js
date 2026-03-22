const { Schema, model } = require("mongoose");

const IssueSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    required: true,
    unique: true,
  },
  area: {
    type: String,
    required: true,
    unique: true,
  },
  vote: {
    type: Number,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
  },
  coordinates: {
    type: [Number],
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Issue", IssueSchema);
