const mongoose = require('mongoose');
const HomePage = require("../models/homepage.model");

module.exports.index = async (req, res) => {
  const url = req.protocol+"://"+req.headers.host;
  const books = await HomePage.find();
  res.render("index", {
    books,
    url
  })
}