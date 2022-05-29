const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.349cf.mongodb.net/?retryWrites=true&w=majority`,
  () => {
    console.log("Connected to DB");
  }
);
