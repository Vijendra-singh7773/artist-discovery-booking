import { useState } from "react";
import { CalendarDays, MapPin, Edit3, Trash2 } from "lucide-react";
import { artists } from "../data/artists";
import { useApp } from "../store/AppContext";
import ArtistImage from "../components/ArtistImage";
export default function Bookings() {
  const { bookings, cancelBooking, editBookingDate } = useApp();
  const [edit, setEdit] = useState<string | null>(null),
    [newDate, setNewDate] = useState("");
  return (
    <div className="container bookings">
      <div className="pagehead">
        <span className="eyebrow">YOUR ACCOUNT</span>
        <h1>My Bookings</h1>
        <p>Manage bookings made in this browser session.</p>
      </div>
      {!bookings.length ? (
        <div className="state">
          <CalendarDays size={44} />
          <h2>No bookings yet</h2>
          <p>Discover an artist and make your first booking.</p>
        </div>
      ) : (
        <div className="bookinglist">
          {bookings.map((b) => {
            const a = artists.find((x) => x.id === b.artistId);
            return (
              <article
                className={`booking ${b.status.toLowerCase()}`}
                key={b.id}
              >
                <ArtistImage
                  src={a?.image || ""}
                  name={b.artistName}
                  className="bookingphoto"
                />
                <div className="bookingmain">
                  <div className="row">
                    <h3>{b.artistName}</h3>
                    <span className={`status ${b.status.toLowerCase()}`}>
                      {b.status}
                    </span>
                  </div>
                  <p>
                    <CalendarDays size={16} /> {b.date} · {b.eventType}
                  </p>
                  <p>
                    <MapPin size={16} /> {b.city} · {b.audience} guests
                  </p>
                  <strong>₹{b.price.toLocaleString("en-IN")}</strong>
                  {edit === b.id && b.status === "Pending" ? (
                    <div className="edit">
                      <input
                        type="date"
                        value={newDate}
                        min={new Date().toISOString().slice(0, 10)}
                        onChange={(e) => setNewDate(e.target.value)}
                      />
                      <button
                        className="primary"
                        disabled={!newDate}
                        onClick={() => {
                          editBookingDate(b.id, newDate);
                          setEdit(null);
                        }}
                      >
                        Save
                      </button>
                    </div>
                  ) : null}
                </div>
                <div className="bookingactions">
                  {b.status !== "Cancelled" && (
                    <>
                      <button
                        title="Edit date"
                        onClick={() => {
                          setEdit(b.id);
                          setNewDate(b.date);
                        }}
                      >
                        <Edit3 size={17} />
                      </button>
                      <button
                        title="Cancel"
                        onClick={() => {
                          if (confirm("Cancel this booking?"))
                            cancelBooking(b.id);
                        }}
                      >
                        <Trash2 size={17} />
                      </button>
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
