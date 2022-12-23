import mongoose from 'mongoose';

const collection = 'orders';

const schema = new mongoose.Schema({
  email: {type: String},
  state: {type: String},
  total: {type: String},
  numOrder: {type: String},
  dateAndHour: {type: String},
  products: {type: Array},
});

export default mongoose.model(collection, schema);
