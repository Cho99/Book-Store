const Cart = require("../models/cart.model.js");
const shortid = require("shortid");

module.exports = async (req, res, next) => {
  if(!req.signedCookies.sessionId) {
    const sessionId = shortid.generate();
    res.cookie("sessionId", sessionId, {
      signed: true
    });
    
   await Cart.create({
      userId : sessionId,
      cart: JSON.stringify({})
    });
  }
  let id = req.signedCookies.sessionId;
  let cart = await Cart.findOne({userId : id});
  if (id && cart) {
    cart = JSON.parse(cart.cart);
    cart = Object.values(cart);
    let total = 0;
    for(let number of cart) {
      total += number
    }
    res.locals.total = 0
  }else {
    res.locals.total = 0
  }  
  next();
}