import { useEffect, useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Loader2,
  ArrowRight,
  CalendarCheck2,
  ShieldCheck,
  Sparkles,
  Music2,
  Mic2,
  Disc3,
  Users,
  Smile,
  Radio,
  MapPin,
  ChevronDown,
} from "lucide-react";
import ArtistCard from "../components/ArtistCard";
import { fetchArtists } from "../services/api";
import type { Artist, Category } from "../types";
import { Link } from "react-router-dom";

const categories = [
  { name: "Singers", icon: Mic2, query: "Singer" },
  { name: "Rappers", icon: Radio, query: "Rapper" },
  { name: "DJs", icon: Disc3, query: "DJ" },
  { name: "Dancers", icon: Users, query: "Dancer" },
  { name: "Comedians", icon: Smile, query: "Comedian" },
  { name: "Live Bands", icon: Music2, query: "Band" },
];

const eventTypes = [
  ["Wedding", "Make your big day unforgettable"],
  ["Corporate", "Professional entertainment for teams"],
  ["College Fest", "High-energy acts for campus events"],
  ["Private Party", "Bring the stage to your celebration"],
];

export default function Home() {
  const [data, setData] = useState<Artist[]>([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [q, setQ] = useState(""),
    [city, setCity] = useState("All"),
    [cat, setCat] = useState("All"),
    [max, setMax] = useState(200000),
    [sort, setSort] = useState("rating"),
    [page, setPage] = useState(1);
  useEffect(() => {
    fetchArtists()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);
  const filtered = useMemo(
    () =>
      data
        .filter(
          (a) =>
            (a.name + " " + a.category + " " + a.city)
              .toLowerCase()
              .includes(q.toLowerCase()) &&
            (city === "All" || a.city === city) &&
            (cat === "All" || a.category === cat) &&
            a.price <= max,
        )
        .sort((a, b) =>
          sort === "low"
            ? a.price - b.price
            : sort === "high"
              ? b.price - a.price
              : b.rating - a.rating,
        ),
    [data, q, city, cat, max, sort],
  );
  useEffect(() => setPage(1), [q, city, cat, max, sort]);
  const items = filtered.slice((page - 1) * 9, page * 9),
    pages = Math.ceil(filtered.length / 9);
  const topArtists = data.slice(0, 6);

  const pickCategory = (value: string) => {
    setCat(value);
    document
      .getElementById("artists")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <section className="hero">
        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">
              <Sparkles size={14} /> INDIA'S ARTIST DISCOVERY MARKETPLACE
            </span>
            <h1>
              Book the <span>right talent.</span>
              <br />
              Create the moment.
            </h1>
            <p>
              Discover artists for weddings, corporate shows, college fests and
              private celebrations. Compare profiles, check dates and request a
              booking in minutes.
            </p>
          </div>
          <div className="search hero-search">
            <Search />
            <input
              aria-label="Search artists, categories or cities"
              placeholder="Search artists, categories or cities…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button
              onClick={() =>
                document
                  .getElementById("artists")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore
            </button>
          </div>
          <div className="hero-meta">
            <span>
              <ShieldCheck size={16} /> Transparent demo pricing
            </span>
            <span>
              <CalendarCheck2 size={16} /> Availability-first booking
            </span>
            <span>
              <MapPin size={16} /> Artists across India
            </span>
          </div>
        </div>
      </section>

      <section className="category-strip">
        <div className="container category-inner">
          <div>
            <span className="section-kicker">BROWSE BY VIBE</span>
            <h2>Find your kind of entertainment</h2>
          </div>
          <Link
            to="#artists"
            className="text-link"
            onClick={() =>
              document
                .getElementById("artists")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View all artists <ArrowRight size={16} />
          </Link>
        </div>
        <div className="container category-grid">
          {categories.map(({ name, icon: Icon, query }) => (
            <button
              className="category-card"
              key={name}
              onClick={() => pickCategory(query)}
            >
              <span className="category-icon">
                <Icon size={23} />
              </span>
              <span>
                <strong>{name}</strong>
                <small>Explore {name.toLowerCase()}</small>
              </span>
              <ArrowRight size={16} />
            </button>
          ))}
        </div>
      </section>

      <section className="container" id="artists">
        <div className="filters">
          <div>
            <b>
              <SlidersHorizontal size={17} /> Filters
            </b>
            <select
              aria-label="Filter by city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option>All</option>
              {[...new Set(data.map((a) => a.city))].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
            <select
              aria-label="Filter by category"
              value={cat}
              onChange={(e) => setCat(e.target.value)}
            >
              <option>All</option>
              {(
                [
                  "Singer",
                  "Rapper",
                  "DJ",
                  "Dancer",
                  "Comedian",
                  "Band",
                  "Instrumentalist",
                ] as Category[]
              ).map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
            <label className="range">
              Up to ₹{max.toLocaleString("en-IN")}
              <input
                type="range"
                min="12000"
                max="200000"
                step="1000"
                value={max}
                onChange={(e) => setMax(+e.target.value)}
              />
            </label>
          </div>
          <select
            aria-label="Sort artists"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="rating">Top rated</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </div>
        {loading ? (
          <div className="center">
            <Loader2 className="spin" /> Loading artists…
          </div>
        ) : error ? (
          <div className="state">
            <h2>Couldn’t load artists</h2>
            <p>{error}</p>
            <button className="primary" onClick={() => location.reload()}>
              Retry
            </button>
          </div>
        ) : (
          <>
            <div className="results">
              <div>
                <span className="section-kicker">THE LINEUP</span>
                <h2>Explore artists</h2>
                <p>{filtered.length} performers available</p>
              </div>
              <span className="results-note">
                Profiles, videos, ratings & availability
              </span>
            </div>
            <div className="grid">
              {items.map((a) => (
                <ArtistCard key={a.id} a={a} />
              ))}
            </div>
            {!items.length && (
              <div className="state">
                <h2>No artists found</h2>
                <p>Try changing your search or filters.</p>
              </div>
            )}
            {pages > 1 && (
              <div className="pagination">
                {Array.from({ length: pages }, (_, i) => (
                  <button
                    className={page === i + 1 ? "active" : ""}
                    onClick={() => setPage(i + 1)}
                    key={i}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <section className="feature-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">WHY ARTISTLY</span>
            <h2>Everything you need before you book.</h2>
            <p>
              Built around the exact moments that matter when choosing live
              entertainment.
            </p>
          </div>
          <div className="feature-grid">
            <div className="feature">
              <CalendarCheck2 />
              <h3>Availability first</h3>
              <p>
                Pick an available date before starting a booking request, so the
                flow stays clear.
              </p>
            </div>
            <div className="feature">
              <Sparkles />
              <h3>Dynamic estimates</h3>
              <p>
                See a demo estimate change with event type and weekday/weekend
                pricing.
              </p>
            </div>
            <div className="feature">
              <ShieldCheck />
              <h3>Clear booking states</h3>
              <p>
                Loading, success, error and retry states make the experience
                feel like a real product.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container event-section">
        <div className="section-heading">
          <span className="section-kicker">BUILT FOR EVERY OCCASION</span>
          <h2>What are you planning?</h2>
          <p>
            Start with the event and discover a lineup that fits the atmosphere.
          </p>
        </div>
        <div className="event-grid">
          {eventTypes.map(([title, desc], i) => (
            <button
              className="event-card"
              key={title}
              onClick={() => {
                setQ(title);
                document
                  .getElementById("artists")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span>0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
              <ArrowRight />
            </button>
          ))}
        </div>
      </section>

      <section className="how-section">
        <div className="container">
          <div className="section-heading light">
            <span className="section-kicker">HOW IT WORKS</span>
            <h2>From discovery to booking in three steps.</h2>
          </div>
          <div className="how-grid">
            <div>
              <b>01</b>
              <h3>Discover</h3>
              <p>
                Search by artist, category, city, price or rating and open the
                profile that catches your eye.
              </p>
            </div>
            <div>
              <b>02</b>
              <h3>Check & estimate</h3>
              <p>
                Choose a date, see availability and review the estimated price
                for your event type.
              </p>
            </div>
            <div>
              <b>03</b>
              <h3>Request</h3>
              <p>
                Complete the validated booking flow and manage the request from
                My Bookings.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container spotlight">
        <div className="spotlight-copy">
          <span className="section-kicker">CURATED SPOTLIGHT</span>
          <h2>Meet some of the talent on stage.</h2>
          <p>
            Jump into a profile to see the artist story, gallery, featured
            video, reviews and booking calendar.
          </p>
          <Link
            className="primary inline"
            to={topArtists[0] ? `/artist/${topArtists[0].id}` : "/"}
          >
            View featured artist <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mini-grid">
          {topArtists.slice(0, 4).map((a) => (
            <ArtistCard key={a.id} a={a} />
          ))}
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <div className="section-heading">
            <span className="section-kicker">QUICK ANSWERS</span>
            <h2>Questions before you book?</h2>
          </div>
          <div className="faq-grid">
            {[
              [
                "Can I change a booking date?",
                "Pending bookings can be edited and the new date is checked against availability.",
              ],
              [
                "What happens if a request fails?",
                "The demo simulates a network request and exposes a retry state instead of leaving you stuck.",
              ],
              [
                "Are the prices real?",
                "No. Prices, reviews and availability in this assessment are demo values, as documented in the project.",
              ],
              [
                "Where do I see my bookings?",
                "Use My Bookings in the top navigation to review, edit or cancel session bookings.",
              ],
            ].map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <ChevronDown size={18} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta">
          <div>
            <span className="section-kicker">READY WHEN YOU ARE</span>
            <h2>Make your next event a headline.</h2>
            <p>Explore the lineup and start with one artist profile.</p>
          </div>
          <button
            className="primary"
            onClick={() =>
              document
                .getElementById("artists")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore artists <ArrowRight size={17} />
          </button>
        </div>
      </section>
    </div>
  );
}
