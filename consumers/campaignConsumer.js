const { connectToDatabase } = require('../lib/mongodb');
const CommunicationLog = require('./models/CommunicationLog');
const { connectRabbitMQ } = require('../lib/raqbbitmq');

async function consumeCampaigns(msg) {
  const { audienceId, message } = JSON.parse(msg.content.toString());
  
  await connectToDatabase();
  
  const log = new CommunicationLog({
    audienceId,
    message,
    status: 'PENDING',
  });
  await log.save();
  // Simulate message sending process
  console.log(`Sending message to audience ${audienceId}: ${message}`);
  const deliveryStatus = Math.random() > 0.1 ? 'SENT' : 'FAILED';
  log.status = deliveryStatus;
  await log.save();
}

async function startCampaignConsumer() {
  const { channel } = await connectRabbitMQ();
  const queue = 'campaignQueue';
  await channel.assertQueue(queue, { durable: true });
  channel.consume(queue, async (msg) => {
    await consumeCampaigns(msg);
    channel.ack(msg);
  });
}

startCampaignConsumer().catch(console.error);
