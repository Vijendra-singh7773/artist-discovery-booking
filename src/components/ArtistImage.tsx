import { useEffect, useState } from "react";

export default function ArtistImage({
  src,
  name,
  className = "",
}: {
  src: string;
  name: string;
  className?: string;
}) {
  const [image, setImage] = useState("");
  useEffect(() => {
    let alive = true;
    if (src.includes("/api/rest_v1/page/summary/")) {
      fetch(src)
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (alive)
            setImage(
              data?.thumbnail?.source || data?.originalimage?.source || "",
            );
        })
        .catch(() => {});
    } else setImage(src);
    return () => {
      alive = false;
    };
  }, [src]);
  return (
    <img
      className={className}
      src={
        image ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=171d3d&color=fff&size=900`
      }
      alt={name}
    />
  );
}
