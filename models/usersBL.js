const usersFileDAL = require("../DALs/usersFileDAL");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Passes getUsers function to routes layer
const getUsers = () => {
  return usersFileDAL.getUsers();
};

// Logic of adding a new user
const addUser = async (user) => {
  let users = await usersFileDAL.getUsers();
  if (users.users.find((x) => x.username == user.username)) {
    return false;
  }
  try {
    const hashedPassword = await bcrypt.hash(user.password, 5);
    // console.log(hashedPassword);
    newUser = {
      username: user.username,
      password: hashedPassword,
      date: new Date(),
      transactions: 10,
    };
    users.users.push(newUser);
    usersFileDAL.addUser(users);

    return true;
  } catch {
    return;
  }
};

// Allows user to login
const checkCred = async (user) => {
  const users = await usersFileDAL.getUsers();
  const userIndex = users.users.findIndex((x) => x.username == user.username);
  const userData = users.users.at(userIndex).password;
  if (userIndex != -1) {
    if (await bcrypt.compare(user.password, userData)) {
      return { user: users.users[userIndex], userIndex };
    } else {
      return null;
    }
  }
};

// Generates new token for a logged in user
const jwtGenerateToken = (user) => {
  return jwt.sign(user, process.env.MY_SECRET, { expiresIn: "24h" });
};

const reduceTransaction = () => {};

module.exports = {
  getUsers,
  addUser,
  checkCred,
  jwtGenerateToken,
};