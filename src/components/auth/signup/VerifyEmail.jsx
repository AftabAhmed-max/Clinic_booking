import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./VerifyEmail.module.css";
import { auth } from "../../../firebaseAuth";
import { signInWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [timer, setTimer] = useState(60);
  const [resending, setResending] = useState(false);
  const [polling, setPolling] = useState(true);
  const [error, setError] = useState("");

  // Timer for resend
  useEffect(() => {
    if (timer === 0) return;
    const t = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(t);
  }, [timer]);

  // Polling for email verification
  useEffect(() => {
    if (!email) return;
    let interval;
    const tempPass = localStorage.getItem("tempPass");

    async function checkVerification() {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, tempPass);
        await userCredential.user.reload();
        if (userCredential.user.emailVerified) {
          setPolling(false);
          clearInterval(interval);
          // DO NOT remove tempPass here! Let CreatePassword handle it.
          navigate("/create-password", { state: { email } });
        } else {
          await signOut(auth);
        }
      } catch (err) {
        // If not verified/logged in, just keep polling
      }
    }

    interval = setInterval(checkVerification, 3500);

    return () => clearInterval(interval);
  }, [email, navigate]);

  // Resend verification email
  const handleResend = async () => {
    setResending(true);
    setError("");
    try {
      const tempPass = localStorage.getItem("tempPass");
      const userCredential = await signInWithEmailAndPassword(auth, email, tempPass);
      await sendEmailVerification(userCredential.user);
      await signOut(auth);
      setTimer(60);
    } catch (err) {
      setError("Failed to resend verification link.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className={styles.verifyContainer}>
      <div className={styles.heading}>Email Verification</div>
      <div className={styles.infoText}>
        We’ve sent a verification link to <span>{email}</span>
        <br />
        Please check your inbox and verify to continue.
      </div>
      <div className={styles.spinnerBox}>
        {polling ? <div className={styles.spinner}></div> : <span>✅</span>}
        <div>
          {polling
            ? "Waiting for verification..."
            : "Verified! Redirecting..."}
        </div>
      </div>
      <div className={styles.resend}>
        Didn’t get the link?{" "}
        <button
          disabled={timer > 0 || resending}
          className={styles.resendBtn}
          onClick={handleResend}
        >
          {resending ? "Resending..." : "Resend"}
        </button>
        {timer > 0 && (
          <span className={styles.timer}>&nbsp;({timer}s)</span>
        )}
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
}
