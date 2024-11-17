import { consumeQueue } from '@/lib/rabbitmq';
import Customer from '@/models/Customer';
import {connectToDatabase} from '@/lib/mongodb';

async function processCustomerMessage(message) {
  const customerData = JSON.parse(message);
  await connectToDatabase();
  await Customer.create(customerData);
  console.log('Customer data ingested:', customerData);
}

consumeQueue('customer_queue', processCustomerMessage);
