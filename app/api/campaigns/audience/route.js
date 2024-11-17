import { connectToDatabase } from "@/lib/mongodb";
import Customer from "@/models/Customer";

export async function POST(req) {
  try {
    await connectToDatabase();
    const { rules } = await req.json();
    const query = buildQuery(rules);
    const audienceSize = await Customer.countDocuments(query);
    
    return new Response(JSON.stringify({ audienceSize }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ msg: "Method Not Allowed", error }), {
      status: 500,
    });
  }
}
function buildQuery(rules) {
  const query = {};
  const op={
    '>':'gt',
    '<':'lt',
    '>=':'gte',
    '<=':'lte',
    '=':'eq'
  }
  rules.forEach((rule) => {
    switch (rule.field) {
      case "totalSpends":
        query.totalSpends = { [`$${op[rule.operator]}`]: parseFloat(rule.value) };
        break;
      case "visitCount":
        query.visitCount = { [`$${op[rule.operator]}`]: parseInt(rule.value) };
        break;
      case "lastVisit":
        query.lastVisit = { [`$${op[rule.operator]}`]: new Date(rule.value) };
        break;
    }
  });
  return query;
}
