import React, { useEffect, useState } from "react";
import "./editPersonalData.scss";
import { Link } from "react-router-dom";
import {
  REGEX_CONSTANT,
  Gender_Data,
  Blood_Group_Data,
} from "../../utils/common/constant";
import {
  Input,
  UploadInput,
  Button,
  CheckBox,
  DynamicDateField,
  DynamicPhoneNumber,
  Select,
} from "../../Atom";
import {
  useEditProfileMutation,
  useProfileDataQuery,
  useUploadFileMutation
} from "../../redux/services";
import { notification, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { setUserData } from "../../redux/slices/auth";
import { useField } from "@mui/x-date-pickers/internals";

interface SignUpError {
  data?: {
    error?: string; // Generic error message, like "This phone number is already used"
    user?: {
      [key: string]: string[]; // Field-based validation errors for the user (e.g., { "email": ["Invalid email format"] })
    };
  };
}

// Define your Signup component
export const EditPersonalData = () => {
  const dispatch = useDispatch();
  // Destructure editOption mutation and status from RTK query
  const { user, userData } = useSelector((state: RootState) => state.auth);
  const [editProfile, { isError, isLoading }] = useEditProfileMutation();
  const [uploadFiles] = useUploadFileMutation();

  console.log("userdata", userData);

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  //getting the data from, rtk query
  const { data } = useProfileDataQuery({ userId: userId });


  // Define form data state
  const [formData, setFormData] = useState({
    firstName: userData.first_name,
    middleName: "",
    lastName: userData.last_name,
    email: userData.email,
    dob: userData.date_of_birth,
    countryCode: userData.country,
    phoneNumber: userData.phone_number,
    userName: userData.username,
    roles: [1],
    gender: userData.gender,
    zipCode: userData.zipcode,
    bloodGroup: userData.blood_group,
    profilePictureUrl:userData.profile_picture_url
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
    gender: "",
    bloodGroup: "",
  });
  // const [isFormValid, setIsFormValid] = useState(false);

  const handlePhoneValidation = (isValid: boolean, errorText: string) => {
    setError((prev) => ({
      ...prev,
      phoneNumber: isValid ? "" : errorText,
    }));
  };

  // Function to format data for API
  const formatDataForAPI = () => ({
    // user: {
    //   username: formData.userName,
    //   email: formData.email,
    //   roles: formData.roles,
    // },
    username: formData.userName,
    email: formData.email,
    roles: formData.roles,
    first_name: formData.firstName,
    middle_name: formData.middleName,
    last_name: formData.lastName,
    phone_number: `${formData.countryCode}${formData.phoneNumber}`,
    country: formData.countryCode,
    zipcode: formData.zipCode,
    gender: formData.gender,
    date_of_birth: formData.dob ? formData.dob : "",
    blood_group:formData.bloodGroup
  });
  // Validation functions
  const validateFirstName = (value: string) => {
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

  const validateBloodGroup = (value: string) => {
    const trimmedVal = value.trim();
    return {
      bloodGroup: trimmedVal === "" ? "Select Blood Group" : "",
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
    } else if (name === "bloodGroup") {
      _error = validateBloodGroup(value as string);
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
      ...validateGender(formData.gender),
      ...validateZipCode(formData.zipCode),
      ...validateBloodGroup(formData.bloodGroup),
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

  const uploadImageHandler = async (fileList: any[], name: string) => {
    console.log("File List:", fileList, "Field Name:", name);
  
    // Check if fileList is valid and has at least one file
    if (!fileList || fileList.length === 0 || !fileList[0]?.originFileObj) {
      notification.error({
        message: "Upload Error",
        description: "No valid file selected. Please try again.",
        placement: "topRight",
      });
      return;
    }
  
    try {
      // Access the first file from the fileList
      const file = fileList[0].originFileObj;
  
      // Call the uploadFiles mutation
      const response = await uploadFiles({
        file: file,
        role: "patient",
      }).unwrap();
  
      // Update form data if the upload was successful
      setFormData({
        ...formData,
        profilePictureUrl: file
          ? `https://truvitacare.com${response?.data?.file_url || ""}`
          : "",
      });
  
      console.log("File Upload Response:", response);
  
      notification.success({
        message: "Image Uploaded Successfully",
        description: "You have successfully uploaded the image!",
        placement: "topRight",
      });
    } catch (err) {
      console.error("Upload Error:", err);
  
      notification.error({
        message: "Oops! Image Upload Failed",
        description: "Failed to upload the image. Please try again.",
        placement: "topRight",
      });
    }
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
      const responseData = await editProfile({
        updatedData: formattedData,
        userId: localStorage.getItem("userId"),
      }).unwrap();
      console.log("response data", responseData);

      // Show success notification
      notification.success({
        message: "Info Updated Successful",
        description: "You have successfully Updated!",
        placement: "topRight",
      });

      if (data) {
        console.log("Profile Data:", data);
        dispatch(setUserData({ userData: data }));
      }

      navigate("/dashboard");
      // window.location.reload();
    } catch (error) {
      // Check if the error matches the expected type
      if (isSignUpError(error)) {
        const signUpError: SignUpError = error;
        console.error("Profiel Updated error", signUpError);

        // Check if the error contains specific details in the response
        if (signUpError.data) {
          let errorMessage = "";

          // Safely access and iterate over user errors
          if (signUpError.data.user) {
            for (const [key, messages] of Object.entries(
              signUpError.data.user
            )) {
              if (Array.isArray(messages)) {
                messages.forEach((message: string) => {
                  console.log(`${key}: ${message}`);
                  errorMessage = message;
                });
              }
            }
          }

          // Fallback to a more general error message if user errors are not present
          const finalErrorMessage =
            errorMessage ||
            signUpError.data.error ||
            "An unexpected error occurred.";

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
          <h1 className="mb-[40px] text-xl font-bold">
            Edit your Personal Information
          </h1>
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
                  disabled={true}
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
                  disabled={true}
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
                  disabled={true}
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
            <div className="internal-register-form-row-4">
              <div className="global-input-wrapper">
                <Select
                  label={"Blood Group"}
                  value={formData["bloodGroup"] || ""}
                  options={Blood_Group_Data}
                  onChange={changeHandler}
                  name={"bloodGroup"}
                  helperText={error.bloodGroup || ""}
                  error={error.bloodGroup === "" ? false : !!error.bloodGroup}
                />
              </div>
            </div>

            <div className="internal-register-form-row-4">
              <div className="global-input-wrapper">
                <UploadInput
                  name="profilePictureUrl"
                  label="Upload Image"
                  helperText="Please upload a valid document"
                  onChange={uploadImageHandler}
                  accept=".jpg,.png"
                />
              </div>
            </div>

            <div className="global-button-wrapper">
              <Button
                buttonText="Edit"
                externalClassName="custom-button"
                onClick={handleClick}
                type="button"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
