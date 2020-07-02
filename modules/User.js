const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  googleId: {
    type: "string",
    require: true,
  },

  displayName: {
    type: "string",
    require: true,
  },

  firstName: {
    type: "string",
    require: true,
  },

  lastName: {
    type: "string",
    require: true,
  },

  image: {
    type: "string",
  },
  createdAT: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", UserSchema);
