import { NextResponse } from "next/server";

// Mock in-memory DB
const orders: any[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Extract known UTM fields if present
    const utm_source = body.utm_source ?? null;
    const utm_medium = body.utm_medium ?? null;
    const utm_campaign = body.utm_campaign ?? null;
    const utm_content = body.utm_content ?? null;

    const order = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      customer: body.customer ?? null,
      items: body.items ?? [],
      codFee: body.codFee ?? 0,
      total: body.total ?? 0,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
    };

    orders.push(order);

    return NextResponse.json({ success: true, order }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message ?? "Unknown error" },
      { status: 400 }
    );
  }
}

export async function GET() {
  // Return the mock orders list for debugging
  return NextResponse.json({ count: orders.length, orders });
}
