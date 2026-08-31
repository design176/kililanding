import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { resolveContactPlatform, validateContact } from "@/lib/signup";

const sql = neon(process.env.DATABASE_URL!);

/**
 * There is no migration tool on this project, so the table is defined here and
 * reconciled on every request. Both statements are idempotent.
 */
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
  await sql`
    ALTER TABLE coming_soon_signups
    ADD COLUMN IF NOT EXISTS contact_platform TEXT
  `;
}

export async function POST(request: NextRequest) {
  try {
    const { product, contact, platform } = await request.json();

    if (typeof contact !== "string") {
      return NextResponse.json(
        { error: "leave an email or a @handle so we can reach you." },
        { status: 400 }
      );
    }

    const error = validateContact(contact);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    await ensureTable();

    await sql`
      INSERT INTO coming_soon_signups (product_url, contact, contact_platform)
      VALUES (
        ${typeof product === "string" ? product.trim() || null : null},
        ${contact.trim()},
        ${resolveContactPlatform(contact, typeof platform === "string" ? platform : undefined)}
      )
    `;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[signup]", err);
    return NextResponse.json(
      { error: "something went wrong - try again." },
      { status: 500 }
    );
  }
}
