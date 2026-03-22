import { useState } from "react";
import faqData from "../pages/aboutUs/Faq.json";

export default function Faq() {
  const [openId, setOpenId] = useState(null);

  const toggleFaq = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="about-faq">
      <h2 className="about-faq__title">FAQ</h2>

      <div className="about-faq__list">
        {faqData.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div
              className={`about-faq__item ${isOpen ? "is-open" : ""}`}
              key={item.id}
            >
              <button
                type="button"
                className="about-faq__head"
                onClick={() => toggleFaq(item.id)}
                aria-expanded={isOpen}
              >
                <span className="about-faq__question">{item.question}</span>
                <span className="about-faq__icon">{isOpen ? "−" : "+"}</span>
              </button>

              <div className="about-faq__body">
                <p className="about-faq__answer">{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}