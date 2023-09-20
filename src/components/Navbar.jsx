import SearchIcon from "../assets/Search.svg";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container">
        <Link to={"/"} className="navbar-brand">
          galleria.
        </Link>
        <form className="nav-form">
          <input type="text" placeholder="Search for pictures by tag..." />
          <img className="search-icon" src={SearchIcon} alt="search-icon" />
        </form>
        {user ? (
          <button onClick={logout} className="nav-btn">
            Log Out
          </button>
        ) : (
          <Link to={"/LogIn"} className="link">
            <button className="nav-btn">Log In</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
