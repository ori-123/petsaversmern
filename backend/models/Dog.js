const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const dogSchema = new Schema({
  name: String,
  breeds: Array,
  color: String,
  age: Number,
  gender: String,
  size: String,
  houseTrained: Boolean,
  description: String,
  neutered: Boolean,
  photoUrl: String,
  adoptable: Boolean,
});
  
const Dog = model('Dog', dogSchema);

module.exports = Dog;
