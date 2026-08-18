import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS coming_soon_signups (
      id               SERIAL PRIMARY KEY,
      product_url      TEXT,
      contact          TEXT NOT NULL,
      contact_platform TEXT,
      created_at       TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  // Idempotent — adds column if table existed before this column was introduced
  await sql`
    ALTER TABLE coming_soon_signups
    ADD COLUMN IF NOT EXISTS contact_platform TEXT
  `;
}

export async function POST(request: NextRequest) {
  try {
    const { product, contact, platform } = await request.json();

    if (!contact || typeof contact !== "string") {
      return NextResponse.json(
        { error: "leave an email or a @handle so we can reach you." },
        { status: 400 }
      );
    }

    const trimmed = contact.trim();
    const isHandle = trimmed.startsWith("@");

    if (isHandle) {
      if (trimmed.length < 2) {
        return NextResponse.json(
          { error: "add your handle after the @." },
          { status: 400 }
        );
      }
    } else {
      if (!EMAIL_RE.test(trimmed)) {
        return NextResponse.json(
          { error: "that doesn't look like a valid email." },
          { status: 400 }
        );
      }
    }

    const contactPlatform: string = isHandle
      ? (typeof platform === "string" && platform ? platform : "x")
      : "email";

    await ensureTable();

    await sql`
      INSERT INTO coming_soon_signups (product_url, contact, contact_platform)
      VALUES (${product?.trim() || null}, ${trimmed}, ${contactPlatform})
    `;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[signup]", err);
    return NextResponse.json(
      { error: "something went wrong — try again." },
      { status: 500 }
    );
  }
}
