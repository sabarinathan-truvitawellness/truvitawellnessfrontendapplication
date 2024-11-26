import React, { useState } from "react";
import { DynamicPhoneNumber, Input, Select, Button } from "../../Atom"; // Adjust import paths as necessary
import './registerFamily.scss';

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  relation: string;
}

interface ErrorData {
  fullName: string;
  email: string;
  phoneNumber: string;
  relation: string;
}

export const RegisterFamily: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    relation: ""
  });

  const [error, setError] = useState<ErrorData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    relation: ""
  });

  const changeHandler = (value: string, name: keyof FormData): void => {
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user starts typing
    if (value.trim() !== "") {
      setError({
        ...error,
        [name]: ""
      });
    }
  };

  const handlePhoneValidation = (isValid: boolean, errorText: string): void => {
    setError(prev => ({
      ...prev,
      phoneNumber: isValid ? "" : errorText
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ErrorData> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }
    if (!formData.relation.trim()) {
      newErrors.relation = "Relation is required";
    }

    setError(newErrors as ErrorData);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (): void => {
    if (validateForm()) {
      // Call the API here
      console.log("Form is valid, making API call...");
    } else {
      console.log("Form validation failed.");
    }
  };

  const relation_Data = [
    { label: "Father", value: "father" },
    { label: "Mother", value: "mother" },
    { label: "Husband", value: "husband" },
    { label: "Wife", value: "wife" },
    { label: "Son", value: "son" },
    { label: "Daughter", value: "daughter" },
    { label: "Brother", value: "brother" },
    { label: "Sister", value: "sister" },
    { label: "Grandfather", value: "grandfather" },
    { label: "Grandmother", value: "grandmother" },
    { label: "Uncle", value: "uncle" },
    { label: "Aunt", value: "aunt" }
  ];

  return (
    <div className="register-family-container">
      <div className="register-family-wrapper">
        <h2>Register Family Members</h2>
        <div className="global-input-wrapper">
          <Input
            type="text"
            placeholder="Full Name"
            onChange={(value) => changeHandler(value, "fullName")}
            name="fullName"
            label="Full Name"
            externalClassName="internal-input-fullName"
            helperText={error.fullName || ""}
            required={true}
            variant="outlined"
            error={!!error.fullName}
            value={formData.fullName}
          />
        </div>
        <div className="global-input-wrapper">
          <Input
            type="email"
            placeholder="Email"
            onChange={(value) => changeHandler(value, "email")}
            name="email"
            label="Email"
            externalClassName="internal-input-email"
            helperText={error.email || ""}
            required={true}
            variant="outlined"
            error={!!error.email}
            value={formData.email}
          />
        </div>
        <div className="global-input-wrapper">
          <DynamicPhoneNumber
            value={formData.phoneNumber}
            required={true}
            disabled={false}
            error={!!error.phoneNumber}
            helperText={error.phoneNumber || ""}
            onChange={(value) => changeHandler(value, "phoneNumber")}
            externalClassName="custom-phone-input"
            variant="outlined"
            label="Phone Number"
            name="phoneNumber"
            validatePhone={handlePhoneValidation}
          />
        </div>
        <div className="global-input-wrapper">
          <Select
            label={"Relation"}
            value={formData.relation}
            options={relation_Data}
            onChange={(value) => changeHandler(value, "relation")}
            name={"relation"}
            helperText={error.relation || ""}
            error={!!error.relation}
          />
        </div>
        <Button
          buttonText="Add New Family Member"
          onClick={handleSubmit}
          externalClassName="submit-button"
          type="button"
          disabled={false}
        />
      </div>
    </div>
  );
};
