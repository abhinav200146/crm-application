const mongoose =require('mongoose')
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

const Audience = mongoose.model('Audience', AudienceSchema);
module.exports = Audience;
