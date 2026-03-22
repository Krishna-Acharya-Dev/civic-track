const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    unique: true,
  },
  lastname: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
    unique: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("User", UserSchema);
