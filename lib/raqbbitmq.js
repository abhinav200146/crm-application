const amqp = require('amqplib');
require('dotenv').config();

const connectRabbitMQ = async () => {
  try {
    // Set a heartbeat interval in the options to keep the connection alive
    const connection = await amqp.connect(process.env.RABBITMQ_URL, { heartbeat: 10 }); // 10 seconds heartbeat interval
    const channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');

    // Handle connection close and error events to automatically reconnect
    connection.on('close', () => {
      console.error('RabbitMQ connection closed, attempting to reconnect...');
      reconnect();
    });

    connection.on('error', (error) => {
      console.error('RabbitMQ connection error:', error);
      reconnect();
    });

    return { connection, channel };
  } catch (error) {
    console.error('Error connecting to RabbitMQ', error);
    throw new Error('Could not connect to RabbitMQ');
  }
};

// Reconnection logic with a delay
const reconnect = () => {
  setTimeout(async () => {
    try {
      await connectRabbitMQ();
      console.log('Reconnected to RabbitMQ');
    } catch (error) {
      console.error('Reconnection attempt failed, retrying...');
      reconnect(); // Retry connecting until successful
    }
  }, 5000); // Retry after 5 seconds
};

module.exports = { connectRabbitMQ };





// const amqp = require('amqplib');
// require('dotenv').config();
// const connectRabbitMQ = async () => {
//   try {
//     const connection = await amqp.connect(process.env.RABBITMQ_URL);
//     const channel = await connection.createChannel();
//     console.log('Connected to RabbitMQ');
//     return { connection, channel };
//   } catch (error) {
//     console.error('Error connecting to RabbitMQ', error);
//     throw new Error('Could not connect to RabbitMQ');
//   }
// };

// module.exports = { connectRabbitMQ };
