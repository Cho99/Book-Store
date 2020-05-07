const Auth = require("../models/auth.model");

module.exports.userExist = async (req, res, next) => {
  if(req.signedCookies.userId) {
    const user = await Auth.findById(req.signedCookies.userId);
    res.locals.user = user;
  } 
  next();
}

