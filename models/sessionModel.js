const mongoose = require("mongoose");

const Session = new mongoose.Schema({});

module.exports = mongoose.model("sessions", Session);
