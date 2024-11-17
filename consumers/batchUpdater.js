const { connectToDatabase } = require('../lib/mongodb');
const CommunicationLog = require('./models/CommunicationLog');
const batchUpdateStatus = async () => {
  await connectToDatabase();
  const logs = await CommunicationLog.find({ status: 'PENDING' });
  logs.forEach(async (log) => {
    log.status = 'BATCH_UPDATED';
    await log.save();
  });
  console.log('Batch update complete');
};

setInterval(batchUpdateStatus, 6000); 