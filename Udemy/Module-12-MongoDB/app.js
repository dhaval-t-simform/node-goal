const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;
const User = require('./models/user')

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // next();
  User.findById('6445f6a507bbdf5f7110e594')
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      console.log('USER', req.user)
      next();
    })
    .catch((err) => console.log(err));
});
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  // console.log("client", client);
  app.listen(3000);
});
