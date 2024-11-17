const mongoose=require('mongoose')

const CommunicationLogSchema = new mongoose.Schema({
  audienceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Audience',
    required: true
  },
  message: String,
  status: {
    type: String,
    enum:  ['PENDING', 'SENT', 'FAILED', 'BATCH_UPDATED'],
    default: 'PENDING'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const CommunicationLog =mongoose.model('CommunicationLog', CommunicationLogSchema);

module.exports= CommunicationLog;
