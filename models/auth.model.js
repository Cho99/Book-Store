const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  avatar: String,
  isAdmin: Boolean
});

const Auth = mongoose.model("Auth", authSchema, "users");

module.exports = Auth;