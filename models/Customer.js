import mongoose from "mongoose";
const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  totalSpends: { type: Number, default: 0 },
  lastVisit: { type: Date, default: Date.now() },
  visitCount: { type: Number, default: 0 },
});
const Customer=mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);

export default Customer;