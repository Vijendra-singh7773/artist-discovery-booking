import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Artist, Booking } from "../types";
interface Ctx {
  bookings: Booking[];
  addBooking: (b: Booking) => void;
  cancelBooking: (id: string) => void;
  editBookingDate: (id: string, date: string) => void;
  bookedDates: (artist: Artist) => string[];
}
const C = createContext<Ctx | null>(null);
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(() =>
    JSON.parse(localStorage.getItem("artistly-bookings") || "[]"),
  );
  useEffect(
    () => localStorage.setItem("artistly-bookings", JSON.stringify(bookings)),
    [bookings],
  );
  const value = useMemo(
    () => ({
      bookings,
      addBooking: (b: Booking) => setBookings((x) => [...x, b]),
      cancelBooking: (id: string) =>
        setBookings((x) =>
          x.map((b) => (b.id === id ? { ...b, status: "Cancelled" } : b)),
        ),
      editBookingDate: (id: string, date: string) =>
        setBookings((x) => x.map((b) => (b.id === id ? { ...b, date } : b))),
      bookedDates: (artist: Artist) => [
        ...artist.bookedDates,
        ...bookings
          .filter((b) => b.artistId === artist.id && b.status !== "Cancelled")
          .map((b) => b.date),
      ],
    }),
    [bookings],
  );
  return <C.Provider value={value}>{children}</C.Provider>;
}
export const useApp = () => {
  const c = useContext(C);
  if (!c) throw new Error("useApp outside provider");
  return c;
};
