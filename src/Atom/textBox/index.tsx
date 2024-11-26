import { FormControl, TextareaAutosize } from "@mui/material";
import React from "react";
import "./textBox.scss";

interface TextBoxProps {
  name: string; // The name of the text area
  value: string; // Current value of the text area
  error?: boolean; // Whether the text area has an error
  onchange: (value: string, name: string) => void; // Callback for handling changes
  placeholder?: string; // Placeholder text
  variant?: "standard" | "outlined" | "filled"; // MUI FormControl variant
  minRows?: number; // Minimum number of rows
  minColumns?: number; // Minimum number of columns
}

export const TextBox: React.FC<TextBoxProps> = ({
  name,
  value,
  error = false,
  onchange,
  placeholder = "Enter ticket description",
  variant = "outlined",
  minRows = 3,
  minColumns = 10,
}) => {
  return (
    <div className="text-box-container">
      <div className="text-box-wrapper">
        <FormControl
          variant={variant}
          fullWidth
          margin="normal"
          className={`form-control-register ${error ? "error" : ""}`}
        >
          <TextareaAutosize
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={(e) => onchange(e.target.value, name)}
            minRows={minRows}
            style={{ minWidth: `${minColumns}ch` }}
            className="text-area"
          />
          {error && <p className="error-text">This field is required</p>}
        </FormControl>
      </div>
    </div>
  );
};
