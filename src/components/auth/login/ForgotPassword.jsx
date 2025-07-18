import { useState } from "react";
import styles from './ForgotPassword.module.css';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebaseAuth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // "success", "error", or ""
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setStatus("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setStatus("");

    try {
      await sendPasswordResetEmail(auth, email);
      setStatus("success");
    } catch (err) {
      // Firebase never tells if email is registered or not, for security.
      setStatus("success"); // Always show success to prevent email enumeration
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Forgot Password</h2>
      <p className={styles.text}>
        We need your registration email to send you a password reset link!
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          className={styles.input}
          value={email}
          onChange={handleChange}
          required
        />
        <button className={styles.button} type="submit" disabled={loading || !email}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
      {status === "success" && (
        <div className={styles.success}>
          If this email is registered, you will receive a password reset link shortly. Please check your inbox (and spam).
        </div>
      )}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default ForgotPassword;
