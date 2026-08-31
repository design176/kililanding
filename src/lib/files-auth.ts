import { createHash } from "crypto";

/** Name of the cookie that gates access to /files. */
export const FILES_COOKIE = "files_auth";

/**
 * The cookie stores a hash of the password rather than the password itself,
 * so the plaintext password never round-trips through the browser.
 */
export function filesAuthToken(password: string) {
  return createHash("sha256").update(password).digest("hex");
}

export function isValidFilesAuthCookie(value: string | undefined) {
  const password = process.env.FILES_PASSWORD;
  if (!password || !value) return false;
  return value === filesAuthToken(password);
}
