import macbook from "../images/MacBook.png";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-wrapper">
        <div className="hero-content">
          <div className="hero-left">
            <img className="hero-mac" src={macbook} alt="MacBook with trading chart" />
          </div>

          <div className="hero-right">
            <h1 className="hero-title">
              <span className="hero-brand">CryptoLeap:</span>{" "}
              Exchange cryptocurrency profitably and securely with our simple and user-friendly application.
              Get the best rates and instant transactions right now.
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
