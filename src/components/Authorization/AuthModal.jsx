import { useState } from "react";
import { loginUser, registerUser } from "../../api/auth.js";
import "./auth-modal.css";

export default function AuthModal({
  isOpen,
  onClose,
  onAuthSuccess,
  mode,
  setMode,
}) {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const isLogin = mode === "login";

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let data;

      if (isLogin) {
        data = await loginUser({
          email: form.email,
          password: form.password,
        });
      } else {
        data = await registerUser({
          name: form.name,
          surname: form.surname,
          email: form.email,
          password: form.password,
        });
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onAuthSuccess(data.user);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-modal">
      <div className="auth-modal__overlay" onClick={onClose}></div>

      <div className="auth-modal__content">
        <button className="auth-modal__close" onClick={onClose} type="button">
          ×
        </button>

        <h2 className="auth-modal__title">{isLogin ? "Login" : "Sign up"}</h2>

        <form className="auth-modal__form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="auth-modal__row auth-modal__row--two">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="surname"
                placeholder="Surname"
                value={form.surname}
                onChange={handleChange}
              />
            </div>
          )}

          <div className={`auth-modal__row ${isLogin ? "auth-modal__row--two" : ""}`}>
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={form.email}
              onChange={handleChange}
            />

            {isLogin && (
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
            )}
          </div>

          {!isLogin && (
            <div className="auth-modal__row">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
            </div>
          )}

          {error ? <p className="auth-modal__error">{error}</p> : null}

          <button type="submit" className="auth-modal__submit">
            {isLogin ? "Login" : "Sign up"}
          </button>

          <button
            type="button"
            className="auth-modal__switch"
            onClick={() => setMode(isLogin ? "register" : "login")}
          >
            {isLogin ? "Create account" : "Already have an account?"}
          </button>
        </form>
      </div>
    </div>
  );
}