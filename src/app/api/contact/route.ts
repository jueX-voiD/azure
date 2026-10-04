import { NextResponse } from "next/server";

const REQUIRED = [
  "firstName",
  "lastName",
  "phone",
  "email",
  "project",
  "role",
] as const;

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  for (const key of REQUIRED) {
    if (typeof data[key] !== "string" || !(data[key] as string).trim()) {
      return NextResponse.json({ error: `Missing ${key}` }, { status: 400 });
    }
  }
  if (!/^\S+@\S+\.\S+$/.test(data.email as string)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // TODO: deliver the enquiry (email provider or CRM) once the destination is decided.
  console.log("Contact enquiry received:", data);

  return NextResponse.json({ ok: true });
}
