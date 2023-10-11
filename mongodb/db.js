require("dotenv").config();

const { MongoClient } = require("mongodb");

const URL = process.env.MONGO_LINK || "";

let DBConnection;

module.exports = {
  connectToDB: (cb) => {
    MongoClient.connect(URL)
      .then((client) => {
        console.log("Connected to MongoDB succesfully");
        DBConnection = client.db();
        return cb();
      })
      .catch((err) => {
        return cb(err);
      });
  },
  getDB: () => DBConnection,
};
