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

// Deletes a user from json file
const deleteUser = (user, username) => {
  jFile.writeFile(__dirname + "/../Users.json", user, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${username} has been deleted`);
    }
  });
};

module.exports = { getUsers, addUser, deleteUser };
