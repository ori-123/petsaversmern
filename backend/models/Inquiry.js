const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const InquirySchema = new Schema({
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

const Inquiry = model('Inquiry', InquirySchema);

module.exports = Inquiry;
