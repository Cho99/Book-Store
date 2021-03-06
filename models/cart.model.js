const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: String,
  cart: [
    {
      bookId: String,
      name: String,
      coverBook: String,
      user: String,
      qty: Number
    }
  ]
});

const Cart = mongoose.model("Cart", cartSchema, "cart");

module.exports = Cart;