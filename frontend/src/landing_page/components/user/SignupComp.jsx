import { useState } from "react";
import "./user.css";
import {NavLink} from "react-router-dom"
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import MarkEmailReadOutlined from "@mui/icons-material/MarkEmailReadOutlined";

export default function SignupComp({
  data,
  handleInputChange,
  handleSubmit,
  signupLoading,
  signupSuccess,
  onBackToForm,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ── Success card after signup ──────────────────────────────────
  if (signupSuccess) {
    return (
      <div className="container d-flex justify-content-center align-items-center min-vh-100 user">
        <div className="card user-card shadow-sm">
          <div className="card-body p-5 text-center">
            <MarkEmailReadOutlined style={{ fontSize: 56, color: "#0f7bff", marginBottom: 12 }} />
            <h4 className="fw-semibold mb-3">Check your email</h4>
            <p className="text-muted mb-1">
              We've sent a verification link to your email.
            </p>
            <p className="text-muted mb-4" style={{ fontSize: "0.88rem" }}>
              The link expires in <strong>10 minutes</strong>. Please verify to activate your account.
            </p>

            <NavLink to="/login" className="btn btn-primary w-100 user-btn mb-3">
              Go to Login
            </NavLink>

            <button
              type="button"
              className="btn btn-link text-muted btn-sm"
              onClick={onBackToForm}
            >
              Sign up with a different email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center min-vh-100 user">
        <div className="card user-card shadow-sm">
          <div className="card-body p-5">
            <h3 className="fw-semibold mb-3">Create your account</h3>
            <p className="text-muted mb-4">Start investing in minutes.</p>

            <form action="/signup" method="POST" onSubmit={handleSubmit} className="need-validation" noValidate>
              <div className="mb-3">
                <label className="form-label" htmlFor="name">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter full name"
                  name="name"
                  id="name"
                  pattern="^[A-Za-z]+( [A-Za-z]+)*$"
                  title="Only alphabets and single spaces between words are allowed"
                  value={data.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter unique username"
                  name="username"
                  id="username"
                  pattern="^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z][A-Za-z0-9]{3,14}$"
                  title="Username must start with a letter and be 4–15 characters long and contain both letters and numbers"
                  value={data.username}
                  onChange={handleInputChange}
                  required
                />
                <div className="form-text">Username must start with a letter, contain only letters and numbers, and be 4–15 characters long.</div>
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="number">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter number"
                  name="number"
                  id="number"
                  pattern="[1-9][0-9]{9}"
                  value={data.number}
                  onChange={handleInputChange}
                  required
                />
                <div className="invalid-feedback">Enter a valid phone number</div>
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="email">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  name="email"
                  id="email"
                  value={data.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <div className="user-password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control user-password-input"
                    placeholder="Create password"
                    name="password"
                    id="password"
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@_#])[A-Za-z\d@_#]{8,}$"
                    title="Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character (@, _, #)."
                    value={data.password} 
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="user-password-toggle"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </button>
                </div>
                <div className="form-text">Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character (@, _, #).</div>
              </div>

              <div className="mb-4">
                <label className="form-label" htmlFor="cpassword">
                  Confirm Password
                </label>
                <div className="user-password-field">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control user-password-input"
                    placeholder="Confirm password"
                    name="cpassword"
                    id="cpassword"
                    value={data.cpassword}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="user-password-toggle"
                    onClick={() => setShowConfirmPassword((current) => !current)}
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                  </button>
                </div>
              </div>

              <button
                className="btn btn-primary w-100 user-btn"
                disabled={signupLoading}
              >
                {signupLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Creating account...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>

            <p className="text-center mt-4 text-muted">
              Already have an account?
              <NavLink to="/login" className="link">
                {" "}Login
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
