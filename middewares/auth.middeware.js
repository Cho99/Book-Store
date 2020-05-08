const Auth = require("../models/auth.model");
const Cart = require("../models/cart.model");

module.exports.authLogin = async (req, res, next) => {
  if(!req.signedCookies.userId) {
    res.redirect("/auth/login");
    return;
  }
  const user = await Auth.findById(req.signedCookies.userId);
  const userId = req.signedCookies.userId;
  const sessionId = req.signedCookies.sessionId;
  if(!user) {
    res.redirect("/auth/login");
    return;
  }
  if (userId !== sessionId) {
    const x = await Cart.findOneAndUpdate({userId : sessionId}, {userId : userId});
    res.cookie("sessionId", userId, {
      signed: true
    }); 
  }
  res.locals.user = user;
  next();
}

