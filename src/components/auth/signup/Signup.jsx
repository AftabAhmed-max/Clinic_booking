import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import { useState } from "react";
import { auth } from "../../../firebaseAuth";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signOut,
} from "firebase/auth";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
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
    const randomPass = Math.random().toString(36).slice(-10) + "@Abc";
    localStorage.setItem("tempPass", randomPass); // Store the temp pass!

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        randomPass
      );
      await updateProfile(userCredential.user, {
        displayName: form.name,
      });
      await sendEmailVerification(userCredential.user);
      await signOut(auth);
      navigate("/verify-email", { state: { email: form.email } });
    } catch (err) {
      setError(
        err.code === "auth/email-already-in-use"
          ? "Email already in use. Please log in or reset your password."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.heading}>Create Account</div>
      <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
        <input
          className={styles.signupInput}
          name="name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className={styles.signupInput}
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className={styles.signupInput}
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />
        {error && <div className={styles.error}>{error}</div>}
        <button className={styles.signupButton} type="submit" disabled={loading}>
          {loading ? "Sending Email..." : "Continue"}
        </button>
      </form>
      <div className={styles.loginText}>
        Already have an account? <a href="/login">Log In</a>
      </div>
    </div>
  );
}
