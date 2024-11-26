import React, { useState, useEffect } from "react";
import { FormControl, FormHelperText } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import parsePhoneNumber from 'libphonenumber-js';
import './dynamicPhoneNumber.scss';

interface InputProps {
    externalClassName?: string;
    required?: boolean;
    value?: string;
    defaultCountry?: any;
    disabled?: boolean;
    error?: boolean;
    helperText?: string;
    variant?: "outlined" | "filled" | "standard";
    onChange?: (value: string, name: string) => void;
    validatePhone?: (isValid: boolean, errorText: string) => void; // Callback to send validation result to parent
    label?: string;
    name?: string;
}

export const DynamicPhoneNumber: React.FC<InputProps> = ({
    externalClassName = "",
    required = false,
    value = "",
    defaultCountry = "US",
    disabled = false,
    error = false,
    helperText = "",
    variant = "outlined",
    onChange = () => {},
    validatePhone = () => {}, // Default is empty function if not provided
    label = "",
    name = "phoneNumber",
}) => {
    const [isValidPhone, setIsValidPhone] = useState(true);
    const [errorText, setErrorText] = useState("");

    // Validate on initial render or whenever the value changes
    useEffect(() => {
        if (value) {
            const isValid = validatePhoneNumber(value, defaultCountry);
            setIsValidPhone(isValid);
            const initialErrorMessage = isValid ? "" : "Invalid phone number";
            setErrorText(initialErrorMessage);
            validatePhone(isValid, initialErrorMessage); // Optionally remove if causing re-renders
        } else {
            setIsValidPhone(true);
            setErrorText("");
        }
    }, [value, defaultCountry]); // Avoid including `validatePhone` if it's not memoized

    const validatePhoneNumber = (phoneNumber: string, country: any) => {
        try {
            const parsedPhoneNumber = parsePhoneNumber(phoneNumber, country);
            return parsedPhoneNumber ? parsedPhoneNumber.isValid() : false;
        } catch (error) {
            return false;
        }
    };

    const handleChange = (value: string, info: any) => {
        if (value === "") {
            setErrorText("Enter Your Phone Number");
            setIsValidPhone(false);
            validatePhone(false, "Enter Your Phone Number");
        } else {
            const isValid = validatePhoneNumber(value, info.countryCode === null ? defaultCountry : info.countryCode);
            setIsValidPhone(isValid);
            const errorMessage = isValid ? "" : "Invalid phone number";
            setErrorText(errorMessage);
            validatePhone(isValid, errorMessage);
        }

        onChange(value, name);
    };

    return (
        <FormControl 
            className={`phone-input-container ${externalClassName} w-[100%]`} 
            error={!isValidPhone || error}
            variant={variant}
        >
            <MuiTelInput
                id="phone-input"
                className="pl-0"
                value={value}
                onChange={handleChange}
                defaultCountry={defaultCountry}
                disabled={disabled}
                inputProps={{
                    required: required,
                    style: { borderColor: (!isValidPhone || error) ? 'red' : undefined },
                }}
                label={label}
                error={!isValidPhone || error}
            />
            {helperText && <span className={`mt-1 pl-2 helper-text`}>{helperText}</span>}
            {errorText && !isValidPhone && <FormHelperText error>{errorText}</FormHelperText>}
        </FormControl>
    );
};
