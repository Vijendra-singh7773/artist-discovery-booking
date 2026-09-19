import ArtistImage from "../components/ArtistImage";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Star, PlayCircle, ArrowRight } from "lucide-react";
import { artists } from "../data/artists";
import Calendar from "../components/Calendar";
import BookingModal from "../components/BookingModal";
import { useApp } from "../store/AppContext";
import ArtistCard from "../components/ArtistCard";
export default function ArtistProfile() {
  const { id } = useParams();
  const a = artists.find((x) => x.id === Number(id));
  const [selected, setSelected] = useState(""),
    [book, setBook] = useState(false);
  const { bookedDates } = useApp();
  if (!a)
    return (
      <div className="state">
        <h2>Artist not found</h2>
        <Link to="/">Back to artists</Link>
      </div>
    );
  const related = artists
    .filter((x) => x.category === a.category && x.id !== a.id)
    .slice(0, 4);
  return (
    <div className="container profile">
      <Link className="back" to="/">
        {" "}
        <ArrowLeft size={16} /> Back to artists
      </Link>
      <div className="profilegrid">
        <div>
          <ArtistImage className="mainphoto" src={a.image} name={a.name} />
          <div className="thumbs">
            {a.gallery.map((x, i) => (
              <ArtistImage
                key={i}
                src={x}
                name={`${a.name} gallery ${i + 1}`}
              />
            ))}
          </div>
          <div className="video">
            <a
              className="youtube-card"
              href={a.video}
              target="_blank"
              rel="noreferrer"
            >
              <PlayCircle size={42} />
              <span>Watch {a.name} on YouTube</span>
              <small>Featured song / performance</small>
            </a>
          </div>
        </div>
        <div>
          <span className="pill">{a.category}</span>
          <h1>{a.name}</h1>
          <p className="muted">
            <MapPin size={16} /> {a.city} ·{" "}
            <Star size={16} fill="currentColor" /> {a.rating} ({a.reviews}{" "}
            reviews)
          </p>
          <p className="bio">{a.bio}</p>
          <div className="pricebox">
            <small>Starting from</small>
            <strong>₹{a.price.toLocaleString("en-IN")}</strong>
            <span>Final price varies by event type & date</span>
          </div>
          <h3>Availability</h3>
          <Calendar
            booked={bookedDates(a)}
            selected={selected}
            onSelect={setSelected}
          />
          <button
            className="primary full"
            disabled={!selected || bookedDates(a).includes(selected)}
            onClick={() => setBook(true)}
          >
            Request to Book {selected && `· ${selected}`}
          </button>
          <div className="reviews">
            <h3>Reviews</h3>
            {[
              ["Priya S.", "Excellent energy and very professional."],
              ["Rahul M.", "The audience loved the performance!"],
              ["Neha K.", "Smooth coordination from start to finish."],
            ].map(([n, t]) => (
              <div className="review" key={n}>
                <b>{n}</b>
                <span>★★★★★</span>
                <p>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section className="related-section">
          <div className="section-heading">
            <span className="section-kicker">YOU MAY ALSO LIKE</span>
            <h2>More {a.category.toLowerCase()} artists</h2>
            <p>Explore similar profiles before you decide.</p>
          </div>
          <div className="grid related-grid">
            {related.map((x) => (
              <ArtistCard key={x.id} a={x} />
            ))}
          </div>
          <Link className="text-link related-link" to="/">
            Explore the full lineup <ArrowRight size={16} />
          </Link>
        </section>
      )}
      {book && <BookingModal artist={a} onClose={() => setBook(false)} />}
    </div>
  );
}
