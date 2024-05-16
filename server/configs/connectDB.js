const mongoose = require("mongoose");

const connect = async () => {
  try {
    const verifyConnection = await mongoose.connect(
      "mongodb+srv://wpcreative777:wpcreative777@cluster0.khh4dwn.mongodb.net/mern-auth?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("connected");
  } catch (error) {
    console.log("Not connected");
  }
};
module.exports = connect;
