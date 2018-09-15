const db = require('../db');

module.exports = {

  store(req, res) {
    db.storeProduct(req.body).then(product => {
      res.json(product);
    }).catch(err => {

    });
  },

  getAll(req, res) {
    db.getAllProducts().then(products => {
      res.json(products);
    }).catch(err => {

    });
  },

  getOne(req, res) {
    db.getOneProduct(req.params.productId).then(product => {
      if (!product) return res.sendStatus(404);
      return res.json(product);
    }).catch(err => {

    });
  }

};
