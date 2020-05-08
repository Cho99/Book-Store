const Cart = require("../models/cart.model");

module.exports.cartAdd = async (req, res) => {
  const bookId = req.params.bookId;
  const sessionId = req.signedCookies.sessionId;
  
  if(!sessionId) {
    res.redirect("/");
    return;
  } 
  
  const count = await Cart.findOne({userId: sessionId});
  console.log( JSON.parse(count.cart));
  res.send("Hello")
  
}

module.exports.index = async (req, res) => {
  res.send("Hello")
}