import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { SANITY_TAGS } from "@/lib/queries";

// Sanity calls this on every Publish (webhook: POST, projection `{_type}`), so edits go live in seconds.
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret)
    return NextResponse.json(
      { error: "SANITY_REVALIDATE_SECRET is not set" },
      { status: 500 },
    );

  const { isValidSignature, body } = await parseBody<{ _type?: string }>(
    req,
    secret,
    true,
  );
  if (!isValidSignature)
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });

  const tags =
    body?._type && SANITY_TAGS.includes(body._type)
      ? [body._type]
      : SANITY_TAGS;
  for (const tag of tags) revalidateTag(tag, { expire: 0 });
  return NextResponse.json({ revalidated: tags });
}
