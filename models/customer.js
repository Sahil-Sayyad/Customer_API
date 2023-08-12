const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    user_id :{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },

    first_name: {
      type: String,
      required: [true, "please add the first_name"],
    },
    last_name: {
      type: String,
      required: [true, "please add the last_name "],
    },
    street: {
      type: String,
      required: [true, "please add the street"],
    },
    address: {
      type: String,
      required: [true, "please add the address"],
    },
    city: {
      type: String,
      required: [true, "please add the city"],
    },
    state: {
      type: String,
      required: [true, "please add the state"],
    },
    email: {
      type: String,
      required: [true, "please add the email "],
    },
    phone: {
      type: String,
      required: [true, "please add the phone"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);
