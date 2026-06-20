import { useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleEmailAuth = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setSuccess("Logged in successfully! ✅");
        setTimeout(() => navigate("/"), 1000); // ← redirect after 1 second
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } }
        });
        if (error) throw error;
        setSuccess("Account created! Check your email to confirm. ✅");
      }
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin }
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? "Welcome Back 👋" : "Create Account"}</h2>
        <p className="auth-subtitle">
          {isLogin ? "Login to your account" : "Sign up for free — no card needed"}
        </p>

        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="auth-input"
          />
        )}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />

        {error && <p className="auth-error">⚠️ {error}</p>}
        {success && <p className="auth-success">{success}</p>}

        <button className="auth-btn primary" onClick={handleEmailAuth} disabled={loading}>
          {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
        </button>

        <div className="auth-divider"><span>OR</span></div>

        <button className="auth-btn google" onClick={handleGoogle} disabled={loading}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" />
          Continue with Google
        </button>

        <p className="auth-toggle">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => { setIsLogin(!isLogin); setError(""); setSuccess(""); }}>
            {isLogin ? " Sign Up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
}