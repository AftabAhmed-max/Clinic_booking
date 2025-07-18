import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./SignupSuccess.module.css";

export default function SignupSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  useEffect(() => {
    const timer = setTimeout(() => navigate("/login"), 3200);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.successContainer}>
      <div className={styles.icon}>🎉</div>
      <div className={styles.heading}>Account Created!</div>
      <div className={styles.text}>
        Congratulations, your account has been created
        {email ? <> for <b>{email}</b></> : null} <br />
        You can now log in and book appointments.
      </div>
      <div className={styles.redirectText}>
        Redirecting to login in 3 seconds...
      </div>
      <a className={styles.loginLink} href="/login">Go to Login now</a>
    </div>
  );
}
