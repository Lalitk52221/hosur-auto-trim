import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { Resend } from "resend";

let client;
async function getDb() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URL);
    console.log("DB_NAME:", process.env.DB_NAME);
    await client.connect();
  }
  return client.db(process.env.DB_NAME || "hosur_auto_trims");
}

const resend = new Resend(process.env.RESEND_API_KEY);

function cors(res) {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return res;
}

export async function OPTIONS() {
  return cors(NextResponse.json({ ok: true }));
}

export async function GET(request, { params }) {
  // const segments = (params?.path) || []
  const { path = [] } = await params;
  const route = path.join("/");
  if (route === "" || route === "health")
    return cors(NextResponse.json({ status: "ok" }));
  return cors(NextResponse.json({ error: "Not found" }, { status: 404 }));
}

export async function POST(request, { params }) {
  const { path = [] } = await params;
  const route = path.join("/");
  try {
    const body = await request.json().catch(() => ({}));
    if (route === "contact") {
      const db = await getDb();
      const doc = {
        id: crypto.randomUUID(),
        name: body.name || "",
        email: body.email || "",
        phone: body.phone || "",
        inquiryType: body.inquiryType || "",
        message: body.message || "",
        createdAt: new Date().toISOString(),
      };
      await db.collection("contacts").insertOne(doc);
      await resend.emails.send({
        from: "Contact Form <onboarding@resend.dev>",
        to: "lalitk52221@outlook.com", // Replace with your email
        subject: "New Contact Form Submission",
        html: `
    <h2>New Contact Form</h2>

    <p><strong>Name:</strong> ${doc.name}</p>
    <p><strong>Email:</strong> ${doc.email}</p>
    <p><strong>Phone:</strong> ${doc.phone}</p>
    <p><strong>Inquiry:</strong> ${doc.inquiryType}</p>
    <p><strong>Message:</strong></p>

    <p>${doc.message}</p>
  `,
      });
      return cors(NextResponse.json({ ok: true, id: doc.id }));
    }
    return cors(NextResponse.json({ error: "Not found" }, { status: 404 }));
  } catch (e) {
    return cors(NextResponse.json({ error: e.message }, { status: 500 }));
  }
}
