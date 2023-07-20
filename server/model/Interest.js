const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const InterestSchema = new Schema({
  name: String,
  address: String,
  email: String,
  phone: Number,
  aboutme: String,
  message: String,
  dog: {
    type: Schema.Types.ObjectId,
    ref: 'Dog',
  }
});

const Interest = model('Interest', InterestSchema);

mongoose.connect('mongodb+srv://dogsavers:saveme@dogs.hreunf1.mongodb.net/')
  .then(() => console.log('Connected to db'));

module.exports = Interest;
