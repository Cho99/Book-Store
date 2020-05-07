const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Dog:"+process.env.API_PASSWORD_MONGODB+"@cluster0-lgd9k.gcp.mongodb.net/books-store?retryWrites=true&w=majority");
app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.static("public"));
app.use(express.json()) ;
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

const homepageRoute = require("./routes/homepage.route");
const authRoute = require("./routes/auth.route");

//middeware
const middeware = require("./middewares/user.middeware");
app.use(middeware.userExist);

app.use("/", homepageRoute);
app.use("/auth", authRoute);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});