import React from "react";
import "./select.scss";
import { FormControl, InputLabel, NativeSelect, OutlinedInput } from "@mui/material";

interface Option {
  label: string;
  value: string | number;
}

interface InputProps {
  label: string;
  value: string; // Consider using `string | number` if needed
  options: Option[];
  onChange: (value: string, name: string) => void;
  variant?: "standard" | "outlined";
  name: string;
  helperText: string
  error?:boolean
}

export const Select = ({
  label = "",
  value = "",
  options = [],
  onChange = (value: string, name: string) => null,
  variant = "outlined",
  name = "",
  helperText ="slect the gender",
  error = false
}: InputProps) => {
  return (
    <div className="select-container">
      <FormControl fullWidth variant={variant} error={error}>
        <InputLabel htmlFor={name} shrink={true} >
          {label}
        </InputLabel>
        <NativeSelect
          id={name}
          value={value}
          onChange={(e) => onChange(e.target.value, name)}
          input={
            variant === "outlined" ? (
              <OutlinedInput label={label} id={name} notched />
            ) : undefined
          }
          inputProps={{
            name: name,
            id: name,
          }}
        >
          <option>{"--Select Option--"}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </NativeSelect>

        {helperText && <span className="helper-text pl-2">{helperText}</span>}
      </FormControl>
    </div>
  );
};
