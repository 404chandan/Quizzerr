const mongoose = require("mongoose"); // importing mongoose which connects mongoDB to Node.js
const Schema = mongoose.Schema; // this statement is used for creation of schema

const userSchema = new mongoose.Schema(// schema is stored in a variable
  {
    username: { // username field 
      type: String, // type of data
      required: true, // mandatory field
      unique: true, // it should be unique
    },
    email: { // email entry field
      type: String, // data type
      required: true,//mandatory field
      unique: true,// must be unique
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],// different properties for admin and users depending on choice
      required: true,
    },
    attemptedQuizes: [
      {
        type: mongoose.Schema.Types.ObjectId,// importing another blueprint
        ref: "Quiz",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
