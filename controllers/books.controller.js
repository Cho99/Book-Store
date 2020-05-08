const cloudinary = require("cloudinary");

const Book = require("../models/books.model");

cloudinary.config({ 
  cloud_name: 'dog99', 
  api_key: process.env.API_KEY_FILE, 
  api_secret: process.env.API_KEY_SECRET 
});

module.exports.index = async (req, res) => {
  const books = await Book.find();
  const url = req.protocol+"://"+req.headers.host;
  res.render("books/index", {
    books,
    url
  });
}

module.exports.new = (req, res) => {
  res.render("books/new");
}

module.exports.postNew = async (req, res) => {
   const userId = req.signedCookies.userId;
   const url = req.protocol+"://"+req.headers.host;
   req.body.userId = userId;
   const coverBook = req.file.path.split("/").slice(1).join("/");
   await cloudinary.v2.uploader.upload(url+"/"+coverBook,{
      folder: "images/coverbook",
      use_filename: true 
   });
   req.body.coverBook = coverBook;
   await Book.create(req.body);
   console.log(req.body);
   res.redirect(".");
}

module.exports.update = async (req, res) => {
  const id = req.params.id;
  const url = req.protocol+"://"+req.headers.host;
  const book = await Book.findById(id);
  res.render("books/update", {
    book,
    url
  });
}

module.exports.postUpdate = async (req, res) => {
  const url = req.protocol+"://"+req.headers.host;
  const id = req.body.id;
  const name = req.body.name;
  const description = req.body.description;
  const coverBook = req.file.path.split("/").slice(1).join("/");
    await cloudinary.v2.uploader.upload(url+"/"+coverBook,{
      folder: "images/coverbook",
      use_filename: true 
   });
  await Book.findOneAndUpdate({id : id}, {name : name, description: description, coverBook : coverBook});
  res.redirect("."); 
}

module.exports.delete = async (req, res) => {
  const id = req.params.id;
  await Book.findByIdAndDelete(id);
  res.redirect("back");
}