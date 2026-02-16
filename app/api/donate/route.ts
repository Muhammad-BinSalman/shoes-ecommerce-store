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
        // Note: In a real production app, these should be environment variables.
        // Assuming the user has these set up or will set them up.
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // e.g. 'your-email@gmail.com'
                pass: process.env.EMAIL_PASSWORD, // e.g. 'your-app-password'
            },
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: `New Ramadan Donation Pledge: ${pairs} Pairs`,
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #313e46;">New Donation Pledge</h2>
          <p>A new donor has pledged to sponsor shoes.</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Pairs Sponsored:</strong> ${pairs}</p>
            <p><strong>Total Amount:</strong> Rs. ${amount.toLocaleString()}</p>
          </div>
          
          <p>Please reach out to the donor to coordinate the donation collection.</p>
        </div>
      `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: "Donation pledge received and email sent successfully" },
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
