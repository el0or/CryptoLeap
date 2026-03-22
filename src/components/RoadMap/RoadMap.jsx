import roadmap from "./RoadMap.json";

export default function Roadmap() {
  return (
    <section className="roadmap" id="roadmap">
      <div className="roadmap__wrapper">
        <h2 className="roadmap__title">RoadMap</h2>

        <div className="roadmap__list">
          {roadmap.map((item, i) => {
            const side = i % 2 === 0 ? "left" : "right";

            return (
              <div key={item.id} className={`roadmap__row roadmap__row--${side}`}>
                {side === "left" ? (
                  <>
                    <div className="roadmap__content">
                      <div className="roadmap__card">
                        <div className="roadmap__head">{item.title}</div>
                        <div
                          className={`roadmap__text ${
                            item.blur ? "roadmap__text--blur" : ""
                          }`}
                        >
                          {item.text}
                        </div>
                      </div>
                    </div>

                    <div className="roadmap__lineConnector" />

                    <div className="roadmap__content roadmap__content--empty" />
                  </>
                ) : (
                  <>
                    <div className="roadmap__content roadmap__content--empty" />

                    <div className="roadmap__lineConnector" />

                    <div className="roadmap__content">
                      <div className="roadmap__card">
                        <div className="roadmap__head">{item.title}</div>
                        <div
                          className={`roadmap__text ${
                            item.blur ? "roadmap__text--blur" : ""
                          }`}
                        >
                          {item.text}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}