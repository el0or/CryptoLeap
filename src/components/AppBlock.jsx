import iMac from "../images/iMac.png";

export default function AppBlock() {
  return (
    <section className="app-block">
      <h2 className="app-title">App</h2>

      <div className="app-grid">
        <div className="app-item app-img app-img--tl">
          <img src={iMac} alt="iMac app preview" />
        </div>

        <div className="app-item app-text app-text--tr">
          <p>
            Instant exchange like never before: Forget about long waits for
            transaction confirmations. CryptoLeap allows you to exchange BTC for
            USDT in lightning speed right on your desktop. Just a few clicks and
            your assets are converted.
          </p>
        </div>

        <div className="app-item app-text app-text--bl">
          <p>
            Intuitive interface: We don&apos;t need complicated graphics and
            confusing menus. CryptoLeap offers the simplest and most intuitive
            interface that even a beginner can handle. Start exchanging without
            a headache.
          </p>
        </div>

        <div className="app-item app-img app-img--br">
          <img src={iMac} alt="iMac app preview" />
        </div>
      </div>
    </section>
  );
}