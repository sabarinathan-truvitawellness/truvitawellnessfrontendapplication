import React, { useState } from "react";
import { Input, Button } from "../../Atom";
import { notification} from "antd";
import { Link } from "react-router-dom";
import './forgotPassword.scss';
import { useResetPasswordMutation } from "../../redux/services";// Import your mutation hook

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [resetPassword, { isLoading }] = useResetPasswordMutation(); // Hook for mutation

  const validateEmail = (value: string): boolean => {
    const trimmedVal = value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (trimmedVal === "") {
      setEmailError("Email is required.");
      return false;
    } else if (!emailRegex.test(trimmedVal)) {
      setEmailError("Enter a valid email address.");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const changeHandler = (value: string) => {
    setEmail(value);
    validateEmail(value);
  };

  const resetPasswordHandler = async () => {
    if (!validateEmail(email)) {
      notification.error({
        message: "Validation Error",
        description: "Please enter a valid email address.",
        placement: "topRight",
      });
      return;
    }

    try {
      await resetPassword({ email }).unwrap();
      notification.success({
        message: "Reset Link Sent",
        description: "A password reset link has been sent to your email.",
        placement: "topRight",
      });
      setEmail(""); // Clear the input on success
    } catch (error: any) {
      const errorMessage =
        error?.data?.error || "An error occurred while sending the reset link. Please try again.";
      notification.error({
        message: "Reset Password Failed",
        description: errorMessage,
        placement: "topRight",
      });
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-wrapper">
        <div className="rp-title-section">
          <h1>Forgot your password?</h1>
          <p>Enter your email address and we’ll send you a link to reset your password</p>
        </div>
        <div className="rp-input-section">
          <div className="global-input-wrapper">
            <Input
              type="text"
              placeholder="Enter your email"
              onChange={changeHandler}
              name="email"
              label="Email"
              externalClassName="internal-input-reset-password"
              helperText={emailError}
              required
              variant="outlined"
              error={!!emailError}
              value={email}
            />
          </div>
        </div>
        <div className="re-btn-section">
          <Button
            buttonText={isLoading ? "Submitting..." : "Submit"}
            onClick={resetPasswordHandler}
            type="button"
            externalClassName="reset-pass-btn"
            disabled={isLoading}
          />
        </div>
        <div className="re-login-redirect-btn">
          <Link to="/login">Back to Login</Link>
        </div>
        <div className="re-signup-redirect-btn">
          <p>
            Don't have an account? <Link to="/signUp">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
