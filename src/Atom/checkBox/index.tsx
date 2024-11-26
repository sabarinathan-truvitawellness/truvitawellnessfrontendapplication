import React from "react";
import { Checkbox, FormControlLabel, FormControl, FormHelperText } from "@mui/material";
import './checkBox.scss'

interface InputProps {
    error?: boolean; // Prop to indicate error state
    externalClassName?: string;
    checked?: boolean;
    name?: string;
    helperText?: string; // Message to show when there's an error
    onChange?: (checked: boolean, name: string) => void;
    label:string
}

export const CheckBox: React.FC<InputProps> = ({
    error = false,
    externalClassName = "",
    checked = false,
    name = "",
    helperText = "",
    onChange = () => {},
    label = ""
}) => {
    return (
        <FormControl error={error} className={`checkbox-container ${externalClassName}`}>
            <FormControlLabel
                control={
                    <Checkbox
                        className={`check-box-style ${error ? 'error-checkbox' : ''}`}
                        checked={checked}
                        name={name}
                        onChange={(e) => onChange(e.target.checked, name)}
                        style={{
                            color: error ? 'red' : undefined,
                        }}
                    />
                }
                label={label}
                className={""}
            />
            {error && helperText && (
                <FormHelperText className="error-helper-text" style={{ color: 'red' }}>
                    {helperText}
                </FormHelperText>
            )}
        </FormControl>
    );
};
