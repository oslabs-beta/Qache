const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true },
  products: { type: Array, required: true },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
