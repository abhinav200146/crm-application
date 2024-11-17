import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

export const POST = async (request) => {
  try {
    await connectToDatabase();
    const { customerId, amount } = await request.json();
    const order = new Order({ customerId, amount });
    await order.save();
    return new Response(JSON.stringify({ order }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ msg: "Error saving order", error }), {
      status: 500,
    });
  }
};
export const GET = async() => {
  try {
    await connectToDatabase();
    const orders = await Order.find({}).populate("customerId");
    return new Response(JSON.stringify({ orders }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ msg: "Error get order", error }), {
      status: 500,
    });
  }
};
