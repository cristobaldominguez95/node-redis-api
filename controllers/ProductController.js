const db = require('../db');

module.exports = {

  store(req, res) {
    db.storeProduct(req.body).then(product => {
      res.json(product);
    }).catch(err => {

    });
  }

};
