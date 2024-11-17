import { connectToDatabase } from "@/lib/mongodb";
import Customer from "@/models/Customer";
import { connectRabbitMQ } from "@/lib/raqbbitmq";

export const POST = async (request) => {
  try {
    await connectToDatabase();
    const { name, email, totalSpends, lastVisit, visitCount } =
      await request.json();
    const customer = new Customer({
      name,
      email,
      totalSpends,
      visitCount,
      lastVisit,
    });

 

    await customer.save();
    const { channel } = await connectRabbitMQ();
    const queue = "customerQueue";
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify({ customer })));
    return new Response(JSON.stringify({ customer }), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ msg: "Error saving customer", error }),
      { status: 500 }
    );
  }
};
export const GET = async (request) => {
  try {
    await connectToDatabase();
    const customers = await Customer.find({});
    return new Response(JSON.stringify({ customers }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ msg: "Error get customer", error }), {
      status: 500,
    });
  }
};
