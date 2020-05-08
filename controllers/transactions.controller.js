const Transaction = require("../models/transactions.model");

module.exports.index = (req, res) => {
  const userId = req.signedCookies.userId;
  
  const transactions = Transaction.find();
  res.render("transactions/index", {
    transactions
  })
}
