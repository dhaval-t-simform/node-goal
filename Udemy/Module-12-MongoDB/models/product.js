const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;
// console.log(getDb);
class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOperation;
    if (this._id) {
      // Update the product
      dbOperation = db
        .collection("products")
        // .updateOne({ _id: new mongodb.ObjectId(this._id) }, {$set: {title: this.title, price: this.price, etc}});
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      // console.log(db, "db");
      dbOperation = db.collection("products").insertOne(this);
    }
    return dbOperation
      .then((res) => console.log("res@model", res))
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        // console.log(products);
        return products;
      })
      .catch((err) => console.log(err));
  }

  static findById(prodId) {
    const db = getDb();
    return (
      db
        .collection("products")
        .find({ _id: new mongodb.ObjectId(prodId) })
        // .findById(prodId)
        .next()
        .then((product) => {
          // console.log("Model", product);
          return product;
        })
        .catch((err) => console.log(err))
    );
  }
  static deleteById(prodId) {
    const db = getDb();
    console.log(prodId);
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((result) => console.log("Deleted Product"))
      .catch((err) => console.log(err));
  }
}
// const Product = sequelize.define("product", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   title: Sequelize.STRING,
//   price: {
//     type: Sequelize.DOUBLE,
//     allowNull: false,
//   },
//   imageUrl: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

module.exports = Product;
