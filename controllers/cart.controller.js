const Cart = require("../models/cart.model");
const Auth = require("../models/auth.model");
const Book  = require("../models/books.model");

module.exports.cartAdd = async (req, res) => {
  const bookId = req.params.bookId;
  const dataBook = await Book.findById(bookId);
  const coverBook = dataBook.coverBook;
  const nameBook = dataBook.name;
  
  
  const user = await Auth.findById(dataBook.userId);
  let name = "Vô danh"
  if(user)
  {
    name = user.name
  }
  
  
  
  const sessionId = req.signedCookies.sessionId;
  const session = await Cart.findOne({userId: sessionId});
  let book = session.cart.find(
    cartItem => cartItem.bookId == bookId
  );

  if (book) {
    book.qty += 1;
    session.save();
  }else {
    await Cart.findOneAndUpdate({userId: sessionId}, {
      $push: {cart: {bookId,name:nameBook,coverBook, user:name , qty: 1}}
    }) 
  } 
 res.redirect("back"); 
}

module.exports.index = async (req, res) => {
  const sessionId = req.signedCookies.sessionId;
  const url = req.protocol+"://"+req.headers.host;
  let user;
  if(req.signedCookies.userid) {
     user = await Auth.findById(sessionId);
  }

  const carts = await Cart.findOne({userId: sessionId});
  let books =  carts.cart;  
  let name = "Vô danh"
  if(user) {
    name = user.name
  }
  
 res.render("cart/index", {
   name,
   books,
   url
 })
}