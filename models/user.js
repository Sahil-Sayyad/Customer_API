const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please add the username"],
    },
    login_id: {
      type: String,
      required: [true, "please add the email "],
      unique: [true, "email has already registered"],
    },
    password: {
      type: String,
      required: [true, "please add the password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
