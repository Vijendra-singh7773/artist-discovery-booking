import { artists } from "../data/artists";
import type { Artist, Booking } from "../types";
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
export async function fetchArtists(): Promise<Artist[]> {
  await delay(450);
  if (Math.random() < 0.03) throw new Error("Network error. Please retry.");
  return artists;
}
export async function submitBooking(b: Booking): Promise<Booking> {
  await delay(900);
  if (Math.random() < 0.12)
    throw new Error("Booking service is temporarily unavailable.");
  return b;
}
