import React, { useEffect, useMemo, useState } from "react";
import reviewsData from "./Reviews.json";

function mod(n, m) {
  return ((n % m) + m) % m;
}

export default function ReviewsSlider() {
  const items = useMemo(() => reviewsData, []);
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => mod(i - 1, items.length));
  const next = () => setActive((i) => mod(i + 1, items.length));

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [items.length]);

  const leftIndex = mod(active - 1, items.length);
  const rightIndex = mod(active + 1, items.length);

  return (
    <section className="reviews" id="reviews">
      <h2 className="reviews-title">Reviews</h2>

      <div className="reviews-slider">
        <button className="nav nav-left" onClick={prev}>
          <span className="nav-icon">‹</span>
        </button>

        <div className="stage">
          <ReviewCard data={items[leftIndex]} pos="left" />
          <ReviewCard data={items[active]} pos="active" />
          <ReviewCard data={items[rightIndex]} pos="right" />
        </div>

        <button className="nav nav-right" onClick={next}>
          <span className="nav-icon">›</span>
        </button>
      </div>
    </section>
  );
}

function ReviewCard({ data, pos }) {
  return (
    <article className={`card ${pos}`}>
      <div className="card-head">
        <img src={data.avatar} alt={data.name} className="avatar" />
        <div className="meta">
          <div className="name">{data.name}</div>
          <div className="role">{data.role}</div>
        </div>
      </div>

      <p className="card-text">"{data.text}"</p>
    </article>
  );
}