import { useState, useEffect } from "react";

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
        <p className="logo">CryptoLeap</p>

        <nav className={`header-nav ${isMenuOpen ? "active" : ""}`}>
          <a href="#" onClick={closeMenu}>About us</a>
          <a href="#" onClick={closeMenu}>Contacts</a>
          <a href="#" onClick={closeMenu}>Reviews</a>
          <a href="#" onClick={closeMenu}>RoadMap</a>
          <a href="#" onClick={closeMenu}>App</a>
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