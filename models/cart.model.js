const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
   userId: String,
   cart: String  
});

const Cart = mongoose.model("Cart", cartSchema, "carts");

module.exports = Cart;