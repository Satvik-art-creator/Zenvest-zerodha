import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import LoginComp from "../components/user/LoginComp";

export default function Login() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initalState = {
    identifier: "",
    password: "",
  };
  const [inputHandle, setInputHandle] = useState(initalState);
  const [pendingIdentifier, setPendingIdentifier] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // ── Show toast when redirected from AuthGuard / dashboard ───────
  useEffect(() => {
    const session = searchParams.get("session");
    if (session === "expired") {
      toast.warning("Session expired. Please login again.", { position: "top-center" });
      searchParams.delete("session");
      setSearchParams(searchParams, { replace: true });
    } else if (session === "required") {
      toast.info("Please login to continue.", { position: "top-center" });
      searchParams.delete("session");
      setSearchParams(searchParams, { replace: true });
    }
  }, []);

  // ── Countdown timer for resend cooldown ──────────────────────────
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputHandle((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleError = (err) =>
    toast.error(err, { position: "bottom-left" });
  const handleSuccess = (msg) =>
    toast.success(msg, { position: "bottom-left" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputHandle.identifier || !inputHandle.password) {
      return handleError("Please fill in all fields.");
    }

    try {
      setLoginLoading(true);
      const { data } = await axios.post(
        "http://localhost:8080/login",
        { ...inputHandle },
        { withCredentials: true },
      );

      const { success, message } = data;
      if (success) {
        setPendingIdentifier("");
        handleSuccess(message);
        setTimeout(() => {
          window.location.replace("http://localhost:5174");
        }, 500);
      } else {
        handleError(message || "Login failed.");
      }
    } catch (error) {
      // Axios throws on non-2xx — read the response data
      const resData = error.response?.data;

      if (resData?.code === "EMAIL_NOT_VERIFIED") {
        setPendingIdentifier(inputHandle.identifier);
        handleError(resData.message);
      } else if (resData?.message) {
        handleError(resData.message);
      } else {
        handleError("Network error. Please check your connection and try again.");
      }
    } finally {
      setLoginLoading(false);
      setInputHandle(initalState);
    }
  };

  const handleResendVerification = async () => {
    if (!pendingIdentifier) {
      handleError("Enter your email or username first.");
      return;
    }

    if (resendCooldown > 0) {
      handleError(`Please wait ${resendCooldown}s before requesting again.`);
      return;
    }

    try {
      setResendLoading(true);
      const { data } = await axios.post(
        "http://localhost:8080/resend-verification",
        { identifier: pendingIdentifier },
        { withCredentials: true },
      );

      if (data.success) {
        handleSuccess(data.message);
        setResendCooldown(60);
        if (data.previewUrl) {
          console.log("Verification email preview URL:", data.previewUrl);
        }
      } else {
        handleError(data.message);
      }
    } catch (error) {
      const resData = error.response?.data;

      if (resData?.code === "RATE_LIMITED") {
        setResendCooldown(resData.retryAfterSeconds || 60);
        handleError(resData.message);
      } else if (resData?.message) {
        handleError(resData.message);
      } else {
        handleError("Could not resend verification email. Please try again.");
      }
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <>
        <LoginComp
          data={inputHandle}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          pendingIdentifier={pendingIdentifier}
          resendLoading={resendLoading}
          resendCooldown={resendCooldown}
          handleResendVerification={handleResendVerification}
          loginLoading={loginLoading}
        />
      <ToastContainer/>
    </>
  );
}
