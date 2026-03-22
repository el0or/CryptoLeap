import appstoreIcon from "../images/appstore.png";

export default function DownloadLinks() {
  return (
    <section className="download-links">
      <div className="download-links__container">
        <h2 className="download-links__title">Links</h2>

        <div className="download-links__grid">
          <a className="download-links__item" href="#">
            <img src={appstoreIcon} alt="App Store" />
            <span>download for iphone</span>
          </a>

          <a className="download-links__item" href="#">
            <img src={appstoreIcon} alt="App Store" />
            <span>download for mac</span>
          </a>
        </div>
      </div>
    </section>
  );
}