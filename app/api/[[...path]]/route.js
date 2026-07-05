import { createHash, randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { Resend } from "resend";
import * as XLSX from "xlsx";

let client;
async function getDb() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URL);
    await client.connect();
  }
  return client.db(process.env.DB_NAME || "hosur_auto_trims");
}

const resend = new Resend(process.env.RESEND_API_KEY);

function cors(res) {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return res;
}

function hashPassword(password) {
  return createHash("sha256").update(password).digest("hex");
}

function getTokenFromRequest(request) {
  const header = request.headers.get("authorization");
  if (header?.startsWith("Bearer ")) return header.slice(7);
  return null;
}

export async function OPTIONS() {
  return cors(NextResponse.json({ ok: true }));
}

export async function GET(request, { params }) {
  const { path = [] } = await params;
  const route = path.join("/");

  if (route === "" || route === "health") {
    return cors(NextResponse.json({ status: "ok" }));
  }

  if (route === "auth/me") {
    const token = getTokenFromRequest(request);
    if (!token) {
      return cors(NextResponse.json({ error: "Unauthorized" }, { status: 401 }));
    }

    try {
      const db = await getDb();
      const admin = await db.collection("admins").findOne({ token });
      if (!admin) {
        return cors(NextResponse.json({ error: "Unauthorized" }, { status: 401 }));
      }
      return cors(NextResponse.json({ ok: true, admin: { email: admin.email, name: admin.name } }));
    } catch (e) {
      console.error("Auth check failed:", e);
      return cors(NextResponse.json({ error: "Unauthorized" }, { status: 401 }));
    }
  }

  if (route === "dashboard") {
    try {
      const db = await getDb();
      const contacts = await db.collection("contacts").find({}).sort({ createdAt: -1 }).toArray();
      return cors(NextResponse.json(contacts, { status: 200 }));
    } catch (e) {
      console.error("Error fetching contacts:", e);
      return cors(NextResponse.json({ error: "Internal server error" }, { status: 500 }));
    }
  }

  if (route === "dashboard/export") {
    try {
      const db = await getDb();
      const contacts = await db.collection("contacts").find({}).sort({ createdAt: -1 }).toArray();
      const rows = contacts.map((contact) => ({
        Name: contact.name || "",
        Email: contact.email || "",
        Phone: contact.phone || "",
        InquiryType: contact.inquiryType || "",
        Message: contact.message || "",
        Status: contact.called ? "Called" : "Not Called",
        CreatedAt: contact.createdAt || "",
      }));

      const worksheet = XLSX.utils.json_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Inquiries");
      const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": 'attachment; filename="inquiries.xlsx"',
        },
      });
    } catch (e) {
      console.error("Error exporting contacts:", e);
      return cors(NextResponse.json({ error: "Internal server error" }, { status: 500 }));
    }
  }

  if (route.startsWith("dashboard/")) {
    const id = path[1];
    if (!id) {
      return cors(NextResponse.json({ error: "Missing id" }, { status: 400 }));
    }

    try {
      const db = await getDb();
      const contact = await db.collection("contacts").findOne({ id });
      if (!contact) {
        return cors(NextResponse.json({ error: "Not found" }, { status: 404 }));
      }
      return cors(NextResponse.json(contact, { status: 200 }));
    } catch (e) {
      console.error("Error fetching contact:", e);
      return cors(NextResponse.json({ error: "Internal server error" }, { status: 500 }));
    }
  }

  return cors(NextResponse.json({ error: "Not found" }, { status: 404 }));
}

export async function POST(request, { params }) {
  const { path = [] } = await params;
  const route = path.join("/");
  try {
    const body = await request.json().catch(() => ({}));

    if (route === "auth/login") {
      const db = await getDb();
      const admin = await db.collection("admins").findOne({ email: body.email?.toLowerCase() });
      if (!admin || admin.password !== hashPassword(body.password || "")) {
        return cors(NextResponse.json({ message: "Invalid credentials" }, { status: 401 }));
      }

      const token = randomUUID();
      await db.collection("admins").updateOne({ _id: admin._id }, { $set: { token } });
      return cors(NextResponse.json({ token, user: { name: admin.name, email: admin.email } }, { status: 200 }));
    }

    if (route === "auth/signup") {
      const db = await getDb();
      const email = body.email?.toLowerCase();
      const existing = await db.collection("admins").findOne({ email });
      if (existing) {
        return cors(NextResponse.json({ message: "Email already registered" }, { status: 409 }));
      }

      const token = randomUUID();
      const newAdmin = {
        name: body.name || "Admin",
        email,
        password: hashPassword(body.password || ""),
        token,
        createdAt: new Date().toISOString(),
      };

      await db.collection("admins").insertOne(newAdmin);
      return cors(NextResponse.json({ token, user: { name: newAdmin.name, email: newAdmin.email } }, { status: 201 }));
    }

    if (route === "contact") {
      const db = await getDb();
      const doc = {
        id: randomUUID(),
        name: body.name || "",
        email: body.email || "",
        phone: body.phone || "",
        inquiryType: body.inquiryType || "",
        message: body.message || "",
        called: false,
        createdAt: new Date().toISOString(),
      };
      await db.collection("contacts").insertOne(doc);
      await resend.emails.send({
        from: "Contact Form <onboarding@resend.dev>",
        to: "lalitk52221@outlook.com",
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

export async function PUT(request, { params }) {
  const { path = [] } = await params;
  const route = path.join("/");

  if (!route.startsWith("dashboard/")) {
    return cors(NextResponse.json({ error: "Not found" }, { status: 404 }));
  }

  const id = path[1];
  if (!id) {
    return cors(NextResponse.json({ error: "Missing id" }, { status: 400 }));
  }

  try {
    const body = await request.json().catch(() => ({}));
    const db = await getDb();
    await db.collection("contacts").updateOne({ id }, { $set: { called: Boolean(body.called) } });
    const updatedContact = await db.collection("contacts").findOne({ id });
    return cors(NextResponse.json(updatedContact ?? { ok: true }, { status: 200 }));
  } catch (e) {
    console.error("Error updating contact:", e);
    return cors(NextResponse.json({ error: "Internal server error" }, { status: 500 }));
  }
}

export async function DELETE(_request, { params }) {
  const { path = [] } = await params;
  const route = path.join("/");

  if (!route.startsWith("dashboard/")) {
    return cors(NextResponse.json({ error: "Not found" }, { status: 404 }));
  }

  const id = path[1];
  if (!id) {
    return cors(NextResponse.json({ error: "Missing id" }, { status: 400 }));
  }

  try {
    const db = await getDb();
    await db.collection("contacts").deleteOne({ id });
    return cors(NextResponse.json({ ok: true }, { status: 200 }));
  } catch (e) {
    console.error("Error deleting contact:", e);
    return cors(NextResponse.json({ error: "Internal server error" }, { status: 500 }));
  }
}
