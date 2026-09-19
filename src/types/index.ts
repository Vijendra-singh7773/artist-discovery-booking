export type Category =
  | "Singer"
  | "Rapper"
  | "DJ"
  | "Dancer"
  | "Comedian"
  | "Band"
  | "Instrumentalist";
export type EventType =
  | "Wedding"
  | "Corporate"
  | "College Fest"
  | "Private Party";
export interface Artist {
  id: number;
  name: string;
  category: Category;
  city: string;
  price: number;
  rating: number;
  reviews: number;
  bio: string;
  image: string;
  gallery: string[];
  video: string;
  bookedDates: string[];
}
export interface Booking {
  id: string;
  artistId: number;
  artistName: string;
  date: string;
  eventType: EventType;
  city: string;
  audience: number;
  contact: { name: string; email: string; phone: string };
  price: number;
  status: "Pending" | "Confirmed" | "Cancelled";
}
