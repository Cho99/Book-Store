const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  userId: String,
  name: String,
  description: String,
  coverBook: String  
});

const Book = mongoose.model("Boook", bookSchema, "books");

module.exports = Book;