import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import {
  // createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  // signOut,
} from "firebase/auth";
import { auth } from "../config/firebase-config";

const LogIn = () => {
  // const [registerEmail, setRegisterEmail] = useState("");
  // const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setLoginEmail(email);

    // Validate email format
    if (!isValidEmail(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setLoginPassword(password);

    // Validate password (e.g., minimum length)
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
  };

  // const register = async () => {
  //   try {
  //     const user = await createUserWithEmailAndPassword(
  //       auth,
  //       registerEmail,
  //       registerPassword
  //     );
  //     console.log(user);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      alert(`You're logged in`);
      navigate("/");
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  // const logout = async () => {
  //   await signOut(auth);
  // };

  return (
    <div>
      <Navbar user={user} />
      <div className="log-in">
        <div className="log-in-content">
          <h1>Welcome</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={loginEmail}
                onChange={handleEmailChange}
              />
              {emailError && <p className="error-message">{emailError}</p>}
            </div>
            <div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={loginPassword}
                onChange={handlePasswordChange}
              />
              {passwordError && (
                <p className="error-message">{passwordError}</p>
              )}
            </div>
            <button
              type="submit"
              className="login-btn"
              disabled={emailError || passwordError}
            >
              Login
            </button>
          </form>
          {/* <div>
            <h3>Register User</h3>
            <input
              placeholder="Email..."
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <input
              placeholder="Password..."
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <button onClick={register}>Create User</button>
          </div> */}
          <h4>User Logged In:</h4>
          {user?.email}
          {/* <button onClick={logout}>Sign Out</button> */}
        </div>
      </div>
    </div>
  );
};

export default LogIn;
