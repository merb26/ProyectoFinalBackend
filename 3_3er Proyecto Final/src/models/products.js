import mongoose from 'mongoose';

const productsCollection = 'products';

const productSchema = new mongoose.Schema({
  name: {type: String, require: true, max: 100},
  description: {type: String},
  code: {type: String, require: true},
  urlPicture: {type: String, require: true},
  price: {type: String, require: true},
  stock: {type: String, require: true},
  timestamp: {type: String},
  category: {type: String},
});

export default mongoose.model(productsCollection, productSchema);
