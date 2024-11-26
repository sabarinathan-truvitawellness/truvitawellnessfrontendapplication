import React from "react";
import { FormControl } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs'; // Import Dayjs type
import './dynamicDateField.scss';

interface InputProps {
    type?: string;
    placeholder?: string;
    onChange?: (value: string, name: string) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    name?: string;
    label?: string;
    helperText?: string;
    required?: boolean;
    variant?: "outlined" | "filled" | "standard";
    externalClassName?: string;
    error?: boolean;
    value?: Dayjs | null; // Ensure value type matches Day.js or null
    isShrunk?: boolean;
}

export const DynamicDateField: React.FC<InputProps> = ({
    type = "date",
    placeholder = "",
    onChange = () => {},
    onBlur = () => {},
    onFocus = () => {},
    name = "",
    label = "",
    helperText = "",
    required = false,
    variant = "outlined",
    externalClassName = "",
    error = false,
    value = null,
    isShrunk = false
}) => {

    const handlingChangeEvent = (newValue: Dayjs | null) => {
        if (newValue && newValue.isValid()) {
            // Format date to 'YYYY-MM-DD'
            const formattedDate = newValue.format('YYYY-MM-DD');
            onChange(formattedDate, name);
        } else {
            onChange('', name); // Handle case when date is cleared or invalid
        }
    };

    return (
        <FormControl variant={variant} fullWidth margin="normal" error={error} className={`date-picker ${externalClassName}`}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label={label}
                    value={value ? dayjs(value) : null} 
                    onChange={handlingChangeEvent}
                    slotProps={{
                        textField: {
                            InputLabelProps: {
                                shrink: isShrunk,
                                required: required,
                            },
                            error: error,
                        },
                    }}
                />
            </LocalizationProvider>
            {helperText && <span className={`mt-1 pl-2 helper-text`}>{helperText}</span>}
        </FormControl>
    );
};
