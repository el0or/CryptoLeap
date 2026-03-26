import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthModal from "./Authorization/AuthModal.jsx";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen || isAuthOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isAuthOpen]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const handleStorage = () => {
      const nextUser = localStorage.getItem("user");
      setUser(nextUser ? JSON.parse(nextUser) : null);
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("authChanged", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("authChanged", handleStorage);
    };
  }, []);

  const openLogin = () => {
    setAuthMode("login");
    setIsAuthOpen(true);
    closeMenu();
  };

  const handleAuthSuccess = (loggedUser) => {
    setUser(loggedUser);
    window.dispatchEvent(new Event("authChanged"));
  };

  return (
    <>
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
            <Link to="/download" onClick={closeMenu}>Download</Link>

            {user ? (
              <Link className="download-btn mobile-download" to="/account" onClick={closeMenu}>
                My account
              </Link>
            ) : (
              <button className="download-btn mobile-download" onClick={openLogin}>
                Login
              </button>
            )}
          </nav>

          {user ? (
            <Link className="download-btn desktop-download" to="/account">
              My account
            </Link>
          ) : (
            <button className="download-btn desktop-download" onClick={openLogin}>
              Login
            </button>
          )}

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

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        mode={authMode}
        setMode={setAuthMode}
      />
    </>
  );
}