import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Contacts from "./pages/contact/Contact.jsx";
import AboutUs from "./pages/aboutUs/AboutUs.jsx";
import Download from "./pages/download/Download.jsx";
import Account from "./pages/account/Account.jsx";
import PrivacyPolitic from "./pages/privacyPolitic/PrivacyPolitic.jsx";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/download" element={<Download/>} />
        <Route path="/account" element={<Account />} />
        <Route path="/privacy" element={<PrivacyPolitic />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;