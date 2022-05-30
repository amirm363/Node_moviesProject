const mongoose = require("mongoose");

const userData = mongoose.Schema({
  User: { type: String, unique: true },
  Transactions: Number,
  Date: Date,
});
userData.index({ User: 1 });

module.exports = mongoose.model("transactions", userData);
