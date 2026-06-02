/**
 * Lightweight in-memory sliding-window rate limiter.
 *
 * Defaults: 20 requests per IP per 60 seconds.
 *
 * Note: state lives in the Node process, so it resets on cold starts and is
 * not shared across multiple serverless instances. This is intentional —
 * it catches single-source bursts (scripts, scrapers) without requiring an
 * external store. For production multi-instance rate limiting, swap in
 * Vercel KV or Upstash Redis.
 */

type Options = {
  /** Max requests allowed within the window. */
  limit?: number;
  /** Rolling window in milliseconds. */
  windowMs?: number;
};

/** ip → sorted list of request timestamps (ms) */
const store = new Map<string, number[]>();

/** Prune the store periodically so it doesn't grow unbounded. */
let lastPrune = Date.now();
function maybePrune(windowMs: number) {
  const now = Date.now();
  if (now - lastPrune < windowMs * 2) return;
  lastPrune = now;
  const cutoff = now - windowMs;
  for (const [key, timestamps] of store) {
    const fresh = timestamps.filter((t) => t > cutoff);
    if (fresh.length === 0) store.delete(key);
    else store.set(key, fresh);
  }
}

/**
 * Returns true if the request is allowed, false if it should be rate-limited.
 */
export function checkRateLimit(
  ip: string,
  { limit = 20, windowMs = 60_000 }: Options = {}
): boolean {
  maybePrune(windowMs);

  const now = Date.now();
  const cutoff = now - windowMs;
  const timestamps = (store.get(ip) ?? []).filter((t) => t > cutoff);

  if (timestamps.length >= limit) return false;

  timestamps.push(now);
  store.set(ip, timestamps);
  return true;
}
