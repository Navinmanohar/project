const mongoose = require('mongoose');

// Define schema for messages
const messageSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
  },
  to: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  transporter: {
    type: String,
    required: true,
  },
});

// Create a Message model using the schema
const Message = mongoose.model('fetches', messageSchema);

module.exports = Message;
