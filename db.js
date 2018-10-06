const redis = require('redis');
const redisClient = redis.createClient();
const uniqid = require('uniqid');
redisClient.on('error', err => console.log(err));
redisClient.on('connect', () => console.log('Connected to Redis'));

module.exports = {

  storeProduct(product) {
    product.id = uniqid();
    return new Promise((resolve, reject) => {
    redisClient.set(`products:${product.id}`, JSON.stringify(product), (err, reply) => {
        if (err) return reject(err);
        redisClient.sadd('products', `products:${product.id}`, (err, reply) => {
          if (err) return reject(err);
          return resolve(product);
        });
      });
    });
  },

  getAllProducts() {
    return new Promise((resolve, reject) => {
      redisClient.smembers('products', (err, products) => {
        if (err) return reject(err);
        if (products.length === 0) return resolve([]);
        redisClient.mget(products, (err, products) => {
          if (err) return reject(err);
          products = products.map(product => JSON.parse(product));
          return resolve(products);
        });
      });
    });
  },

  getOneProduct(productId) {
    return new Promise((resolve, reject) => {
      redisClient.get(`products:${productId}`, (err, product) => {
        if (err) return reject(err);
        if (!product) return resolve(null);
        return resolve(JSON.parse(product));
      });
    });
  },

  deleteProduct(productId) {
    return new Promise((resolve, reject) => {
      redisClient.del(`products:${productId}`, (err, reply) => {
        if (err) return reject(err);
        if (reply === 0) return resolve(reply);
        redisClient.srem('products', `products:${productId}`, (err, reply) => {
          if (err) return reject(err);
          return resolve(reply);
        });
      });
    });
  },

  updateProduct(productId, newProduct) {
    return new Promise((resolve, reject) => {
      redisClient.get(`products:${productId}`, (err, product) => {
        if (err) return reject(err);
        if (!product) return resolve(null);
        newProduct.id = productId;
        redisClient.set(`products:${productId}`, JSON.stringify(newProduct), (err, updatedProduct) => {
          if (err) return reject(err);
          return resolve(newProduct);
        });
      });
    });
  }

}
