const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session')
const MongoStore = require("connect-mongo")(session);

mongoose.connect("mongodb+srv://Dog:"+process.env.API_PASSWORD_MONGODB+"@cluster0-lgd9k.gcp.mongodb.net/books-store?retryWrites=true&w=majority", {useNewUrlParser: true , useUnifiedTopology: true});
app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.json()) ;
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

const homepageRoute = require("./routes/homepage.route");
const authRoute = require("./routes/auth.route");
const bookRoute = require("./routes/book.route");
const transactionRoute = require("./routes/transactions.route");
const cartRoute = require("./routes/cart.route");

//middeware
const middeware = require("./middewares/user.middeware");
const sessionMiddeware = require("./middewares/session.middeware");


app.use(middeware.userExist);
app.use(sessionMiddeware);

app.use("/", homepageRoute);
app.use("/auth", authRoute);
app.use("/books", bookRoute);
app.use("/transactions", transactionRoute);
app.use("/cart", cartRoute);
// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
