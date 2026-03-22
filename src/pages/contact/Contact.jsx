import "./Contact.css";

export default function Contacts() {
  return (
    <main className="contacts-page">
      <section className="contacts">
        <div className="contacts__container">
          <h1 className="contacts__title">Contacts</h1>

          <div className="contacts__card">
            <h2 className="contacts__subtitle">Connect with us</h2>

            <form className="contacts__form">
              <div className="contacts__row contacts__row--two">
                <div className="contacts__field">
                  <input type="text" placeholder="Name" />
                </div>

                <div className="contacts__field">
                  <input type="text" placeholder="Surname" />
                </div>
              </div>

              <div className="contacts__row contacts__row--two">
                <div className="contacts__field">
                  <input type="text" placeholder="🇺🇸 +1" />
                </div>

                <div className="contacts__field">
                  <input type="email" placeholder="E-mail" />
                </div>
              </div>

              <div className="contacts__row">
                <div className="contacts__field">
                  <textarea placeholder="Comment" rows="3" />
                </div>
              </div>

              <div className="contacts__bottom">
                <button type="submit" className="contacts__btn">
                  Contact me
                </button>

                <label className="contacts__checkbox">
                  <input type="checkbox" />
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