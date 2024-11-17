import { connectToDatabase } from "@/lib/mongodb";
import CommunicationLog from "@/models/CommunicationLog";

export const POST = async (request) => {
  try {
    await connectToDatabase();

    const { logId } = await request.json();
    const status = Math.random() >0.1 ? "SENT" : "FAILED";

    const log = await CommunicationLog.findByIdAndUpdate(
      logId,
      { status },
      { new: true }
    );
    return new Response(JSON.stringify({ log }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ msg: "Method Not Allowed", error }), {
      status: 500,
    });
  }
};
