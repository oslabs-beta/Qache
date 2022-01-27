const Qache = require('../../../Qache/Qache');
const Product = require('../models/ProductModel');
const Category = require('../models/CategoryModel');
const { description } = require('../typeDefs/schema');

const cache = new Qache();

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
      cache.listPush(newProduct, category.name);
      path.products.push(newProduct._id);
      await path.save();
    });
    return newProduct;
  },

  // creates new category and adds it to DB
  addCategory: async (args, parent, info) => {
    const { name, products } = args.category;
    const newCategory = await Category.create({ name, products });
    return newCategory;
  },

  // returns all existing products in DB
  getAllProducts: async (args, parent, info) => {
    const data = await Product.find().populate('category');
    return data;
  },

  // returns all existing products in DB that are in given category
  getProductsBy: async (args, parent, info) => {
    cache.log();
    console.log('~~~~~~~~~~~~~~~~~~');
    const t1 = Date.now();
    const { category } = args;
    const cacheRes = cache.listRange(category); // checks if the category of products exist in cache first
    if (cacheRes) {
      console.log(cacheRes);
      const t2 = Date.now();
      console.log(t2 - t1, 'ms');
      return cacheRes;
    } // if exists, returns the array of products
    const dbRes = await Category.findOne({ name: category }).populate(
      'products'
    );
    const t3 = Date.now();
    cache.listCreate(category, ...dbRes.products); // sets products array into cache under the name of category
    console.log(t3 - t1, 'ms');
    return dbRes.products;
  },

  // returns all existing categories in DB
  getCategories: async (args, parent, info) => {
    const data = await Category.find().populate('products');
    return data;
  },
  // getCategoryBy
  // returns existing category in DB with corresponding ID
  getCategoryBy: async (args, parent, info) => {
    const data = await Category.findOne({ id: args.id }).populate('products');
    return data;
  },

  // deletes existing Product in DB with corresponding ID
  deleteProduct: async (args, parent, info) => {
    await Product.deleteOne({ _id: args.id });
    return;
  },

  // deletes existing Category in DB with corresponding ID
  deleteCategory: async (args, parent, info) => {
    await Category.deleteOne({ _id: args.id });
    return;
  },

  // patches existing Product in DB with corresponding ID, replacing chosen field(s) with inputted info
  updateProduct: async (args, parent, info) => {
    let { id } = args.product;
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      args.product,
      {
        new: true,
      }
    ).populate('category');
    const categoryNames = [];
    updatedProduct.category.forEach((obj) => categoryNames.push(obj.name));
    cache.listUpdate({ id }, args.products, ...categoryNames);
    return updatedProduct;
  },

  // patches existing Category in DB with corresponding ID, replacing chosen field(s) with inputted info
  updateCategory: async (args, parent, info) => {
    let { id, name, products } = args.category;
    let updatedCategory = await Category.findById(id);
    if (name) updatedCategory.name = name;
    if (products) updatedCategory.products = products;
    await Category.findOneAndUpdate({ _id: id }, updatedCategory, {
      new: true,
    });
    return updatedCategory;
  },
};
