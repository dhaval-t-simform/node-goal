// const Cart = require("../models/cart");
// const Order = require("../models/order");
const Product = require("../models/product");

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .then((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
  // Product.findById(prodId, (product) => {
  //   res.render("shop/product-detail", {
  //     product: product,
  //     pageTitle: product.title,
  //     path: "/products",
  //   });
  // });
  // res.redirect("/");
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((products) => {
      console.log("products from cart", products);
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
      });
    })
    .catch((err) => console.log(err));
};

// Cart.getCart((cart) => {
//   Product.fetchAll((products) => {
//     let cartProducts = [];
//     for (let product of products) {
//       const cartProductData = cart.products.find(
//         (prod) => prod.id === product.id
//       );
//       if (cartProductData) {
//         cartProducts.push({ productData: product, qty: cartProductData.qty });
//       }
//     }
//     res.render("shop/cart", {
//       path: "/cart",
//       pageTitle: "Your Cart",
//       products: cartProducts,
//     });
//   });
// });
// };

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  // console.log('prodId', req.body)
  Product.findById(prodId)
    .then((product) => {
      // console.log("prod in cart", product);
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
  // let fetchedCart;
  // let newQuantity = 1;
  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     fetchedCart = cart;
  //     return cart.getProducts({ where: { id: prodId } });
  //   })
  //   .then((products) => {
  //     let product;
  //     if (products.length > 0) {
  //       product = products[0];
  //     }
  // let newQuantity = 1;
  // if (product) {
  //   const oldQuantity = product.cartItem.quantity;
  //   newQuantity = oldQuantity + 1;
  //   return product;
  // return fetchedCart.addProduct(product, {
  //   through: { quantity: newQuantity },
  // });
  // }
  // return Product.findByPk(prodId);
  // .then((product) => {
  //   return fetchedCart.addProduct(product, {
  //     through: { quantity: newQuantity },
  //   });
  // })
  // .catch((err) => console.log(err));
  // })
  // .then((product) => {
  //   return fetchedCart.addProduct(product, {
  //     through: { quantity: newQuantity },
  //   });
  // })
  // .then(() => {
  //   res.redirect("/cart");
  // })
  // .catch((err) => console.log(err));

  // console.log(prodId);
  // Product.findById(prodId, (product) => {
  //   console.log("Product Model", product);
  //   Cart.addProduct(prodId, product.price);
  // });
  // console.log(prodId);
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // console.log("req.body", req.body)
  req.user
    .deleteItemFromCart(prodId)
    .then((result) => res.redirect("/cart"))
    .catch((err) => console.log(err));
};

exports.getOrdersList = (req, res, next) => {
  req.user
    .fetchOrders()
    .then((orders) => {
      console.log(orders);
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders,
      });
    })
    .catch((err) => console.log(err));
};

exports.postOrders = (req, res, next) => {
  req.user
    .addOrder()
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

// exports.getCheckout = (req, res, next) => {
//   res.render("shop/checkout", {
//     path: "/checkout",
//     pageTitle: "Checkout",
//   });
// };
