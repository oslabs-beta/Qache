const Cache = require('../../../Qachengo/Qachengo');
const Product = require('../models/ProductModel');
const Category = require('../models/CategoryModel');

const cache = new Cache();

module.exports = {
  addProduct: async (args, parent, info) => {
    const { name, description, imageUrl, quantity, price, onSale, category } = args.product;

    const newProduct = await Product.create({
      name,
      description,
      imageUrl,
      quantity,
      price,
      onSale,
      category,
    });

    newProduct.category.forEach( async (id) => {
      const path = await Category.findById(id);
      path.products.push(newProduct._id);
      await path.save();
    })

    console.log('Added new product to MongoDB: ', newProduct);
    return newProduct;
  },

  addCategory: async (args, parent, info) => {
    const { name, products } = args.category;

    const newCategory = await Category.create({ name, products });
    console.log('Added new category to MongoDB: ', newCategory);
    return newCategory;
  },

  getAllProducts: async (args, parent, info) => {
    const data = await Product.find().populate('category');
    console.log(data)
    return data
  },

  getProductsBy: async (args, parent, info) => {
    const category = await Category.findOne({ name: args.category }).populate('products');
    console.log(category);
    return category.products
  },


};
//
// getAllProducts = async (req, res, next) => {
//   try {
//     const data = await Product.find({});
//     console.log('All products: ', data);
//     res.locals.allProducts = data;
//     return next();
//   } catch (error) {
//     res.status(400).send({ error: error.message })
//   }
// },
// getProduct = async (req, res, next) => {
//   try {

//   } catch (error) {
//     res.status(400).send({ error: error.message })
//   }
// },
