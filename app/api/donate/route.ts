import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, phone, pairs, amount } = body;

        if (!name || !phone || !pairs || !amount) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Configure email transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAILc, // Send to self/admin
            subject: `New Donation Payment Reported: ${pairs} Pairs`,
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #313e46;">New Donation Payment Reported</h2>
          <p>A donor has reported sending a payment via JazzCash/EasyPaisa.</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Pairs Sponsored:</strong> ${pairs}</p>
            <p><strong>Total Amount:</strong> Rs. ${amount.toLocaleString()}</p>
          </div>
          
          <p>Please check your JazzCash/Bank account for the transaction and contact the donor for the receipt.</p>
        </div>
      `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: "Donation reported successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error sending donation email:", error);
        return NextResponse.json(
            { message: "Failed to process donation", error: String(error) },
            { status: 500 }
        );
    }
}
