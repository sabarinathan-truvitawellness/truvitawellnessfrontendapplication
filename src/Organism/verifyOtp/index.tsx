import React, { useState, useEffect } from "react";
import { Button, OTP } from "../../Atom";
import "./verifyOtp.scss";
import { useVerifyOTPMutation, useResendOTPMutation } from "../../redux/services/otpVerify";
import { notification, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { otpSentSuccess,otpVerificationStarted,updateTimeLeft,resetOtpSate } from "../../redux/slices/otp";

// Typing the Redux state
interface RootState {
  otp: {
    otpSent: boolean;
    timeLeft: number;
  };
}

export const VerifyOtp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { timeLeft, otpSent } = useSelector((state: RootState) => state.otp); // Access Redux state
  const [verifyOtp, veryOtpData] = useVerifyOTPMutation();
  const [resendOtp, resendOtpData] = useResendOTPMutation();

  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Validate OTP format
  const validateOtp = (): boolean => {
    if (otp.length !== 4 || !/^\d{4}$/.test(otp)) {
      setError("OTP must be a 4-digit numeric value.");
      return false;
    }
    setError("");
    return true;
  };

  // Timer logic (runs every second)
  useEffect(() => {
    if (otpSent && timeLeft > 0) {
      const timer = setInterval(() => {
        dispatch(updateTimeLeft(timeLeft - 1)); // Update time left every second
      }, 1000);

      // Clear the interval when the time reaches 0 or on verification
      return () => clearInterval(timer);
    }
  }, [otpSent, timeLeft, dispatch]);

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    if (!validateOtp()) {
      return;
    }
  
    try {
      const response = await verifyOtp({ otp });
  
      if (response.data) {
        // Handle successful OTP verification
        notification.success({
          message: "Verification Successful",
          description: response.data.message || "OTP successfully verified.",
        });
        navigate('/login');
      } else if (response.error) {
        let errorMessage = "";
  
        // Check for specific error details
        if ('data' in response.error && typeof response.error.data === 'object') {
          errorMessage = (response.error.data as { error?: string }).error || "An unexpected error occurred.";
        } else if ('message' in response.error) {
          errorMessage = response.error.message || "An unexpected error occurred.";
        }
  
        notification.error({
          message: "Verification Failed",
          description: errorMessage,
        });
      }
    } catch (error: unknown) {
      // TypeScript will now allow you to safely check the error
      if (error instanceof Error) {
        // Safely access message if the error is an instance of Error
        notification.error({
          message: "Verification Failed",
          description: error.message || "There was an issue verifying your OTP. Please try again.",
        });
      } else {
        notification.error({
          message: "Verification Failed",
          description: "There was an issue verifying your OTP. Please try again.",
        });
      }
      console.error("Error verifying OTP:", error);
    }
  };
  

  // Handle Resend OTP
  const handleResendOtp = async (): Promise<void> => {
    try {
      // Pass an empty object or the appropriate payload
     const response = await resendOtp({});  // Fix by passing an empty object
  console.log("response",response);
  if(response.error){
    notification.info({
      message: "Already OTP was verified",
      description: "Your OTP was Verified Just Login",
    });
  }
  else{
    notification.info({
      message: "OTP Resent",
      description: "A new OTP has been sent to your email.",
    });
    // Once the OTP is successfully resent, dispatch the action to start the timer
    dispatch(otpSentSuccess());
  }
      
  
     
    } catch (error) {
      notification.error({
        message: "Resend Failed",
        description: "An error occurred while resending OTP. Please try again later.",
      });
      console.error("Error resending OTP:", error);
    }
  };
  
  

  return (
    <Spin spinning={veryOtpData.isLoading || resendOtpData.isLoading}>
      <div className="otp-container">
        <div className="otp-container-wrapper">
          <div className="content-wrapper">
            <h1>Verify OTP</h1>
            <p>Please enter the 4-digit code sent to your email to verify your account.</p>
            {otpSent && timeLeft > 0 && (
              <p className="timer-text">Time Left: {timeLeft}s</p>
            )}
          </div>
          <div className="input-wrapper">
            <OTP
              separator={<span> </span>}
              value={otp}
              onChange={(value) => {
                setOtp(value);
                if (error) setError(""); // Clear error as user types
              }}
              length={4}
              helperText={error}
            />
          </div>
          <div className="btn-wrapper">
            <Button
              buttonText="Verify OTP"
              externalClassName="btn-otp-verify"
              onClick={handleVerifyOtp}
              disabled={veryOtpData.isLoading && timeLeft <= 0}
            />
            <Button
              buttonText="Resend OTP"
              externalClassName="btn-resend-otp"
              onClick={handleResendOtp}
              disabled={veryOtpData.isLoading || timeLeft > 0}
            />
          </div>
        </div>
      </div>
    </Spin>
  );
};
