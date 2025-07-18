import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { auth } from "../../firebaseAuth";
import { onAuthStateChanged, signOut } from "firebase/auth";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/booking", label: "Book Appointment" }
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Listen for Firebase auth state changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsub();
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    // Optional: redirect to home or login
    navigate("/");
  };

  // Close menu on nav click (mobile)
  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>SomDoctor</div>
      <button
        className={styles.hamburger}
        aria-label="Open navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>

      <nav className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`${styles.navLink} ${
              location.pathname === link.to ? styles.active : ""
            }`}
            onClick={handleNavClick}
          >
            {link.label}
          </Link>
        ))}

        {/* Auth Section */}
        {!user && (
          <>
            <Link
              to="/login"
              className={`${styles.navLink} ${location.pathname === "/login" ? styles.active : ""}`}
              onClick={handleNavClick}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className={`${styles.navLink} ${location.pathname === "/signup" ? styles.active : ""}`}
              onClick={handleNavClick}
            >
              Sign Up
            </Link>
          </>
        )}
        {user && (
          <div className={styles.authSection}>
            <span className={styles.userName}>
              {user.displayName || user.email.split("@")[0]}
            </span>
            <button
              className={styles.logoutBtn}
              onClick={() => {
                handleNavClick();
                handleLogout();
              }}
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
