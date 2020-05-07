const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  userId: String,
  name: String,
  description: String,
  coverUrl: String  
});

const HomePage = mongoose.model("HomePage", homeSchema, "books");

module.exports = HomePage;