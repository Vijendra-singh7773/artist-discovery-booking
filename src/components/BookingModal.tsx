import { useMemo, useState } from "react";
import { X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import type { Artist, Booking, EventType } from "../types";
import Calendar from "./Calendar";
import { useApp } from "../store/AppContext";
import { submitBooking } from "../services/api";
const mult: Record<EventType, number> = {
  Wedding: 1.35,
  Corporate: 1.2,
  "College Fest": 1.1,
  "Private Party": 1,
};
export default function BookingModal({
  artist,
  onClose,
}: {
  artist: Artist;
  onClose: () => void;
}) {
  const { bookings, addBooking, bookedDates } = useApp();
  const [step, setStep] = useState(1),
    [date, setDate] = useState(""),
    [eventType, setEventType] = useState<EventType>("Wedding"),
    [city, setCity] = useState(artist.city),
    [audience, setAudience] = useState(100),
    [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [phone, setPhone] = useState(""),
    [loading, setLoading] = useState(false),
    [error, setError] = useState(""),
    [done, setDone] = useState(false);
  const price = useMemo(
    () =>
      Math.round(
        artist.price *
          mult[eventType] *
          (date && new Date(date).getDay() >= 5 ? 1.15 : 1),
      ),
    [artist.price, eventType, date],
  );
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    phoneOk = /^[6-9]\d{9}$/.test(phone),
    validContact = name.trim().length >= 2 && emailOk && phoneOk;
  const available = !bookedDates(artist).includes(date);
  async function confirm() {
    setLoading(true);
    setError("");
    const b: Booking = {
      id: crypto.randomUUID(),
      artistId: artist.id,
      artistName: artist.name,
      date,
      eventType,
      city,
      audience,
      contact: { name, email, phone },
      price,
      status: "Pending",
    };
    try {
      const saved = await submitBooking(b);
      addBooking(saved);
      setDone(true);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="overlay">
      <div className="modal">
        <button className="close" onClick={onClose}>
          <X />
        </button>
        {done ? (
          <div className="success">
            <CheckCircle size={64} />
            <h2>Booking Confirmed!</h2>
            <p>
              Your booking request for <b>{artist.name}</b> on {date} is
              confirmed.
            </p>
            <button className="primary" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="steps">
              <i className="active">1</i>
              <span />
              <i className={step >= 2 ? "active" : ""}>2</i>
              <span />
              <i className={step >= 3 ? "active" : ""}>3</i>
            </div>
            {step === 1 && (
              <section>
                <h2>Event details</h2>
                <label>
                  Event date
                  <Calendar
                    booked={bookedDates(artist)}
                    selected={date}
                    onSelect={setDate}
                  />
                  {date && <small className="ok">Selected: {date}</small>}
                </label>
                <div className="formgrid">
                  <label>
                    Event type
                    <select
                      value={eventType}
                      onChange={(e) =>
                        setEventType(e.target.value as EventType)
                      }
                    >
                      {Object.keys(mult).map((x) => (
                        <option key={x}>{x}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    City
                    <input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </label>
                  <label>
                    Expected audience
                    <input
                      type="number"
                      min="1"
                      value={audience}
                      onChange={(e) => setAudience(+e.target.value)}
                    />
                  </label>
                </div>
                <div className="estimate">
                  Estimated price{" "}
                  <strong>₹{price.toLocaleString("en-IN")}</strong>
                </div>
                <button
                  className="primary full"
                  disabled={!date || !available}
                  onClick={() => setStep(2)}
                >
                  Continue
                </button>
              </section>
            )}
            {step === 2 && (
              <section>
                <h2>Contact details</h2>
                <label>
                  Full name
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {name && name.trim().length < 2 && (
                    <em>Enter your full name.</em>
                  )}
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {email && !emailOk && <em>Enter a valid email.</em>}
                </label>
                <label>
                  Phone
                  <input
                    inputMode="numeric"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, ""))
                    }
                  />
                  {phone && !phoneOk && (
                    <em>Enter a valid 10-digit Indian mobile number.</em>
                  )}
                </label>
                <div className="actions">
                  <button className="secondary" onClick={() => setStep(1)}>
                    Back
                  </button>
                  <button
                    className="primary"
                    disabled={!validContact}
                    onClick={() => setStep(3)}
                  >
                    Review
                  </button>
                </div>
              </section>
            )}
            {step === 3 && (
              <section>
                <h2>Review & confirm</h2>
                <div className="summary">
                  <p>
                    <span>Artist</span>
                    <b>{artist.name}</b>
                  </p>
                  <p>
                    <span>Date</span>
                    <b>{date}</b>
                  </p>
                  <p>
                    <span>Event</span>
                    <b>{eventType}</b>
                  </p>
                  <p>
                    <span>City</span>
                    <b>{city}</b>
                  </p>
                  <p>
                    <span>Audience</span>
                    <b>{audience}</b>
                  </p>
                  <p>
                    <span>Contact</span>
                    <b>
                      {name} · {email}
                    </b>
                  </p>
                  <hr />
                  <p className="total">
                    <span>Total</span>
                    <b>₹{price.toLocaleString("en-IN")}</b>
                  </p>
                </div>
                {error && (
                  <div className="error">
                    <AlertCircle size={18} />
                    {error}
                  </div>
                )}
                <div className="actions">
                  <button
                    className="secondary"
                    disabled={loading}
                    onClick={() => setStep(2)}
                  >
                    Back
                  </button>
                  <button
                    className="primary"
                    disabled={loading}
                    onClick={confirm}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="spin" /> Confirming…
                      </>
                    ) : error ? (
                      "Retry"
                    ) : (
                      "Confirm booking"
                    )}
                  </button>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
