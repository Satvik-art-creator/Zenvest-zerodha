import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <div className="notfound-glitch" data-text="404">404</div>
        <h2 className="notfound-title">Page Not Found</h2>
        <p className="notfound-desc">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="notfound-actions">
          <Link to="/" className="notfound-btn notfound-btn-primary">
            Go Home
          </Link>
          <Link to="/login" className="notfound-btn notfound-btn-outline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
