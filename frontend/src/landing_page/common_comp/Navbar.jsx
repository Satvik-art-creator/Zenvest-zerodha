import {NavLink} from "react-router-dom"
import "./styles/navbar.css"

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{"margin-bottom": "6rem"}}>
        <div className="container-fluid">
          <a className="navbar-brand text-primary fw-medium" href="/">
            ZENVEST
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
            <div className="navbar-nav ms-auto fw-medium text-center">
              <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/signup" >
                Signup
              </NavLink>
              <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/about">
                About
              </NavLink>
              <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/products">
                Products
              </NavLink>
              <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/pricing">
                Pricing
              </NavLink>
              <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/support">
                Support
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
