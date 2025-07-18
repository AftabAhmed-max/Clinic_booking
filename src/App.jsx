import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./firebaseAuth";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Admin from "./pages/Admin";
import Login from "./components/auth/login/Login";
import Header from "./components/common/Header";
import ForgotPassword from "./components/auth/login/ForgotPassword";
import Signup from "./components/auth/signup/Signup";
import VerifyEmail from "./components/auth/signup/VerifyEmail";
import CreatePassword from "./components/auth/signup/CreatePassword";
import SignupSuccess from "./components/auth/signup/SignupSuccess";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />  
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/create-password" element={<CreatePassword />} />
        <Route path="/signup-success" element={<SignupSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
