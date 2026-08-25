/**
 * Validation for the waitlist signup fields, shared by the form and the API
 * route so the two can't drift. The form runs it for instant feedback; the
 * route runs it again as the actual authority.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Shortest handle we accept, including the leading "@". */
const MIN_HANDLE_LENGTH = 4;

export const DEFAULT_HANDLE_PLATFORM = "x";

/** Contact is either an email address or an `@handle` on some platform. */
export function isHandle(contact: string) {
  return contact.trim().startsWith("@");
}

/** Returns an error message, or null when the value is acceptable. */
export function validateContact(contact: string): string | null {
  const trimmed = contact.trim();
  if (!trimmed) return "leave an email or a @handle so we can reach you.";
  if (isHandle(trimmed)) {
    return trimmed.length < MIN_HANDLE_LENGTH
      ? "please check if the username is correct."
      : null;
  }
  return EMAIL_RE.test(trimmed) ? null : "that doesn't look like a valid email.";
}

/** The product URL is optional, so only a malformed one is an error. */
export function validateProductUrl(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;
  try {
    const { hostname } = new URL(trimmed.includes("://") ? trimmed : `https://${trimmed}`);
    if (!hostname.includes(".")) throw new Error("no TLD");
    return null;
  } catch {
    return "enter a valid url like yourproduct.com";
  }
}

/**
 * Which platform a contact belongs to. Emails are their own "platform";
 * handles carry whichever one the picker had selected.
 */
export function resolveContactPlatform(contact: string, platform?: string) {
  if (!isHandle(contact)) return "email";
  return platform || DEFAULT_HANDLE_PLATFORM;
}
