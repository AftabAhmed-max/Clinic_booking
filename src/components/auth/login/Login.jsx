import styles from './Login.module.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "../../../firebaseAuth";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const cred = await signInWithEmailAndPassword(auth, form.email, form.password);
      if (!cred.user.emailVerified) {
        setError("Please verify your email before logging in.");
      } else {
        navigate("/"); // Redirect as needed
      }
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("No user found with this email.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many failed attempts. Please try again later.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authWrapper}>
      <div className={styles.header}>
        <h2>Welcome!</h2>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          className={styles.input}
          placeholder="Email"
          name="email"
          autoComplete="username"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          className={styles.input}
          placeholder="Password"
          name="password"
          autoComplete="current-password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <div className={styles.forgotRow}>
          <Link to="/forgot-password" className={styles.forgotLink}>Forgot Password</Link>
        </div>
        {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
        <button type="submit" className={styles.primaryBtn} disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
      <div className={styles.bottomText}>
        Don’t have an account? <Link to="/signup" className={styles.signupLink}>Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
