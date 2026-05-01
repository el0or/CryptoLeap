import { useState } from "react";
import "./Contact.css";

const countries = [
  { code: "US", label: "🇺🇸 +1", dial: "+1", min: 10, max: 10 },
  { code: "RU", label: "🇷🇺 +7", dial: "+7", min: 10, max: 10 },
  { code: "GB", label: "🇬🇧 +44", dial: "+44", min: 10, max: 10 },
  { code: "DE", label: "🇩🇪 +49", dial: "+49", min: 10, max: 11 },
  { code: "FR", label: "🇫🇷 +33", dial: "+33", min: 9, max: 9 },
];

export default function Contacts() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    country: "US",
    phone: "",
    email: "",
    comment: "",
    agree: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const selectedCountry = countries.find((item) => item.code === form.country);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
    setSuccess("");
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = () => {
    const digits = form.phone.replace(/\D/g, "");

    return (
      digits.length >= selectedCountry.min &&
      digits.length <= selectedCountry.max
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const surname = form.surname.trim();
    const email = form.email.trim();
    const comment = form.comment.trim();

    if (!name || !surname) {
      return setError("Name and surname are required");
    }

    if (!validatePhone()) {
      return setError(`Invalid phone number for ${selectedCountry.label}`);
    }

    if (!validateEmail(email)) {
      return setError("Invalid email");
    }

    if (!comment) {
      return setError("Comment is required");
    }

    if (!form.agree) {
      return setError("You must accept the privacy policy");
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        ...form,
        name,
        surname,
        email,
        comment,
        phone: `${selectedCountry.dial} ${form.phone}`,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setSuccess("Message sent successfully!");

      setForm({
        name: "",
        surname: "",
        country: "US",
        phone: "",
        email: "",
        comment: "",
        agree: false,
      });
    } catch {
      setError("Error sending form");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="contacts-page">
      <section className="contacts">
        <div className="contacts__container">
          <h1 className="contacts__title">Contacts</h1>

          <div className="contacts__card">
            <h2 className="contacts__subtitle">Connect with us</h2>

            <form className="contacts__form" onSubmit={handleSubmit}>
              {error && <p className="contacts__message contacts__message--error">{error}</p>}
              {success && <p className="contacts__message contacts__message--success">{success}</p>}

              <div className="contacts__row contacts__row--two">
                <div className="contacts__field">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="contacts__field">
                  <input
                    type="text"
                    name="surname"
                    placeholder="Surname"
                    value={form.surname}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="contacts__row contacts__row--two">
                <div className="contacts__field contacts__phone">
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className="contacts__select"
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.label}
                      </option>
                    ))}
                  </select>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="contacts__field">
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="contacts__row">
                <div className="contacts__field">
                  <textarea
                    name="comment"
                    placeholder="Comment"
                    rows="3"
                    value={form.comment}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="contacts__bottom">
                <button type="submit" className="contacts__btn" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Contact me"}
                </button>

                <label className="contacts__checkbox">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                  />
                  <span>I agree with the privacy policy</span>
                </label>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}