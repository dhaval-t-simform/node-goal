//es5 constructor function
// module.exports = function Product() {

// }

//es6 by creating a class
//Saving products list in an array
//const products = [];

//Not saving products list in an array but in another file
const fs = require("fs");
const path = require("path");

//p defined as global so can be used aain without repeating stuff
const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);
//Helper function. DRY
const getProductsFromFile = (callback) => {
  //   const p = path.join(
  //     path.dirname(process.mainModule.filename),
  //     "data",
  //     "products.json"
  //   );
  fs.readFile(p, (err, fileData) => {
    if (err) {
      return callback([]);
      // return [];
    }
    callback(JSON.parse(fileData));
    //   return JSON.parse(fileData);
  });
};

module.exports = class Product {
  constructor(t) {
    // this.title = title;
    this.title = t;
  }
  save() {
    // products.push(this);

    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => console.log(err));
    });
    // const p = path.join(
    //   path.dirname(process.mainModule.filename),
    //   "data",
    //   "products.json"
    // );
    // fs.readFile(p, (err, fileData) => {
    //   let products = [];
    //   if (!err) {
    //     products = JSON.parse(fileData);
    //   }
    //   console.log(fileData);
    //   console.log("err", err);
    // });
  }
  static fetchAll(callback) {
    getProductsFromFile(callback);
    // const p = path.join(
    //   path.dirname(process.mainModule.filename),
    //   "data",
    //   "products.json"
    // );
    // fs.readFile(p, (err, fileData) => {
    //   if (err) {
    //     callback([]);
    //     // return [];
    //   }
    //   callback(JSON.parse(fileData));
    //   //   return JSON.parse(fileData);
    // });
    // return products;
  }
};
