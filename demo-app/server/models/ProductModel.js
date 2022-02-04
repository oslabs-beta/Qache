const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  onSale: { type: Boolean, required: true },
  inCart: {type: Boolean, required: true},
  category: [{ type: Schema.Types.ObjectId, ref: 'category', required: true }],
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
