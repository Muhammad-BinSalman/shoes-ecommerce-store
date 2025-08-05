import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';


const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  currency?: string;
}

interface OrderData {
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: OrderItem[];
  codFee: number;
  total: number;
}

function formatOrderItems(items: OrderItem[]) {
  return items
    .map(
      (item) =>
        `- ${item.name} (${item.quantity} × PKR ${item.price.toLocaleString()}) = PKR ${(item.quantity * item.price).toLocaleString()}`
    )
    .join("\n");
}

export async function POST(req: Request) {
  try {
    const body: OrderData = await req.json();
    const { customer, items, codFee, total } = body;
    const now = new Date();
    const orderTime = now.toLocaleString("en-PK", { hour12: true });

    if (!EMAIL_USER || !EMAIL_PASSWORD || !ADMIN_EMAIL) {
      throw new Error('Gmail email configuration missing in environment');
    }
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: EMAIL_USER, pass: EMAIL_PASSWORD }
    });
    const emailText = `New COD Order Received!\n\nCustomer Details:\nName: ${customer.name}\nEmail: ${customer.email}\nPhone: ${customer.phone}\nAddress: ${customer.address}\n\nOrder Summary:\n${formatOrderItems(items)}\nCOD Fee: PKR 350\nTotal: PKR ${total.toLocaleString()}\n\nOrder Time: ${orderTime}`;
    await transporter.sendMail({
      from: `Store Orders <${EMAIL_USER}>`,
      to: ADMIN_EMAIL,
      subject: "New COD Order!",
      text: emailText
    });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 });
  }
}
