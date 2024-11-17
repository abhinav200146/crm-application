import { connectToDatabase } from "@/lib/mongodb";
import CommunicationLog from "@/models/CommunicationLog";
import Audience from '@/models/Audience';
import { connectRabbitMQ } from "@/lib/raqbbitmq";

export const POST = async (request) => {
  try {
    await connectToDatabase();
    const { rules, message } = await request.json();
    
    const audience = new Audience({ rules });
    await audience.save();
console.log("hello")
    // Create a new CommunicationLog
    const log = new CommunicationLog({
      audienceId: audience._id,
      message,
      status: 'PENDING'
    });
    await log.save();

    // Publish to RabbitMQ queue
    const { channel } = await connectRabbitMQ();
    const queue = 'campaignQueue';
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify({
      audienceId: audience._id,
      message
    })));

    return new Response(JSON.stringify(log), { status: 201 });
  } 
  catch (error) {
    console.error('Error creating campaign:', error);
    return new Response(JSON.stringify({ msg: "Error creating campaign", error }), {
      status: 500,
    });
  }
};

export const GET = async () => {
  try {
    await connectToDatabase();
    console.log('connected to DB');

    const logs = await CommunicationLog.find({});
    console.log(logs)
    return new Response(JSON.stringify(logs), { status: 200 });
  } catch (error) {
    console.error('Error getting logs:', error);
    return new Response(JSON.stringify({ msg: "Error getting logs", error }), {
      status: 500,
    });
  }
};
