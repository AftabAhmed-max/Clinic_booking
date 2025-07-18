import styles from "./Home.module.css";
import { FaUserMd, FaHeartbeat, FaStethoscope, FaPhoneAlt, FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import useIsDesktop from "../components/common/Useisdesktop"



// Dummy carousel images
const carouselImages = [
  { url: "/carousel1.png", alt: "Clinic exterior" },
  { url: "/carousel2.png", alt: "Modern facilities" },
  { url: "/carousel3.png", alt: "Expert doctors" }
];

// Dummy services data
const services = [
  { title: "General Consultation", desc: "Comprehensive check-ups and medical advice.", icon: <FaStethoscope /> },
  { title: "Cardiology", desc: "Heart health care by specialists.", icon: <FaHeartbeat /> },
  { title: "Pediatrics", desc: "Special care for children and infants.", icon: <FaUserMd /> },
  { title: "Diagnostics", desc: "Modern lab tests and imaging.", icon: <FaStethoscope /> },
  { title: "Physiotherapy", desc: "Rehabilitation and pain management.", icon: <FaHeartbeat /> },
  { title: "Dermatology", desc: "Skin, hair, and nail treatments.", icon: <FaUserMd /> },
  { title: "Vaccinations", desc: "All age group immunizations.", icon: <FaStethoscope /> },
  { title: "Emergency Care", desc: "Immediate attention for emergencies.", icon: <FaHeartbeat /> },
  { title: "ENT", desc: "Ear, Nose, Throat treatments.", icon: <FaUserMd /> },
  { title: "Diabetology", desc: "Diabetes management & education.", icon: <FaStethoscope /> }
];

// Dummy doctors data
const doctors = [
  { name: "Dr. Aisha Singh", title: "Cardiologist", exp: "15 yrs", photo: "/doc1.png", spec: "Heart Specialist", achievement: "Gold Medalist, AIIMS" },
  { name: "Dr. Rahul Mehra", title: "General Physician", exp: "10 yrs", photo: "/doc2.png", spec: "Family Medicine", achievement: "Best GP, Mumbai 2023" },
  { name: "Dr. Sara Sheikh", title: "Pediatrician", exp: "12 yrs", photo: "/doc3.png", spec: "Child Health", achievement: "Top Pediatrician, Times Health" }
];

// Dummy testimonials
const testimonials = [
  { name: "Priya Desai", text: "Fantastic care! Booking was easy and the doctor was wonderful.", rating: 5 },
  { name: "Mohd. Imran", text: "Clinic is clean, modern, and staff are very polite.", rating: 4 },
  { name: "Jessica Lopes", text: "Highly recommend for kids—our pediatrician is the best!", rating: 5 }
];

export default function Home() {
  const [showAll, setShowAll] = useState(false);
  const [serviceLimit] = useState(8);
  const [doctorIdx, setDoctorIdx] = useState(0);
  const [testiIdx, setTestiIdx] = useState(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const testiInterval = setInterval(() => {
      setTestiIdx(prev => (prev + 1) % testimonials.length);
    }, 3500); // 3.5 seconds per testimonial
    return () => clearInterval(testiInterval);
  }, []);

  const isDesktop = useIsDesktop();

  // Carousel next/prev logic (simple manual for now)
  const nextDoctor = () => setDoctorIdx((doctorIdx + 1) % doctors.length);
  const prevDoctor = () => setDoctorIdx((doctorIdx - 1 + doctors.length) % doctors.length);
  const nextTesti = () => setTestiIdx((testiIdx + 1) % testimonials.length);
  const prevTesti = () => setTestiIdx((testiIdx - 1 + testimonials.length) % testimonials.length);

  return (
    <div className={styles.home}>

      {/* Emergency Banner */}
      <div className={styles.banner}>
        <FaPhoneAlt /> Emergency? Call <a href="tel:1234567890">12345 67890</a>
      </div>

      {/* Hero Carousel */}
      <section className={styles.hero}>
        <div className={styles.carouselWrapper}>
          <img
            src={carouselImages[current].url}
            alt={carouselImages[current].alt}
            className={styles.carouselImg}
          />
        </div>
        <div className={styles.heroText}>
          <h1>Your Health, Our Priority</h1>
          <p>Book appointments, consult expert doctors, and access quality care—all in one place.</p>
          <a className={styles.ctaBtn} href="/booking">Book Appointment</a>
        </div>
      </section>

      {/* About & Achievements */}
      <section className={styles.about}>
              <h2>About Us</h2>
              <p>
                SomDoctor is dedicated to delivering high-quality, affordable healthcare to everyone.
              </p>
              <div className={styles.achievements}>
                <div><strong>5000+</strong><span>Patients Treated</span></div>
                <div><strong>10+</strong><span>Years Experience</span></div>
                <div><strong>15</strong><span>Expert Doctors</span></div>
                <div><strong>4.8/5</strong><span>Average Rating</span></div>
              </div>
            </section>

            {/* Services */}
            <section className={styles.services}>
              <h2>Our Services</h2>
              <div className={styles.servicesGrid}>
                {(showAll ? services : services.slice(0, serviceLimit)).map((srv, i) => (
                  <div className={styles.serviceCard} key={i}>
                    <span className={styles.serviceIcon}>{srv.icon}</span>
                    <div className={styles.serviceContent}>
                      <div className={styles.serviceTitle}>{srv.title}</div>
                      <div className={styles.serviceDesc}>{srv.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              {!showAll && services.length > serviceLimit && (
                <button className={styles.seeMore} onClick={() => setShowAll(true)}>See More</button>
              )}
            </section>

            {/* Doctors Carousel */}
            <section className={styles.doctors}>
        <h2>Our Doctors</h2>
        <div className={styles.doctorCarousel}>
          {!isDesktop && (
            <button className={styles.arrowBtn} onClick={prevDoctor}>&lt;</button>
          )}

          {isDesktop ? (
            // Show all doctors in desktop
            doctors.map((doc, idx) => (
              <div className={styles.doctorCard} key={idx}>
                <img src={doc.photo} alt={doc.name} className={styles.doctorPhoto} />
                <div className={styles.doctorName}>{doc.name}</div>
                <div className={styles.doctorTitle}>{doc.title} • {doc.exp}</div>
                <div className={styles.doctorSpec}>{doc.spec}</div>
                <div className={styles.doctorAchv}>{doc.achievement}</div>
              </div>
            ))
          ) : (
            // Carousel for mobile/tablet
            <div className={styles.doctorCard}>
              <img src={doctors[doctorIdx].photo} alt={doctors[doctorIdx].name} className={styles.doctorPhoto} />
              <div className={styles.doctorName}>{doctors[doctorIdx].name}</div>
              <div className={styles.doctorTitle}>{doctors[doctorIdx].title} • {doctors[doctorIdx].exp}</div>
              <div className={styles.doctorSpec}>{doctors[doctorIdx].spec}</div>
              <div className={styles.doctorAchv}>{doctors[doctorIdx].achievement}</div>
            </div>
          )}

          {!isDesktop && (
            <button className={styles.arrowBtn} onClick={nextDoctor}>&gt;</button>
          )}
        </div>
      </section>


      {/* Testimonials Carousel */}
      <section className={styles.testimonials}>
        <h2>Testimonials</h2>
        <div className={styles.testiCarousel}>
          <div className={styles.testiCard}>
            <div className={styles.testiText}>"{testimonials[testiIdx].text}"</div>
            <div className={styles.testiUser}>
              <FaUserMd className={styles.testiUserIcon} /> {testimonials[testiIdx].name}
              <span className={styles.testiRating}>
                {[...Array(testimonials[testiIdx].rating)].map((_,i) => <FaStar key={i} />)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div>
          <strong>Contact Us:</strong>
          <div>Phone: <a href="tel:1234567890">12345 67890</a></div>
          <div>Email: <a href="mailto:info@somdoctor.com">info@somdoctor.com</a></div>
        </div>
        <form className={styles.feedbackForm}>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Your Feedback" required />
          <button type="submit">Send Feedback</button>
        </form>
        <div className={styles.quickLinks}>
          <a href="/">Home</a>
          <a href="/booking">Book Appointment</a>
          <a href="/login">Login</a>
        </div>
      </footer>
    </div>
  );
}
