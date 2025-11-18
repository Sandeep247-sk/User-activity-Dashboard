import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginRequest, registerRequest } from "../services/api.js";

const detectContext = () => {
  if (typeof window === "undefined") {
    return {
      device: "Unknown",
      os: "Unknown",
      browser: "Unknown",
      timezone: "UTC",
      location: "Unknown",
      ipAddress: "127.0.0.1",
    };
  }

  const ua = window.navigator.userAgent;
  const device = /mobile/i.test(ua) ? "Mobile" : /tablet/i.test(ua) ? "Tablet" : "Desktop";
  const os =
    (ua.match(/Windows NT 10/) && "Windows 10") ||
    (ua.match(/Windows NT 11|Windows NT 10.0/) && "Windows 11") ||
    (ua.match(/Mac OS X/) && "macOS") ||
    (ua.match(/Android/) && "Android") ||
    (ua.match(/iPhone|iPad|iPod/) && "iOS") ||
    "Linux";

  let browser = "Unknown";
  if (/Chrome\/\d+/.test(ua) && !/Edge\/\d+/.test(ua)) browser = "Chrome";
  else if (/Safari\/\d+/.test(ua) && /Version\/\d+/.test(ua)) browser = "Safari";
  else if (/Firefox\/\d+/.test(ua)) browser = "Firefox";
  else if (/Edg\/\d+/.test(ua)) browser = "Edge";

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return {
    device,
    os,
    browser,
    timezone,
    location: `Local Session • ${timezone}`,
    ipAddress: "127.0.0.1",
  };
};

const LoginPage = ({ onSuccess }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });
  const [registerError, setRegisterError] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await loginRequest({
        email,
        password,
        context: detectContext(),
      });

      onSuccess(email);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setRegisterError("");
    setRegisterMessage("");
    setIsRegistering(true);

    try {
      const newEmail = registerData.email;
      const response = await registerRequest(registerData);
      setRegisterMessage(response.message || "Account created. You can now sign in.");
      setRegisterData({ name: "", email: "", password: "" });
      setInfoMessage("Account created! Sign in with your new credentials.");
      setEmail(newEmail);
      setPassword("");
      setShowRegister(false);
    } catch (err) {
      const friendlyMessage =
        err.message === "Failed to fetch"
          ? "Unable to reach the server. Please ensure the backend is running."
          : err.message;
      setRegisterError(friendlyMessage);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="auth-layout">
      <div className={`auth-card ${showRegister ? "is-flipped" : ""}`}>
        <div className="auth-card-inner">
          <section className="auth-panel auth-panel--front">
            <h1>Account Login</h1>
            <p className="muted">
              Create an account first, then sign back in using the email and password you registered.
            </p>
            {infoMessage && <p className="success">{infoMessage}</p>}
            <form className="auth-form" onSubmit={handleSubmit}>
              <label>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@company.com"
                  required
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </label>

              {error && <p className="error">{error}</p>}

              <button type="submit" className="primary-button" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>

              <button
                type="button"
                className="register-link"
                onClick={() => setShowRegister(true)}
                aria-controls="register-panel"
              >
                Need an account? Register here
              </button>
            </form>
          </section>

          <section className="auth-panel auth-panel--back" id="register-panel">
            <h2>Create an account</h2>
            <p className="muted small">
              Add your own email and password, then use them to sign in. Great for demos and collaborative testing.
            </p>

            <form className="auth-form" onSubmit={handleRegister}>
              <label>
                Full name
                <input
                  type="text"
                  name="name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  placeholder="Alex Rivera"
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  placeholder="you@company.com"
                  required
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  placeholder="At least 6 characters"
                  minLength={6}
                  required
                />
              </label>

              {registerError && <p className="error">{registerError}</p>}
              {registerMessage && <p className="success">{registerMessage}</p>}

              <button type="submit" className="primary-button" disabled={isRegistering}>
                {isRegistering ? "Saving..." : "Register"}
              </button>

              <button type="button" className="register-link" onClick={() => setShowRegister(false)}>
                Back to login
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

