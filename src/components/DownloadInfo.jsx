import iphoneImg from "../images/iphone.png";

export default function DownloadInfo() {
  return (
    <section className="download-info">
      <div className="download-info__container">
        <h1 className="download-info__title">Download</h1>

        <div className="download-info__content">
          <div className="download-info__image">
            <img src={iphoneImg} alt="CryptoLeap iPhone app" />
          </div>

          <div className="download-info__text">
            <p>
              <strong>CryptoLeap:</strong> Exchange cryptocurrency profitably and
              securely with our simple and user-friendly application. Get the
              best rates and instant transactions right now.
            </p>

            <p>
              With built-in Face ID authentication on iPhone and MacBook,
              CryptoLeap provides an extra layer of security, allowing you to
              access and manage your crypto safely with just a glance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}