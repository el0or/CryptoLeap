const stats = [
  {
    id: 1,
    text: (
      <>
        More than 300
        <br />
        completed orders
      </>
    ),
  },
  {
    id: 2,
    text: (
      <>
        More than 100
        <br />
        reviews
      </>
    ),
  },
];

export default function AboutStats() {
  return (
    <section className="about-stats">
      <div className="about-stats__grid">
        {stats.map((item) => (
          <div className="about-stats__card" key={item.id}>
            <p className="about-stats__text">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}