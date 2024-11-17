import mongoose from 'mongoose';
const OrderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Customer',
  },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});
const Order=mongoose.models.Order || mongoose.model('Order', OrderSchema);

export default Order;

