const Cart = require("../models/cart.model.js");
const shortid = require("shortid");

module.exports = async (req, res, next) => {
  if(!req.signedCookies.sessionId) {
    const sessionId = shortid.generate();
    
    res.cookie("sessionId", sessionId, {
      signed: true
    });
    
    await Cart.create({userId: sessionId});
  }
  
  let sessionId = req.signedCookies.sessionId; 
  let userId = req.signedCookies.userId;
  
  let carts = await Cart.findOne({userId : sessionId});
  let total = 0;
  
  if(sessionId) {
    for(let book of carts.cart) {
      total += book.qty 
    }
  }
   
  res.locals.total = total;
  next();
}