const mongoose = require('mongoose');

const transporterSchema = new mongoose.Schema({
    orderId: {
        type: String,
        unique: true,
        require:true,
      },
    price: {
      type:Number,
      required:true,
    },
    messages: [
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Message',
      },
    ],
  }, {
    collation: { locale:'en',strength: 1 }
  });

const Transporter = mongoose.model('Transporter', transporterSchema);

module.exports = Transporter;

