const mongoose = require("mongoose");
require("dotenv").config();

const mongoDbURI = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(mongoDbURI);

    console.log(`Connection success ${connect.connection.name}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;