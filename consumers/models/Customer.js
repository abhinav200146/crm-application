
const mongoose=require('mongoose')

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  totalSpends: { type: Number, default: 0 },
  visitCount: { type: Number, default: 0 },
  lastVisit: { type: Date, default: Date.now() },
});
const Customer= mongoose.model('Customer', CustomerSchema);
module.exports=Customer;