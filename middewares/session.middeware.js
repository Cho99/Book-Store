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
      cart: [],
    });
  }
  
  let sessionId = req.signedCookies.sessionId;
  let userId = req.signedCookies.userId;
  let id = "";
  if(userId !== sessionId) {
    id = sessionId;
  } else {
    id = userId;
  }
  let carts = await Cart.findOne({userId : id});
  if (id && carts) {
    console.log(carts.cart);
    let total = 0;
    for(let cart in carts) {
      cart.value += total
    } 
    res.locals.total = total;
  }else {
    res.locals.total = 0
  }  
  next();
}