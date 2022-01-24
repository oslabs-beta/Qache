const Cache = require('../../../Qachengo/Qachengo');
const Product = require('../models/ProductModel');
const Category = require('../models/CategoryModel');

const cache = new Cache();

module.exports = {

  // creates new product and adds it to DB
  addProduct: async (args, parent, info) => {
    const { name, description, imageUrl, quantity, price, onSale, category } = args.product;

    // creates new product in DB
    const newProduct = await Product.create({
      name,
      description,
      imageUrl,
      quantity,
      price,
      onSale,
      category,
    });

    // adds newly created product to its category(s) array of products
    newProduct.category.forEach( async (id) => {
      const path = await Category.findById(id);
      path.products.push(newProduct._id);
      await path.save();
    })

    console.log('Added new product to MongoDB: ', newProduct);
    return newProduct;
  },

  // creates new category and adds it to DB
  addCategory: async (args, parent, info) => {
    const { name, products } = args.category;
    const newCategory = await Category.create({ name, products });
    console.log('Added new category to MongoDB: ', newCategory);
    return newCategory;
  },

  // returns all existing products in DB
  getAllProducts: async (args, parent, info) => {

    const dbRes = await Product.find().populate('category');
    return dbRes;
  },

  // returns all existing products in DB that are in given category
  getProductsBy: async (args, parent, info) => {
    const {category} = args;
    const cacheRes = cache.listRange(category);
    if (cacheRes) return cacheRes;
    const dbRes = await Category.findOne({ category: args.category }).populate('products');
    console.log(category);
    cache.listCreate(category, dbRes.products);
    console.log(dbRes);
    return category.products;
  },

  // resolvers to create:

  // returns all existing categories in DB
  getCategories: async (args, parent, info) => {
    const data = await Category.find().populate();
    console.log('here are all the categories in store: ', data);
    return data;
  },
  // getCategoryBy
  // returns existing category in DB with corresponding ID
  getCategoryBy: async (args, parent, info) => {
    const data = await Category.findOne({id: args.id}).populate();
    console.log('here is the category with that id: ', data);
    return data;
  }

  // addProductToCategory
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
