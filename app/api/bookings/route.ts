
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;

  if (!url || !key) {
    return NextResponse.json(
      { error: "Booking service is not configured." },
      { status: 500 }
    );
  }

  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }

  const getText = (field: string) =>
    typeof body[field] === "string"
      ? (body[field] as string).trim()
      : "";

  const client_name = getText("client_name");
  const email = getText("email");
  const phone = getText("phone");
  const event_type = getText("event_type");
  const event_date = getText("event_date");
  const event_location = getText("event_location");
  const package_name = getText("package_name");
  const message = getText("message");

  if (
    !client_name ||
    !email ||
    !event_type ||
    client_name.length > 120 ||
    email.length > 254 ||
    event_type.length > 100 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    phone.length > 40 ||
    event_location.length > 200 ||
    package_name.length > 100 ||
    message.length > 3000
  ) {
    return NextResponse.json(
      { error: "Please check your booking details." },
      { status: 400 }
    );
  }

  if (
    event_date &&
    (!/^\d{4}-\d{2}-\d{2}$/.test(event_date) ||
      !Number.isFinite(Date.parse(`${event_date}T00:00:00Z`)) ||
      new Date(`${event_date}T00:00:00Z`)
        .toISOString()
        .slice(0, 10) !== event_date)
  ) {
    return NextResponse.json(
      { error: "Please enter a valid event date." },
      { status: 400 }
    );
  }

  const supabase = createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const { error } = await supabase
    .from("booking_inquiries")
    .insert({
      client_name,
      email,
      phone: phone || null,
      event_type,
      event_date: event_date || null,
      event_location: event_location || null,
      package_name: package_name || null,
      message: message || null,
    });

  if (error) {
    console.error("Booking insert failed:", error.message);

    return NextResponse.json(
      { error: "Unable to save your inquiry. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Booking inquiry saved successfully." },
    { status: 201 }
  );
}
