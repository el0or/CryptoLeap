import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__topLine" />

      <div className="footer__wrapper">
        <div className="footer__left">
          <div className="footer__brand">CryptoLeap</div>
          <Link className="footer__policy" to="/privacy">
            Privacy Policies
          </Link>
          <div className="footer__copy">© CryptoLeap 2025</div>
        </div>

        <nav className="footer__nav">
          <Link to="/about">About Us</Link>
          <Link to="/contacts">Contacts</Link>
          <a href="/#reviews">Reviews</a>
        </nav>

        <nav className="footer__nav">
          <a href="/#roadmap">RoadMap</a>
          <Link to="/download">Download</Link>
        </nav>

        <Link className="footer__download" to="/download">
          Download
        </Link>
      </div>
    </footer>
  );
}