const Product = require('../models/ProductModel');

module.exports = ProductController = {
  getAllProducts = async (req, res, next) => {
    try {
      const data = await Product.find({});
      console.log('All products: ', data);
      res.locals.allProducts = data;
      return next();
    } catch (error) {
      res.status(400).send({ error: error.message })
    }
  },
  getProduct = async (req, res, next) => {
    try {
      
    } catch (error) {
      res.status(400).send({ error: error.message })
    }
  },
};