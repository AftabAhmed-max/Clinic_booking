import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./CreatePassword.module.css";
import { auth } from "../../../firebaseAuth";
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";

export default function CreatePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [form, setForm] = useState({
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);

    const tempPass = localStorage.getItem("tempPass");
    if (!tempPass) {
      setError("Session expired. Please sign up again.");
      setLoading(false);
      return;
    }

    try {
      const cred = await signInWithEmailAndPassword(auth, email, tempPass);
      await updatePassword(auth.currentUser, form.password);
      localStorage.removeItem("tempPass");
      navigate("/signup-success", { state: { email } });
    } catch (err) {
      console.error("CreatePassword error:", err);
      if (err.code === "auth/wrong-password") {
        setError("Session expired or link invalid. Please try registering again.");
      } else {
        setError("Failed to set password. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.createContainer}>
      <div className={styles.heading}>Create Password</div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          name="password"
          type="password"
          placeholder="Create Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          name="confirm"
          type="password"
          placeholder="Re-enter Password"
          value={form.confirm}
          onChange={handleChange}
          required
        />
        {error && <div className={styles.error}>{error}</div>}
        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
      <div className={styles.loginText}>
        Already have an account? <a href="/login">Log In</a>
      </div>
    </div>
  );
}
