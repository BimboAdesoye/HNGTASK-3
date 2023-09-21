import { useNavigate } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";
import WelcomeNav from "./WelcomeNav";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase-config";
import { useState, useEffect } from "react";

const LogIn = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const login = async () => {
    try {
      setLoading(true);
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      setLoading(false);
      alert("You're logged in successfully");
      navigate("/Home");
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const validateForm = () => {
    const errors = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isFormatValid = emailPattern.test(loginEmail);

    if (!loginEmail) {
      errors.email = "Email is required!";
    } else if (!isFormatValid) {
      errors.email = "Enter valid email!";
    }

    if (!loginPassword) {
      errors.password = "Password is required!";
    } else if (loginPassword.length < 5) {
      errors.password = "Password length must be greater than 5!";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form is valid");
      setErrors({});
      login();
    } else {
      setErrors(validationErrors);
    }
  };
  return (
    <div>
      <WelcomeNav />
      <div className="log-in d-flex align-items-center justify-center">
        <div className="log-in-content">
          <h1>Welcome</h1>
          <p className="fw-bold text-center get-started">
            Login to Get Started
          </p>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="login-btn"
              
            >
              {loading && <SpinnerCircular size={30} />}
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
