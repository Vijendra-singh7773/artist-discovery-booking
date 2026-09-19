import { useMemo } from "react";
export default function Calendar({
  booked,
  selected,
  onSelect,
}: {
  booked: string[];
  selected: string;
  onSelect: (d: string) => void;
}) {
  const now = new Date();
  const y = now.getFullYear(),
    m = now.getMonth();
  const first = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();
  const cells = useMemo(
    () =>
      Array.from({ length: first + days }, (_, i) =>
        i < first ? null : i - first + 1,
      ),
    [first, days],
  );
  return (
    <div className="calendar">
      <div className="calhead">
        <strong>
          {now.toLocaleString("en-IN", { month: "long" })} {y}
        </strong>
        <small>Green = available · Gray = booked</small>
      </div>
      <div className="week">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((x) => (
          <b key={x}>{x}</b>
        ))}
      </div>
      <div className="days">
        {cells.map((d, i) => {
          if (!d) return <span key={i} />;
          const date = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
            isBooked = booked.includes(date),
            past = new Date(date) < new Date(new Date().toDateString());
          return (
            <button
              disabled={isBooked || past}
              className={`${isBooked ? "booked " : ""}${selected === date ? "selected " : ""}${past ? "past" : ""}`}
              onClick={() => onSelect(date)}
              key={date}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}
