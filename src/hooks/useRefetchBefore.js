import { useEffect } from "react";

const MARGIN_MS = 30_000;
const MIN_DELAY_MS = 10_000;

/**
 * Calls `refetch` shortly before the signed URLs that came with the data expire (`expiresAt`, an
 * ISO date), so images and files keep loading on a page that stays open. Re-armed whenever a
 * refetch brings a new expiry.
 * @param {string | null | undefined} expiresAt
 * @param {() => void} refetch
 */
export default function useRefetchBefore(expiresAt, refetch) {
  useEffect(() => {
    if (!expiresAt) return undefined;
    const delay = Math.max(Date.parse(expiresAt) - Date.now() - MARGIN_MS, MIN_DELAY_MS);
    const timer = setTimeout(refetch, delay);
    return () => clearTimeout(timer);
  }, [expiresAt, refetch]);
}
