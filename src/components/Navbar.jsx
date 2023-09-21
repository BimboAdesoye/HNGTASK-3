import { auth } from "../config/firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container">
        <span className="navbar-brand">galleria.</span>
        <SearchBar />
        <button onClick={logout} className="nav-btn">
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
