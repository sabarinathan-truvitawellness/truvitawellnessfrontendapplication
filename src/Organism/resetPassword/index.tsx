import React, { useState } from "react";
import { Button, Input } from "../../Atom";
import { notification } from "antd";
import { useNewPasswordMutation } from "../../redux/services";
import { useParams } from "react-router-dom"; // Import useParams
import './resetPassword.scss';

export const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>(); // Capture the token parameter from the URL

  const [formData, setFormData] = useState({
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState({
    password: "",
    confirm_password: "",
  });

  const [newPassword, { isLoading }] = useNewPasswordMutation();

  // Individual validators
  const validatePassword = (password: string): string => {
    if (password.trim() === "") {
      return "Password cannot be empty";
    }
    return ""; // No error
  };

  const validateConfirmPassword = (password: string, confirmPassword: string): string => {
    if (confirmPassword.trim() === "") {
      return "Please confirm your password";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
    return ""; // No error
  };

  const changeHandler = (value: string, name: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Use individual validators for real-time error handling
    if (name === "password") {
      const passwordError = validatePassword(value);
      setError((prevError) => ({
        ...prevError,
        password: passwordError,
      }));
    }

    if (name === "confirm_password") {
      const confirmPasswordError = validateConfirmPassword(formData.password, value);
      setError((prevError) => ({
        ...prevError,
        confirm_password: confirmPasswordError,
      }));
    }
  };

  const validateForm = (): boolean => {
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirm_password);

    setError({
      password: passwordError,
      confirm_password: confirmPasswordError,
    });

    return !passwordError && !confirmPasswordError;
  };

  const resetConfirmPassHandler = async () => {
    if (!validateForm()) {
      notification.error({
        message: "Validation Error",
        description: "Please fix the errors before submitting.",
        placement: "topRight",
      });
      return;
    }

    try {
      const response = await newPassword({
        token, // Send the token parameter as part of the payload
        password: formData.password,
        confirm_password: formData.confirm_password,
      }).unwrap();

      notification.success({
        message: "Password Reset Successful",
        description: "Your password has been updated.",
        placement: "topRight",
      });
      setFormData({ password: "", confirm_password: "" }); // Clear form on success
    } catch (error) {
      notification.error({
        message: "Password Reset Failed",
        description: "An error occurred while resetting your password. Please try again.",
        placement: "topRight",
      });
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-wrapper">
        <div className="rp-title-section">
          <h1>Reset Password</h1>
          <p>Enter your new password and confirm it to reset your password</p>
        </div>
        <div className="rp-input-section">
          <div className="global-input-wrapper">
            <Input
              type="password"
              placeholder="Enter new password"
              onChange={changeHandler}
              name="password"
              label="New Password"
              externalClassName="internal-input-reset-password"
              helperText={error.password}
              required
              variant="outlined"
              error={!!error.password}
              value={formData.password}
            />
          </div>
          <div className="global-input-wrapper">
            <Input
              type="password"
              placeholder="Confirm new password"
              onChange={changeHandler}
              name="confirm_password"
              label="Confirm New Password"
              externalClassName="internal-input-reset-password"
              helperText={error.confirm_password}
              required
              variant="outlined"
              error={!!error.confirm_password}
              value={formData.confirm_password}
            />
          </div>
        </div>
        <div className="re-btn-section">
          <Button
            buttonText={isLoading ? "Submitting..." : "Submit"}
            onClick={resetConfirmPassHandler}
            type="button"
            externalClassName="reset-pass-btn"
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
