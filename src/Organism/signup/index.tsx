import React, { useEffect, useState } from "react";
import { Input } from "../../Atom";
import "./signup.scss";
import { Link } from "react-router-dom";
import { REGEX_CONSTANT, Gender_Data } from "../../utils/common/constant";
import {
  Button,
  CheckBox,
  DynamicDateField,
  DynamicPhoneNumber,
  Select,
} from "../../Atom";
import { useSignUpMutation } from "../../redux/services";
import { retry } from "@reduxjs/toolkit/query";
import { notification, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { otpSentSuccess } from "../../redux/slices/otp";
import { useDispatch } from "react-redux";

interface SignUpError {
  data?: {
    error?: string;  // Generic error message, like "This phone number is already used"
    user?: {
      [key: string]: string[];  // Field-based validation errors for the user (e.g., { "email": ["Invalid email format"] })
    };
  };
}



// Define your Signup component
export const Signup = () => {

  const dispatch = useDispatch()
  // Destructure signUp mutation and status from RTK query
  const [signUp, { isLoading, isError }] = useSignUpMutation();

  console.log("tptptptptp", isError);

  const navigate = useNavigate();

  const [isEnteringPassword, setIsEnteringPassword] = useState(false);

  // Define form data state
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    dob: null,
    countryCode: "IN",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    tandc: false,
    privacy_policy: false,
    userName: "",
    roles: [1],
    gender: "",
    zipCode: "",
  });

  console.log("ssssssssssssssssssssssss", formData);
  // Define error state
  const [error, setError] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    dob: "",
    countryCode: "",
    zipCode: "",
    phoneNumber: "",
    userName: "",
    privacy_policy: "",
    gender: "",
    password: {
      length: false,
      letterNumber: false,
      upperLower: false,
      specialChar: false,
    },
    confirmPassword: "",
    tandc: "",
  });
  // const [isFormValid, setIsFormValid] = useState(false);

  const handlePhoneValidation = (isValid: boolean, errorText: string) => {
    setError(prev => ({
        ...prev,
        phoneNumber: isValid ? "" : errorText,
    }));
};

  // Function to format data for API
  const formatDataForAPI = () => ({
    user: {
      username: formData.userName,
      password: formData.password,
      confirm_password: formData.confirmPassword,
      email: formData.email,
      roles: formData.roles,
    },
    first_name: formData.firstName,
    middle_name: formData.middleName,
    last_name: formData.lastName,
    phone_number: `${formData.countryCode}${formData.phoneNumber}`,
    country: formData.countryCode,
    zipcode: formData.zipCode,
    gender: formData.gender,
    date_of_birth: formData.dob ? formData.dob : "",
    accept_terms: formData.tandc,
    privacy_policy: formData.privacy_policy,
  });
  // Validation functions
  const validateFirstName = (value: string) => {
    // const trimmedValue = value.trim();
    // console.log("puou",trimmedValue)
    // setError({
    //   ...error,
    //   firstName:
    //     value === ""
    //       ? "Enter Your Name"
    //       : !value.match(REGEX_CONSTANT.ONLY_CHARACTERS)
    //       ? "Enter Valid Name"
    //       : "",
    // });

    const validation = {
      firstName:
        value === ""
          ? "Enter Your Name"
          : !value.match(REGEX_CONSTANT.ONLY_CHARACTERS)
          ? "Enter Valid Name"
          : "",
    };

    return validation;
  };

  const validateLastName = (value: string) => {
    const trimmedValue = value.trim();
    // setError({
    //   ...error,
    //   lastName:
    //     trimmedValue === ""
    //       ? "Enter Your Last Name"
    //       : !trimmedValue.match(REGEX_CONSTANT.ONLY_CHARACTERS)
    //       ? "Enter Valid Last Name"
    //       : "",
    // });
    const validation = {
      lastName:
        trimmedValue === ""
          ? "Enter Your Last Name"
          : !trimmedValue.match(REGEX_CONSTANT.ONLY_CHARACTERS)
          ? "Enter Valid Last Name"
          : "",
    };
    return validation;
  };

  const validateEmail = (value: string) => {
    const trimmedValue = value.trim();
    return {
      email:
        trimmedValue === ""
          ? "Enter Your Email"
          : !trimmedValue.match(REGEX_CONSTANT.EMAIL)
          ? "Enter Valid Email"
          : "",
    };
  };

  const passwordErrorTextEmpty = "Password cannot be empty.";
  const passwordErrorTextCharCount = "At least 8 valid characters";
  const passwordErrorTextCombination = "A combination of letters and numbers";
  const passwordErrorTextSplChar = "At least one special character: @$!%*#?&";
  const passwordErrorTextUpperLower =
    "Password Must ContainAt least one upper case and one lower case";

  const validatePassword = (value: string) => {
    setIsEnteringPassword(value.length > 0);
    const newErrors = {
      length: value.length < 8,
      letterNumber: !/[A-Za-z]/.test(value) || !/[0-9]/.test(value),
      upperLower: !/[a-z]/.test(value) || !/[A-Z]/.test(value),
      specialChar: !/[@$!%*#?&]/.test(value),
    };

    // Set error state
    setError((prevError) => ({
      ...prevError,
      password: {
        length: newErrors.length,
        letterNumber: newErrors.letterNumber,
        upperLower: newErrors.upperLower,
        specialChar: newErrors.specialChar,
      },
    }));

    // Return errors for further use if needed
    return {
      password: newErrors,
    };
  };

  const getPasswordValidationTexts = () => {
    // console.log("isentering password",isEnteringPassword)
    if (!isEnteringPassword) return null;
    // Check for the validation status of the password
    else {
      const { length, letterNumber, upperLower, specialChar } = error.password;

      return (
        <>
          {length && (
            <span className="input-error">{passwordErrorTextEmpty}</span>
          )}
          <div>
            <p className={`input-error ${!length ? "valid" : ""}`}>
              {passwordErrorTextCharCount}
            </p>
            <p className={`input-error ${!letterNumber ? "valid" : ""}`}>
              {passwordErrorTextCombination}
            </p>
            <p className={`input-error ${!upperLower ? "valid" : ""}`}>
              {passwordErrorTextUpperLower}
            </p>
            <p className={`input-error ${!specialChar ? "valid" : ""}`}>
              {passwordErrorTextSplChar}
            </p>
          </div>
        </>
      );
    }
  };
  const validateConfirmPassword = (value: string) => {
    const trimmedVal = value.trim();
    return {
      confirmPassword:
        trimmedVal === ""
          ? "Re-enter the Password"
          : trimmedVal !== formData.password
          ? "Password Not Matching"
          : "",
    };
  };

  const validatePhone = (value: string) => {
    return {
      phoneNumber: value === "" ? "Enter Your Phone Number" : "",
    };
  };

  const validateUserName = (value: string) => {
    const trimmedVal = value.trim();
    return {
      userName:
        trimmedVal === ""
          ? "Enter User Name"
          : !trimmedVal.match(REGEX_CONSTANT.USER_NAME)
          ? "Enter Valid User Name Only (A-Z or a-z) or combination of characters and numbers"
          : "",
    };
  };

  const validateDateOFBirth = (value: string) => {
    return {
      dob: value === "" ? "Select the Date of Birth" : "",
    };
  };

  const validateGender = (value: string) => {
    return {
      gender: value === "" ? "Select The Gender" : "",
    };
  };

  const validateZipCode = (value: string) => {
    const trimmedVal = value.trim();
    return {
      zipCode:
        trimmedVal === ""
          ? "Enter Zip Code"
          : !trimmedVal.match(REGEX_CONSTANT.ONLY_NUMBER)
          ? "ENter Valid Zip Code"
          : "",
    };
  };

  const validateTandC = (value: boolean) => {
    return {
      tandc: value === false ? "Please Appcept the Termas and conditons" : "",
    };
  };

  const validatePricacyPolicy = (value: boolean) => {
    return {
      privacy_policy: value === false ? "Please Accept the Privacy Policy" : "",
    };
  };

  // Event handler for changing form fields
  const changeHandler = (value: string | boolean, name: string): void => {
    // Call specific validation based on the field name
    let _error = {};
    if (name === "firstName") {
      _error = validateFirstName(value as string);
    } else if (name === "lastName") {
      _error = validateLastName(value as string);
    } else if (name === "email") {
      _error = validateEmail(value as string);
    } else if (name === "phoneNumber") {
      _error = validatePhone(value as string);
    } else if (name === "userName") {
      _error = validateUserName(value as string);
    } else if (name === "dob") {
      _error = validateDateOFBirth(value as string);
    } else if (name === "gender") {
      _error = validateGender(value as string);
    } else if (name === "zipCode") {
      _error = validateZipCode(value as string);
    } else if (name == "tandc") {
      _error = validateTandC(value as boolean);
    } else if (name === "privacy_policy") {
      _error = validatePricacyPolicy(value as boolean);
    } else if (name === "password") {
      _error = validatePassword(value as string);
    } else if (name === "confirmPassword") {
      _error = validateConfirmPassword(value as string);
    }

    setError({ ...error, ..._error });
    // Update formData state
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log("errrrrrrrrrrror", error);

  const isFormValid = () => {
    // Run validations for different fields and gather the errors
    const _error = {
      ...validateFirstName(formData.firstName),
      ...validateLastName(formData.lastName),
      ...validateEmail(formData.email),
      ...validatePhone(formData.phoneNumber),
      ...validateUserName(formData.userName),
      ...validateDateOFBirth(formData.dob || ""),
      ...validatePassword(formData.password),
      ...validateConfirmPassword(formData.confirmPassword),
      ...validateGender(formData.gender),
      ...validateZipCode(formData.zipCode),
      ...validatePricacyPolicy(formData.privacy_policy),
      ...validateTandC(formData.tandc),
    };

    // Update the error state with collected errors
    setError((prevError) => ({
      ...prevError,
      ..._error,
    }));

    // Check if any errors exist
    const hasErrors = Object.values(_error).some((err) =>
      typeof err === "object" ? Object.values(err).some(Boolean) : err !== ""
    );

    // Return true if no errors exist, otherwise false
    return !hasErrors;
  };

  const handleClick = async () => {
    if (!isFormValid()) {
      console.error("Form validation failed. Please fix the errors.");
      notification.error({
        message: "Form Validation Error",
        description: "Please fix the errors before proceeding.",
        placement: "topRight",
      });
      return;
    }
  
    const formattedData = formatDataForAPI();
    try {
      const responseData = await signUp(formattedData).unwrap();
      console.log("response data", responseData);
  
      // Show success notification
      notification.success({
        message: "Signup Successful",
        description: "You have successfully signed up!",
        placement: "topRight",
      });
      navigate('/verify-otp');
      dispatch(otpSentSuccess());
    } catch (error) {
      // Check if the error matches the expected type
      if (isSignUpError(error)) {
        const signUpError: SignUpError = error;
        console.error("Signup error", signUpError);
  
        // Check if the error contains specific details in the response
        if (signUpError.data) {
          let errorMessage = "";
  
          // Safely access and iterate over user errors
          if (signUpError.data.user) {
            for (const [key, messages] of Object.entries(signUpError.data.user)) {
              if (Array.isArray(messages)) {
                messages.forEach((message: string) => {
                  console.log(`${key}: ${message}`);
                  errorMessage = message;
                });
              }
            }
          }
  
          // Fallback to a more general error message if user errors are not present
          const finalErrorMessage = errorMessage || signUpError.data.error || "An unexpected error occurred.";
  
          // Display error notification
          notification.error({
            message: "Sign Up Error",
            description: finalErrorMessage,
            placement: "topRight",
          });
        } else {
          // Display a generic error notification if data is missing
          notification.error({
            message: "Sign Up Error",
            description: "An unexpected error occurred. Please try again.",
            placement: "topRight",
          });
        }
      } else {
        // Handle unknown error type
        console.error("Unknown error type", error);
        notification.error({
          message: "Sign Up Error",
          description: "An unexpected error occurred. Please try again.",
          placement: "topRight",
        });
      }
    }
  };
  

  // Type guard to check if the error is a SignUpError
  function isSignUpError(error: any): error is SignUpError {
    return error && typeof error === "object" && "data" in error;
  }

  return (
    <div className="container">
      {isLoading && (
        <div className="full-page-spinner">
          <Spin size="large" />
        </div>
      )}
      <div className="container-wrapper max-w-[700px] m-auto">
        <div className="title-wrapper text-center">
          <h1 className="mb-[40px] text-xl font-bold">Create your Account</h1>
        </div>
        <div className="form-wrapper">
          <form>
            <div className="internal-register-form-row-1">
              <div className="global-input-wrapper">
                <Input
                  type="text"
                  placeholder="First Name"
                  onChange={changeHandler}
                  name="firstName"
                  label="First Name"
                  externalClassName="internal-input-firstname"
                  helperText={error["firstName"] || ""}
                  required={true}
                  variant="outlined"
                  error={error.firstName === "" ? false : !!error.firstName}
                  value={formData["firstName"] || ""}
                />
              </div>

              <div className="global-input-wrapper">
                <Input
                  type="text"
                  placeholder="Middle Name"
                  onChange={changeHandler}
                  name="middleName"
                  label="Middle Name"
                  externalClassName="internal-input-middlename"
                  helperText={error["middleName"] || ""}
                  required={false}
                  variant="outlined"
                  error={error["middleName"] ? true : false}
                  value={formData["middleName"] || ""}
                />
              </div>

              <div className="global-input-wrapper">
                <Input
                  type="text"
                  placeholder="Last Name"
                  onChange={changeHandler}
                  name="lastName"
                  label="Last Name"
                  externalClassName="internal-input-lastname"
                  helperText={error["lastName"] || ""}
                  required={true}
                  variant="outlined"
                  error={error.lastName === "" ? false : !!error.lastName}
                  value={formData["lastName"] || ""}
                />
              </div>
            </div>
            <div className="internal-register-form-row-2">
              <div className="global-input-wrapper">
                <Input
                  type="text"
                  placeholder="User Name"
                  onChange={changeHandler}
                  name="userName"
                  label="User Name"
                  externalClassName="internal-input-username"
                  helperText={error["userName"] || ""}
                  required={true}
                  variant="outlined"
                  error={error.userName === "" ? false : !!error.userName}
                  value={formData["userName"] || ""}
                />
              </div>
            </div>

            <div className="internal-register-form-row-2">
              <div className="global-input-wrapper">
                <Input
                  type="email"
                  placeholder="Email"
                  onChange={changeHandler}
                  name="email"
                  label="Email"
                  externalClassName="internal-input-email"
                  helperText={error["email"] || ""}
                  required={true}
                  variant="outlined"
                  error={error.email === "" ? false : !!error.email}
                  value={formData["email"] || ""}
                />
              </div>
            </div>

            <div className="internal-register-form-row-2">
              <div className="global-input-wrapper">
                <Input
                  type="text"
                  placeholder="Zip Code"
                  onChange={changeHandler}
                  name="zipCode"
                  label="Zip Code"
                  externalClassName="internal-input-zip-code"
                  helperText={error["zipCode"] || ""}
                  required={true}
                  variant="outlined"
                  error={error.zipCode === "" ? false : !!error.zipCode}
                  value={formData["zipCode"] || ""}
                />
              </div>
            </div>

            <div className="internal-register-form-row-2">
              <div className="global-input-wrapper">
                <Select
                  label={"Gender"}
                  value={formData["gender"] || ""}
                  options={Gender_Data}
                  onChange={changeHandler}
                  name={"gender"}
                  helperText={error.gender || ""}
                  error={error.gender === "" ? false : !!error.gender}
                />
              </div>
            </div>

            <div className="internal-register-form-row-3">
              <div className="global-input-wrapper">
                <DynamicDateField
                  type="date"
                  onChange={changeHandler}
                  name="dob"
                  label="Date of Birth"
                  externalClassName="internal-input-dob"
                  required={true}
                  variant="outlined"
                  error={error.dob === "" ? false : !!error.dob}
                  value={formData["dob"]}
                  isShrunk={true}
                  helperText={error["dob"] || ""}
                />
              </div>
              <div className="global-input-wrapper">
                <DynamicPhoneNumber
                  value={formData["phoneNumber"] || ""}
                  required={true}
                  disabled={false}
                  error={error.phoneNumber === "" ? false : !!error.phoneNumber}
                  helperText={error["phoneNumber"] || ""}
                  onChange={changeHandler}
                  externalClassName="custom-phone-input"
                  variant="outlined"
                  label="Phone Number"
                  name="phoneNumber"
                  validatePhone={handlePhoneValidation} // Pass the validation handler
                />
              </div>
            </div>

            <div className="internal-register-form-row-4 mb-[40px]">
              <div className="global-input-wrapper">
                <Input
                  type="password"
                  placeholder="Password"
                  onChange={changeHandler}
                  name="password"
                  label="Password"
                  externalClassName="internal-input-password"
                  helperText={getPasswordValidationTexts()}
                  required={true}
                  error={Object.values(error["password"]).some(Boolean)}
                  value={formData["password"] || ""}
                />
              </div>

              <div className="global-input-wrapper">
                <Input
                  type="password"
                  placeholder="Re-enter Password"
                  onChange={changeHandler}
                  name="confirmPassword"
                  label="Re-enter Password"
                  externalClassName="internal-input-confirmpassword"
                  helperText={error["confirmPassword"] || ""}
                  required={true}
                  error={
                    error.confirmPassword === ""
                      ? false
                      : !!error.confirmPassword
                  }
                  value={formData["confirmPassword"] || ""}
                />
              </div>
            </div>

            <div className="global-input-wrapper">
              <div className="checkbox-wrapper flex top-0">
                <div className="check-box ">
                  <CheckBox
                    error={error.tandc === "" ? false : !!error.tandc}
                    helperText="You must agree Terms and conditions"
                    checked={formData.tandc}
                    name="tandc"
                    onChange={changeHandler}
                    label={"Terms and Conditions"}
                  />
                </div>
              </div>
            </div>

            <div className="global-input-wrapper">
              <div className="checkbox-wrapper flex top-0">
                <div className="check-box ">
                  <CheckBox
                    error={
                      error.privacy_policy === ""
                        ? false
                        : !!error.privacy_policy
                    }
                    helperText="You must agree to the terms"
                    checked={formData.privacy_policy}
                    name="privacy_policy"
                    onChange={changeHandler}
                    label={"Privacy Policy"}
                  />
                </div>
              </div>
            </div>

            <div className="global-button-wrapper">
              <Button
                buttonText="Sign Up"
                externalClassName="custom-button"
                onClick={handleClick}
                type="button"
              />
            </div>
          </form>
        </div>
        <div className="form-footer-wrapper">
          <p className="text-center footer-content">
            Already have an account?
            <span className="form-footer-span">
              <Link to={"/login"} className="link">
                {" "}
                Login
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};


