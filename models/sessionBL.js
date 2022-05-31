const userModel = require("./userDataModel");

// Function that gets specific user data filterd by its user name (from DB)
const getData = (userName) => {
  return new Promise((resolve, reject) => {
    userModel.findOne({ User: userName }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// Function that saves new user into DB
const saveDate = (user) => {
  console.log(user);
  return new Promise((resolve, reject) => {
    userModel.insertMany(
      { User: user.User, Transactions: user.Transactions, Date: user.Date },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};

// Function that decresess by 1 the Transacion field of specific user in DB
const updateData = (data) => {
  return new Promise((resolve, reject) => {
    userModel.findOneAndUpdate(
      { User: data },
      { $inc: { Transactions: -1 } },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};

// Function that resotres the user data to "default" when 24 hours passed from its last login.
const refreshUser = (user) => {
  return new Promise((resolve, reject) => {
    userModel.findOneAndUpdate(
      { User: user },
      { Transactions: 10, Date: new Date() },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};

// Function that checks if 24 hours has passed from the users last login.
const checkDate = async (user) => {
  const userData = await getData(user);
  msBetweenDate = Math.abs(userData.Date.getTime() - new Date().getTime());
  const hoursBetweenDates = msBetweenDate / (60 * 60 * 1000);

  if (hoursBetweenDates > 24) {
    if (userData >= 0) {
      refreshUser(userData.User);
    }
    return true;
  }
  return false;
};

module.exports = { getData, saveDate, updateData, checkDate, refreshUser };
