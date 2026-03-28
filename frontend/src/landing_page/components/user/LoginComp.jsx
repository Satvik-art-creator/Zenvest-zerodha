import { useState } from "react";
import "./user.css";
import {NavLink} from "react-router-dom"
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function LoginComp({
  data,
  handleInputChange,
  handleSubmit,
  pendingIdentifier,
  resendLoading,
  resendCooldown,
  handleResendVerification,
  loginLoading,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center min-vh-100 user">
        <div className="card user-card shadow-sm">
          <div className="card-body p-5">
            <h3 className="fw-semibold mb-3">Login</h3>
            <p className="text-muted mb-4">Start investing in minutes.</p>

            <form action="/login" method="POST" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="identifier">Email or Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your email or username"
                  name="identifier"
                  id="identifier"
                  value={data.identifier}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="password">Password</label>
                <div className="user-password-field">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control user-password-input"
                    placeholder="Enter password"
                    name="password"
                    id="password"
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
              </div>

              <button
                className="btn btn-primary w-100 user-btn"
                disabled={loginLoading}
              >
                {loginLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            {pendingIdentifier ? (
              <div className="mt-3 text-center">
                <p className="mb-2 text-muted" style={{ fontSize: "0.9rem" }}>
                  Your account is not verified yet.
                </p>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  onClick={handleResendVerification}
                  disabled={resendLoading || resendCooldown > 0}
                >
                  {resendLoading
                    ? "Sending..."
                    : resendCooldown > 0
                      ? `Resend in ${resendCooldown}s`
                      : "Resend verification email"}
                </button>
              </div>
            ) : null}

            <p className="text-center mt-4 text-muted">
              Don't have an account?
              <NavLink to="/signup" className="link">
                {" "}SignUp
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
