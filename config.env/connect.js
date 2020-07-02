const express = require("express");
const mongoose = require("mongoose");

const connectDB = () => {
  try {
    mongoose.connect(
      process.env.DM_CONATION,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        console.log("Databases connected");
      }
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
