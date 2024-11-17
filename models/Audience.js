import mongoose from 'mongoose';
const AudienceSchema = new mongoose.Schema({
  rules: [
    {
      field: String,
      operator: String,
      value: String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Audience = mongoose.models.Audience || mongoose.model('Audience', AudienceSchema);

export default Audience;
