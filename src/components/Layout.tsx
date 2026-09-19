import { Link, NavLink } from "react-router-dom";
import { CalendarDays, Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useApp } from "../store/AppContext";
export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { bookings } = useApp();
  return (
    <>
      <header className="header">
        <div className="nav">
          <Link to="/" className="logo">
            Artist<span>ly</span>
          </Link>
          <button
            className="mobile"
            aria-label="Toggle navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
          <nav className={open ? "show" : ""}>
            <NavLink onClick={() => setOpen(false)} to="/">
              Discover
            </NavLink>
            <NavLink onClick={() => setOpen(false)} to="/bookings">
              <CalendarDays size={17} /> My Bookings{" "}
              {bookings.filter((b) => b.status !== "Cancelled").length > 0 && (
                <b>{bookings.filter((b) => b.status !== "Cancelled").length}</b>
              )}
            </NavLink>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer>
        <div className="footer-main">
          <div>
            <Link to="/" className="logo">
              Artist<span>ly</span>
            </Link>
            <p>Discover talent. Plan confidently. Make the moment.</p>
          </div>
          <div>
            <strong>Explore</strong>
            <Link to="/">Artists</Link>
            <Link to="/bookings">My Bookings</Link>
          </div>
          <div>
            <strong>For events</strong>
            <span>Weddings</span>
            <span>Corporate</span>
            <span>College fests</span>
          </div>
          <div>
            <strong>Project</strong>
            <span>React + TypeScript</span>
            <span>Mock API flow</span>
            <span>Responsive UI</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Artistly · Artist Discovery & Booking</span>
          <span>
            Built for the Frontend Developer assessment{" "}
            <ArrowUpRight size={13} />
          </span>
        </div>
      </footer>
    </>
  );
}
