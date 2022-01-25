const Cache = require('../../../Qachengo/Qachengo');
const Product = require('../models/ProductModel');
const Category = require('../models/CategoryModel');

const cache = new Cache();

module.exports = {

  // creates new product and adds it to DB
  addProduct: async (args, parent, info) => {
    const { name, description, imageUrl, quantity, price, onSale, category } =
      args.product;

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

    newProduct.category.forEach(async (id) => {
      const path = await Category.findById(id);
      cache.listPush(newProduct ,category.name)
      path.products.push(newProduct._id);
      await path.save();
    });

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
    const data = await Product.find().populate('category');
    console.log(data);
    return data;
  },

  // returns all existing products in DB that are in given category
  getProductsBy: async (args, parent, info) => {
    const t1 = Date.now();
    const { category } = args;
    const cacheRes = cache.listRange(category); // checks if the category of products exist in cache first
    console.log(cache.content); // list of category/key nodes
    if (cacheRes) {
      const t2 = Date.now();
      console.log('Got result from cache: ', cacheRes);
      console.log(t2 - t1, 'ms');
      return cacheRes; // array of products
    } // if exists, returns the array of products
    const dbRes = await Category.findOne({ name: category }).populate(
      'products'
    );
    const t3 = Date.now();
    cache.listCreate(category, ...dbRes.products); // sets products array into cache under the name of category
    console.log('MongoDB Response: ', dbRes);
    console.log(t3 - t1, 'ms');
    return dbRes.products;
  },

  // returns all existing categories in DB
  getCategories: async (args, parent, info) => {
    const data = await Category.find().populate("products");
    console.log('here are all the categories in store: ', data);
    return data;
  },
  // getCategoryBy
  // returns existing category in DB with corresponding ID
  getCategoryBy: async (args, parent, info) => {
    const data = await Category.findOne({id: args.id}).populate('products');
    console.log('here is the category with that id: ', data);
    return data;
  },

  // deletes existing Product in DB with corresponding ID
  deleteProduct: async (args, parent, info) => {
    await Product.deleteOne({_id: args.id});
    return;
  },

  // deletes existing Category in DB with corresponding ID
  deleteCategory: async (args, parent, info) => {
    await Category.deleteOne({_id: args.id});
    return;
  }
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
