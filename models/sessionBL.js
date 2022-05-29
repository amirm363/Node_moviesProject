const session = require("./sessionModel");
const userModel = require("./userDataModel");

const getData = (userName) => {
  return new Promise((resolve, reject) => {
    session.findOne({ User: userName }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

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

const updateData = (data) => {
  return new Promise((resolve, reject) => {
    userModel.findOneAndUpdate(
      { User: data.username },
      { $dec: { transactions: 1 } },
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

module.exports = { getData, saveDate, updateData };
