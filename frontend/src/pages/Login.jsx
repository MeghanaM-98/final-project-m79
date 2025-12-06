import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // auth hook

const API_BASE =
  import.meta.env.MODE === "production"
    ? "/api"
    : "http://localhost:3000/api";

function Login() {
  const [mode, setMode] = useState("login"); // "login" or "register"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  // On mount, load remembered username (if any)
  useEffect(() => {
    const savedRemember = localStorage.getItem("rememberMe") === "true";
    const savedUsername = localStorage.getItem("rememberedUsername") || "";
    const savedPassword = localStorage.getItem("rememberedPassword") || "";

    if (savedRemember && savedUsername && savedPassword) {
      setRememberMe(true);
      setUsername(savedUsername);
      setPassword(savedPassword);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (mode === "register") {
        // Registration flow
        await axios.post(`${API_BASE}/auth/register`, {
          username,
          password,
        });
        setMessage("Registration successful. You can now log in.");
        setMode("login");
      } else {
        // Login flow
        const res = await axios.post(`${API_BASE}/auth/login`, {
          username,
          password,
        });

        const { token } = res.data;

        // Tell the AuthContext we are logged in
        login(token);

        // Handle "Remember me" preferences
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
          localStorage.setItem("rememberedUsername", username);
          localStorage.setItem("rememberedPassword", password);
        } else {
          localStorage.removeItem("rememberMe");
          localStorage.removeItem("rememberedUsername");
          localStorage.removeItem("rememberedPassword");
        }

        // Navigate to dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Something went wrong. Please try again.");
      }
    }
  };


  return (
    <section className="login-page" aria-labelledby="login-heading">
      {/* ===== BACKGROUND VIDEO LAYER ===== */}
      <div className="login-video-layer" aria-hidden="true">
        <video
          className="login-bg-video"
          src="/ai-trends.mp4" // file in public/ folder
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="login-video-overlay" />
      </div>

      {/* ===== FOREGROUND CONTENT (TITLE + CARD) ===== */}
      <div className="login-overlay">
        <div className="login-right-title">
          Recent <b><i>Innovations</i></b> in <br /> Generative AI
        </div>

        {/* Login card */}
        <div className="login-card">
          <h2 id="login-heading" className="login-title">
            {mode === "login" ? "Login" : "Create Account"}
          </h2>

          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="username" className="login-label">
              Email / Username
            </label>
            <input
              id="username"
              className="login-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-required="true"
            />

            <label htmlFor="password" className="login-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-required="true"
            />

            <div className="login-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
            </div>

            {message && (
              <p className="login-message" role="alert">
                {message}
              </p>
            )}

            <button type="submit" className="btn login-submit">
              {mode === "login" ? "Log In" : "Sign Up"}
            </button>

            <p className="login-footer-text">
              {mode === "login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    className="link-button"
                    onClick={() => {
                      setMode("register");
                      setMessage("");
                    }}
                  >
                    Register
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="link-button"
                    onClick={() => {
                      setMode("login");
                      setMessage("");
                    }}
                  >
                    Log in
                  </button>
                </>
              )}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
