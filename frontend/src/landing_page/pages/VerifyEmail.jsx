import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import ErrorOutline from "@mui/icons-material/ErrorOutline";
import ScheduleOutlined from "@mui/icons-material/ScheduleOutlined";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    loading: true,
    success: false,
    code: "",
    message: "Verifying your email...",
    email: "", // returned by backend for expired tokens
  });

  // Resend state
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // ── Countdown timer for resend cooldown ──────────────────────────
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  // ── Verify token on mount ────────────────────────────────────────
  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setState({
        loading: false,
        success: false,
        code: "TOKEN_MISSING",
        message: "Verification token is missing. Please go to Login and use the resend option.",
        email: "",
      });
      return;
    }

    const verifyToken = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/verify-email", {
          params: { token },
          withCredentials: true,
        });

        setState({
          loading: false,
          success: Boolean(data.success),
          code: data.code || "",
          message: data.message || "Email verification complete.",
          email: data.email || "",
        });

        // ── Auto-redirect to login on success ──────────────────
        if (data.success && (data.code === "VERIFIED" || data.code === "ALREADY_VERIFIED")) {
          toast.success(data.message, { position: "top-center" });
          setTimeout(() => {
            navigate("/login", { replace: true });
          }, 2500);
        }
      } catch (error) {
        const resData = error.response?.data;
        const message = resData?.message || "Verification failed. Link may be invalid or expired.";
        const code = resData?.code || "ERROR";
        const email = resData?.email || "";

        setState({
          loading: false,
          success: false,
          code,
          message,
          email,
        });
      }
    };

    verifyToken();
  }, [searchParams, navigate]);

  // ── Resend verification email (uses the email from backend) ──────
  const handleResend = async () => {
    if (!state.email) return;

    if (resendCooldown > 0) {
      toast.error(`Please wait ${resendCooldown}s before requesting again.`, { position: "bottom-center" });
      return;
    }

    try {
      setResendLoading(true);
      const { data } = await axios.post(
        "http://localhost:8080/resend-verification",
        { identifier: state.email },
        { withCredentials: true },
      );

      if (data.success) {
        toast.success(data.message, { position: "bottom-center" });
        setResendCooldown(60);
        if (data.previewUrl) {
          console.log("Verification email preview URL:", data.previewUrl);
        }
      } else {
        toast.error(data.message, { position: "bottom-center" });
      }
    } catch (error) {
      const resData = error.response?.data;
      if (resData?.code === "RATE_LIMITED") {
        setResendCooldown(resData.retryAfterSeconds || 60);
        toast.error(resData.message, { position: "bottom-center" });
      } else if (resData?.message) {
        toast.error(resData.message, { position: "bottom-center" });
      } else {
        toast.error("Failed to resend. Please try again.", { position: "bottom-center" });
      }
    } finally {
      setResendLoading(false);
    }
  };

  // ── Determine icon ──────────────────────────────────────────────
  const renderIcon = () => {
    if (state.loading) return null;
    if (state.success) {
      return <CheckCircleOutline style={{ fontSize: 56, color: "#28a745" }} />;
    }
    if (state.code === "TOKEN_EXPIRED") {
      return <ScheduleOutlined style={{ fontSize: 56, color: "#ffc107" }} />;
    }
    return <ErrorOutline style={{ fontSize: 56, color: "#dc3545" }} />;
  };

  // Only show resend button when we have the user's email (expired tokens)
  const canResend = !state.loading && !state.success && state.code === "TOKEN_EXPIRED" && state.email;

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-sm" style={{ maxWidth: "520px", width: "100%" }}>
        <div className="card-body p-4 p-md-5 text-center">
          {renderIcon()}
          <h3 className="mb-3 mt-2">Email Verification</h3>

          {state.loading ? (
            <>
              <p className="text-muted">Please wait while we verify your email...</p>
              <div className="spinner-border mt-2" role="status" aria-label="loading" />
            </>
          ) : (
            <>
              <p className={state.success ? "text-success fw-medium" : "text-muted"}>
                {state.message}
              </p>

              {/* ── Success: auto-redirect countdown ──────────── */}
              {state.success && (
                <p className="text-muted mt-2" style={{ fontSize: "0.85rem" }}>
                  Redirecting to login page...
                </p>
              )}

              {/* ── Expired token: one-click resend (no input) ── */}
              {canResend && (
                <div className="mt-4 pt-3 border-top">
                  <p className="text-muted mb-3" style={{ fontSize: "0.9rem" }}>
                    We'll resend the link to <strong>{state.email}</strong>
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={handleResend}
                    disabled={resendLoading || resendCooldown > 0}
                  >
                    {resendLoading
                      ? "Sending..."
                      : resendCooldown > 0
                        ? `Resend in ${resendCooldown}s`
                        : "Resend Verification Email"}
                  </button>
                </div>
              )}

              {/* ── Navigation buttons ─────────────────────────── */}
              {!state.success && (
                <div className="mt-4 d-flex justify-content-center gap-2">
                  <Link to="/login" className="btn btn-primary">
                    Go to Login
                  </Link>
                  <Link to="/signup" className="btn btn-outline-secondary">
                    Back to Signup
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
