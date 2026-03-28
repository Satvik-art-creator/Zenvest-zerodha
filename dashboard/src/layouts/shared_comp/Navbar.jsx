import {useContext} from "react";
import { AuthContext } from "../../context/AuthContext";
import {NavLink} from "react-router-dom"
import axios from "axios";
import "./styles/navbar.css"

export default function Navbar() {
  const {user, setUser} = useContext(AuthContext);
  const displayName = String(user?.name || user?.username || "User");
  const userInitial = displayName.charAt(0).toUpperCase();

  const logout = async () => {
    try{
      await axios.post("http://localhost:8080/logout", {}, {withCredentials: true});
      setUser(null);
      window.location.replace("http://localhost:5173/login");
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand text-primary fw-medium" href="/">
            <img src="/logo.png" alt="Logo image" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto fw-medium align-items-center">
              <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/" >
                Dashboard
              </NavLink>
              <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/orders">
                Orders
              </NavLink>
              <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/holdings">
                Holdings
              </NavLink>
              <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/positions">
                Positions
              </NavLink>
              <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/funds">
                Funds
              </NavLink>
              
              <div className="separate d-none d-lg-block mx-3"></div>

              <div className="profile d-flex align-items-center my-2 my-lg-0">
                <button className="mx-3 user">{userInitial}</button>
                <button className="btn btn-sm btn-danger" onClick={logout}>LOGOUT</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
