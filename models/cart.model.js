const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
   userId: String,
   cart: [
     {bookId: String, value: Number}
   ],
})

const Cart = mongoose.model("Cart", cartSchema, "carts");

module.exports = Cart;