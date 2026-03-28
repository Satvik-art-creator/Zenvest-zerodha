import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import SignupComp from "../components/user/SignupComp";
import { API_BASE_URL } from "../../config/env";

export default function Signup() {
  const initailState = {
    name: "",
    username: "",
    number: "",
    email: "",
    password: "",
    cpassword: "",
  };
  const [inputHandle, setInputHandle] = useState(initailState);
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputHandle((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleError = (err) =>
    toast.error(err, { position: "bottom-left" });
  const handleSuccess = (msg) =>
    toast.success(msg, { position: "bottom-right" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ── Client-side validations ────────────────────────────────────
    if (!inputHandle.name || !inputHandle.username || !inputHandle.number ||
        !inputHandle.email || !inputHandle.password || !inputHandle.cpassword) {
      return handleError("All fields are required.");
    }

    if (inputHandle.password !== inputHandle.cpassword) {
      return handleError("Passwords do not match!");
    }

    const { cpassword, ...dataToSend } = inputHandle;

    try {
      setSignupLoading(true);
      const { data } = await axios.post(
        `${API_BASE_URL}/signup`,
        dataToSend,
        { withCredentials: true },
      );

      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setSignupSuccess(true);
        if (data.previewUrl) {
          console.log("Verification email preview URL:", data.previewUrl);
        }
      } else {
        handleError(message || "Signup failed.");
      }
    } catch (error) {
      const resData = error.response?.data;
      if (resData?.message) {
        handleError(resData.message);
      } else {
        handleError("Network error. Please check your connection and try again.");
      }
    } finally {
      setSignupLoading(false);
    }
  };

  const handleBackToForm = () => {
    setSignupSuccess(false);
    setInputHandle(initailState);
  };

  return (
    <>
      <SignupComp
        data={inputHandle}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        signupLoading={signupLoading}
        signupSuccess={signupSuccess}
        onBackToForm={handleBackToForm}
      />
      <ToastContainer/>
    </>
  );
}
