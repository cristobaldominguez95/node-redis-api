const redis = require('redis');
const redisClient = redis.createClient();
const uniqid = require('uniqid');
redisClient.on('error', err => console.log(err));
redisClient.on('connect', () => console.log('Connected to Redis'));

module.exports = {

  storeProduct(product) {
    product.id = uniqid();
    let productString = JSON.stringify(product);
    return new Promise((resolve, reject) => {
    redisClient.set(`products:${product.id}`, productString, (err, reply) => {
        if (err) reject(err);
        redisClient.rpush('products', `products:${product.id}`, (err, reply) => {
          if (err) reject(err);
          resolve(product);
        });
      });
    });
  },

  getAllProducts() {
    return new Promise((resolve, reject) => {
      redisClient.lrange('products', 0, -1, (err, products) => {
        if (err) reject(err);
        if (products.length === 0) resolve([]);
        redisClient.mget(products, (err, products) => {
          if (err) reject(err);
          products = products.map(product => JSON.parse(product));
          resolve(products);
        });
      });
    });
  }

}
