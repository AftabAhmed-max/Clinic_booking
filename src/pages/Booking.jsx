import { useState, useEffect } from "react";
import styles from "./Booking.module.css";
import { getAuth } from "firebase/auth";

const doctorsList = [
  "Dr. Ahmed",
  "Dr. Patel",
  "Dr. Mehra"
  // Add more doctors if needed
];

const Booking = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    doctor: "",
    date: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState(null);

  // Check Firebase Auth state on mount
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      if (u) {
        setForm((prev) => ({
          ...prev,
          name: u.displayName || "",
          email: u.email || "",
        }));
      }
    });
    return unsubscribe;
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Validate fields
  const validate = () => {
    let errs = {};
    if (!form.name) errs.name = "Name is required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email required";
    if (!form.phone || !/^[0-9]{10}$/.test(form.phone)) errs.phone = "Valid 10 digit phone required";
    if (!form.doctor) errs.doctor = "Please select a doctor";
    if (!form.date) errs.date = "Please select a date";
    return errs;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    // Replace with Firebase logic if you wish; for now, simulate success
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(
        `You have an appointment booked with ${form.doctor} on ${form.date}.`
      );
      setForm({
        name: user?.displayName || "",
        email: user?.email || "",
        phone: "",
        doctor: "",
        date: "",
        message: "",
      });
    }, 1200);
  };

  return (
    <div className={styles.bookingWrapper}>
      <h2>Book an Appointment</h2>
      {!user ? (
        <div className={styles.notLoggedIn}>
          <strong>Please log in to book an appointment.</strong>
        </div>
      ) : (
        <form className={styles.bookingForm} onSubmit={handleSubmit} autoComplete="off">
          <div className={styles.field}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>
          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>
          <div className={styles.field}>
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className={styles.error}>{errors.phone}</span>}
          </div>
          <div className={styles.field}>
            <label>Doctor</label>
            <select name="doctor" value={form.doctor} onChange={handleChange}>
              <option value="">Select Doctor</option>
              {doctorsList.map((doc) => (
                <option value={doc} key={doc}>{doc}</option>
              ))}
            </select>
            {errors.doctor && <span className={styles.error}>{errors.doctor}</span>}
          </div>
          <div className={styles.field}>
            <label>Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} />
            {errors.date && <span className={styles.error}>{errors.date}</span>}
          </div>
          <div className={styles.field}>
            <label>Message (Optional)</label>
            <textarea name="message" value={form.message} onChange={handleChange} rows={3} />
          </div>
          <button className={styles.submitBtn} type="submit" disabled={submitting}>
            {submitting ? "Booking..." : "Book Appointment"}
          </button>
          {success && <div className={styles.successMsg}>{success}</div>}
        </form>
      )}
    </div>
  );
};

export default Booking;
