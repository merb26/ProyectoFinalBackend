import mongoose from 'mongoose';

const collection = 'messages';

const schema = new mongoose.Schema({
  email: {type: String},
  // type: {type: String},
  dateAndHour: {type: String},
  bodyMessage: {type: String},
});

export default mongoose.model(collection, schema);
