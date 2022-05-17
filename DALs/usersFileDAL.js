const jFile = require("jsonfile");

// Get users from json file
const getUsers = () => {
  return new Promise((resolve, reject) => {
    jFile.readFile(__dirname + "/../Users.json", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

// Adds new user to json file
const addUser = (user) => {
  jFile.writeFile(__dirname + "/../Users.json", user, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("User Been Added");
    }
  });
};

module.exports = { getUsers, addUser };