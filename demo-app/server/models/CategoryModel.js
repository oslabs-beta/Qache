const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'product'}],
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;
