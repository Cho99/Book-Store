const Cart = require("../models/cart.model");

module.exports.cartAdd = async (req, res) => {
  const bookId = req.params.bookId;
  const sessionId = req.signedCookies.sessionId;
  
  const session = await Cart.findOne({userId: sessionId});
  let book = session.cart.find(
    cartItem => cartItem.bookId == bookId
  );
  console.log(book);
  
  if (book) {
    book.qty += 1;
    session.save();
  }else {
    await Cart.findOneAndUpdate({userId: sessionId}, {
      $push: {cart: {bookId, qty: 1}}
    }) 
  }
  
  res.send("Hello");
  
}