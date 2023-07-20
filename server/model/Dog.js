const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const dogSchema = new Schema({
  name: String,
  breeds: Object,
  colors: Object,
  age: String,
  gender: String,
  size: String,
  houseTrained: Boolean,
  attributes: Array,
  description: String,
  neutered: Boolean,
  photoUrl: Array,
  adoptable: Boolean,
});
  
const Dog = model('Dog', dogSchema);

mongoose.connect(`mongodb+srv://dogsavers:saveme@dogs.hreunf1.mongodb.net/`)
  .then(() => console.log('Connected to db'));

module.exports = Dog;
