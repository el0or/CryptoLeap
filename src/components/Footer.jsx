export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__topLine" />

      <div className="footer__wrapper">
        <div className="footer__left">
          <div className="footer__brand">CryptoLeap</div>
          <a className="footer__policy" href="/privacy">
            Privacy Policies
          </a>
          <div className="footer__copy">© CryptoLeap 2025</div>
        </div>

        <nav className="footer__nav">
          <a href="#about">About Us</a>
          <a href="#partners">Partners</a>
          <a href="#reviews">Reviews</a>
        </nav>

        <nav className="footer__nav">
          <a href="#roadmap">RoadMap</a>
          <a href="#app">App</a>
        </nav>

        <a className="footer__download" href="#download">
          Download
        </a>
      </div>
    </footer>
  );
}