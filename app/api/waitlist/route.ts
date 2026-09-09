import { NextResponse } from "next/server";

export const runtime = "nodejs";

const PHONE_CHARACTERS = /^[+\d\s().-]+$/;

function normalizePhoneNumber(value: string) {
  const trimmed = value.trim();
  const digits = trimmed.replace(/\D/g, "");

  if (!PHONE_CHARACTERS.test(trimmed) || digits.length < 7 || digits.length > 15) {
    return null;
  }

  return trimmed.startsWith("+") ? `+${digits}` : digits;
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { phone, agreedToTerms } = payload as {
    phone?: unknown;
    agreedToTerms?: unknown;
  };
  const phoneNumber = typeof phone === "string" ? normalizePhoneNumber(phone) : null;

  if (!phoneNumber) {
    return NextResponse.json(
      { error: "Enter a valid phone number, including the country code." },
      { status: 400 },
    );
  }

  if (agreedToTerms !== true) {
    return NextResponse.json(
      { error: "You must agree to the Terms & Conditions and Privacy Policy." },
      { status: 400 },
    );
  }

  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Waitlist configuration is missing required Supabase environment variables.");
    return NextResponse.json(
      { error: "The waitlist is temporarily unavailable. Please try again soon." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        agreed_to_terms_and_conditions: true,
        terms_version: "2026-09-08",
        privacy_policy_version: "2026-09-08",
      }),
      cache: "no-store",
    });

    if (response.ok || response.status === 409) {
      return NextResponse.json(
        { ok: true, alreadyJoined: response.status === 409 },
        { status: response.status === 409 ? 200 : 201 },
      );
    }

    console.error(`Supabase waitlist insert failed with status ${response.status}.`);
    return NextResponse.json(
      { error: "We couldn’t add you right now. Please try again." },
      { status: 502 },
    );
  } catch {
    console.error("Supabase waitlist insert could not reach the database.");
    return NextResponse.json(
      { error: "We couldn’t add you right now. Please try again." },
      { status: 502 },
    );
  }
}
