const cloudinary = require("cloudinary");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const Auth = require("../models/auth.model");

cloudinary.config({ 
  cloud_name: 'dog99', 
  api_key: process.env.API_KEY_FILE, 
  api_secret: process.env.API_KEY_SECRET 
});

module.exports.signIn = (req, res) => {
  res.render("auth/signIn");
}


module.exports.index = async (req, res) => {
  const id = req.signedCookies.userId;
  const user = await Auth.findById(id);
  const url = req.protocol+"://"+req.headers.host;
  res.render("auth/index", {
    user,
    url
  })
}

module.exports.login = (req, res) => {
  res.render("auth/login");
}

module.exports.postLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
 
  const user = await Auth.findOne({email: email});
  if(!user) {   
    res.render("auth/login", {
      errors: [
        "USer is not exist"
      ],
      value: req.body
    });
  }

  await bcrypt.compare(password, user.password,  (err, result) => {
    if (result) {
        res.cookie("userId", user.id, {
          signed: true
        });
        res.redirect("/auth");
    } else {
       res.render("auth/login", {
        errors: [
          "Wrong password"
        ],
        value : req.body
      });
    }     
  });
}

module.exports.postSignIn = async (req, res) => {
  const url = req.protocol+"://"+req.headers.host;
  req.body.avatar = req.file.path.split("/").slice(1).join("/");
  req.body.isAdmin = true;
  await bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {   
    req.body.password = hash;
    cloudinary.v2.uploader.upload(url+"/"+req.body.avatar,{
      folder: "images/avatar",
      use_filename: true 
    });
    const user = await Auth.create(req.body);
    res.cookie("userId", user.id, {
      signed: true
    });
    res.render("auth/index", {
      user,
      url
    });
});
   
}