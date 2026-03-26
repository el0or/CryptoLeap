import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccountData } from "../../api/auth.js";
import "./account.css";

export default function Account() {
  const [user, setUser] = useState(null);
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAccountData(token);
        setUser(data.user);
        setRates(data.rates);
      } catch (err) {
        const status = err.response?.status;
        const message = err.response?.data?.message || "Failed to load account";

        if (status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.dispatchEvent(new Event("authChanged"));
          navigate("/");
          return;
        }

        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChanged"));
    navigate("/");
  };

  if (loading) {
    return (
      <section className="account-page">
        <div className="account-page__container">
          <h1 className="account-page__title">My account</h1>
          <p className="account-page__status">Loading...</p>
        </div>
      </section>
    );
  }

  if (error && !user) {
    return (
      <section className="account-page">
        <div className="account-page__container">
          <h1 className="account-page__title">My account</h1>
          <p className="account-page__status">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="account-page">
      <div className="account-page__container">
        <h1 className="account-page__title">My account</h1>

        {error ? <p className="account-page__status">{error}</p> : null}

        <div className="account-page__grid">
          <div className="account-card account-card--profile">
            <div className="account-card__field">
              <span className="account-card__label">Name</span>
              <span className="account-card__value">{user?.name || "—"}</span>
            </div>

            <div className="account-card__field">
              <span className="account-card__label">Surname</span>
              <span className="account-card__value">{user?.surname || "—"}</span>
            </div>

            <div className="account-card__field">
              <span className="account-card__label">E-mail</span>
              <span className="account-card__value">{user?.email || "—"}</span>
            </div>

            <div className="account-card__field">
              <span className="account-card__label">Password</span>
              <span className="account-card__value">••••••••</span>
            </div>
          </div>

          <div className="account-page__right">
            <div className="account-card account-card--rates">
              <h2 className="account-card__rates-title">Current exchange rate</h2>

              <div className="account-rates">
                <div className="account-rates__item">
                  <span className="account-rates__name">USD</span>
                  <span className="account-rates__value">{rates?.USD ?? "—"}</span>
                </div>

                <div className="account-rates__item">
                  <span className="account-rates__name">EUR</span>
                  <span className="account-rates__value">{rates?.EUR ?? "—"}</span>
                </div>

                <div className="account-rates__item">
                  <span className="account-rates__name">RUB</span>
                  <span className="account-rates__value">{rates?.RUB ?? "—"}</span>
                </div>

                <div className="account-rates__note">
                  {rates?.base && rates?.date
                    ? `Base: ${rates.base} | Date: ${rates.date}`
                    : "Rates are temporarily unavailable"}
                </div>
              </div>
            </div>

            <button
              className="account-page__logout"
              onClick={handleLogout}
              type="button"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}