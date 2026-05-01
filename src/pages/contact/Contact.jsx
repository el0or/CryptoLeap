import { useState } from "react";
import "./Contact.css";

export default function Contacts() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    comment: "",
    agree: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.surname) {
      return setError("Name and surname required");
    }

    if (!form.email.includes("@")) {
      return setError("Invalid email");
    }

    if (!form.agree) {
      return setError("You must accept privacy policy");
    }

    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error();

      alert("Message sent!");
    } catch {
      setError("Error sending form");
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
              {error && <p style={{ color: "red" }}>{error}</p>}

              <div className="contacts__row contacts__row--two">
                <input name="name" placeholder="Name" onChange={handleChange} />
                <input name="surname" placeholder="Surname" onChange={handleChange} />
              </div>

              <div className="contacts__row contacts__row--two">
                <input name="phone" placeholder="+1..." onChange={handleChange} />
                <input name="email" type="email" placeholder="E-mail" onChange={handleChange} />
              </div>

              <textarea
                name="comment"
                placeholder="Comment"
                rows="3"
                onChange={handleChange}
              />

              <div className="contacts__bottom">
                <button type="submit">Contact me</button>

                <label>
                  <input type="checkbox" name="agree" onChange={handleChange} />
                  I agree with the privacy policy
                </label>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}