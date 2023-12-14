const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  // let isLoggedIn = false;
  // if (req.get("Cookie")) {
  //   isLoggedIn = req.get("Cookie").trim().split("=")[1];
  // }
  console.log(req.session, req.session.isLoggedIn);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    // isAuthenticated: isLoggedIn,
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  // req.isLoggedIn = true;
  // res.setHeader("Set-Cookie", "loggedIn=true; Max-Age=10; Domain=xyz; Secure; HttpOnly");
  // res.setHeader("Set-Cookie", "loggedIn=true");
  User.findById("6448fba78c698d00a61c73ac")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      // res.redirect("/");
      req.session.save((err) => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
