const mongoose=require('mongoose')

const OrderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Customer',
  },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});
const Order= mongoose.model('Order', OrderSchema);

module.exports= Order;

