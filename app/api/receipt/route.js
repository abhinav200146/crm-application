import { connectToDatabase } from "@/lib/mongodb";
import CommunicationLog from "@/models/CommunicationLog";

export const POST = async (request) => {
  try {
    await connectToDatabase();

    const { logId } = await request.json();
    const status = Math.random() > 0.1 ? "SENT" : "FAILED";

    await CommunicationLog.findByIdAndUpdate(logId, { status });
    return new Response(JSON.stringify({ status }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ msg: "Method Not Allowed", error }), {
      status: 500,
    });
  }
};
