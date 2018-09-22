const db = require('../db');

module.exports = {

  store(req, res) {
    db.storeProduct(req.body).then(product => {
      res.json(product);
    }).catch(err => {
      console.log(err);
      res.sendStatus(404);
    });
  },

  getAll(req, res) {
    db.getAllProducts().then(products => {
      res.json(products);
    }).catch(err => {
      console.log(err);
      res.sendStatus(404);
    });
  },

  getOne(req, res) {
    db.getOneProduct(req.params.productId).then(product => {
      if (!product) return res.sendStatus(404);
      return res.json(product);
    }).catch(err => {
      console.log(err);
      res.sendStatus(404);
    });
  },

  delete(req, res) {
    db.deleteProduct(req.params.productId).then(reply => {
      if (reply === 0) return res.sendStatus(404);
      res.sendStatus(200);
    }).catch(err => {
      console.log(err);
      res.sendStatus(404);
    });
  }

};
