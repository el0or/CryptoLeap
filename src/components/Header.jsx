import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className={`header ${isMenuOpen ? "menu-open" : ""}`}>
      <div className="header-wrapper">
        <Link to="/" className="logo" onClick={closeMenu}>
          CryptoLeap
        </Link>

        <nav className={`header-nav ${isMenuOpen ? "active" : ""}`}>
          <Link to="/about" onClick={closeMenu}>About us</Link>
          <Link to="/contacts" onClick={closeMenu}>Contacts</Link>
          <a href="/#reviews" onClick={closeMenu}>Reviews</a>
          <a href="/#roadmap" onClick={closeMenu}>RoadMap</a>
          <a href="/download" onClick={closeMenu}>Download</a>

          <button className="download-btn mobile-download" onClick={closeMenu}>
            Download
          </button>
        </nav>

        <button className="download-btn desktop-download">Download</button>

        <button
          className={`burger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div
        className={`header-overlay ${isMenuOpen ? "active" : ""}`}
        onClick={closeMenu}
      ></div>
    </header>
  );
}