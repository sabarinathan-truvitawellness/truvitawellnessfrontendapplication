import React, { useRef, useState, useEffect } from 'react';
import { Input as BaseInput } from '@mui/base/Input';
import { Box, styled } from '@mui/system';
import './otpInput.scss';

interface OTPProps {
  separator: React.ReactNode;
  length: number;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  helperText?: string; // Prop to display an error message
}

export const OTP = ({ separator, length, value, onChange, helperText }: OTPProps) => {
  const inputRefs = useRef<HTMLInputElement[]>(new Array(length).fill(null));
  const [error, setError] = useState<string>("");

  const focusInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex];
    if (targetInput) targetInput.focus();
  };

  const validateInput = (input: string) => {
    const regex = /^[0-9]$/;
    if (!regex.test(input) && input !== "") {
      setError("Only numeric input is allowed");
      return false;
    }
    setError("");
    return true;
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    switch (event.key) {
      case 'ArrowLeft':
        if (currentIndex > 0) {
          event.preventDefault();
          focusInput(currentIndex - 1);
        }
        break;
      case 'ArrowRight':
        if (currentIndex < length - 1) {
          event.preventDefault();
          focusInput(currentIndex + 1);
        }
        break;
      case 'Backspace':
      case 'Delete':
        event.preventDefault();
        onChange((prevOtp) => {
          const otpArray = prevOtp.split('');
          otpArray[currentIndex] = '';
          return otpArray.join('');
        });
        if (currentIndex > 0 && event.key === 'Backspace') {
          focusInput(currentIndex - 1);
        }
        break;
      default:
        break;
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    const newValue = event.target.value.slice(-1); // Only get the last character
    if (!validateInput(newValue)) {
      return; // Do not update if input is invalid
    }
    onChange((prevOtp) => { 
      const otpArray = prevOtp.split('');
      otpArray[currentIndex] = newValue;
      return otpArray.join('');
    });

    if (newValue && currentIndex < length - 1) {
      focusInput(currentIndex + 1);
    }
  };

  const handlePaste = (
    event: React.ClipboardEvent<HTMLInputElement>,
    currentIndex: number
  ) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData('text').slice(0, length - currentIndex);
    if (!/^\d+$/.test(pastedData)) {
      setError("Only numeric input is allowed");
      return;
    }
    setError("");
    onChange((prevOtp) => {
      const otpArray = prevOtp.split('');
      for (let i = 0; i < pastedData.length; i++) {
        if (currentIndex + i < length) {
          otpArray[currentIndex + i] = pastedData[i];
        }
      }
      return otpArray.join('');
    });
    const newFocusIndex = Math.min(currentIndex + pastedData.length, length - 1);
    focusInput(newFocusIndex);
  };

  return (
    <div className='otp-input-container'>
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center' }}>
        {Array.from({ length }).map((_, index) => (
          <React.Fragment key={index}>
            <BaseInput
              slots={{ input: InputElement }}
              aria-label={`Digit ${index + 1} of OTP`}
              slotProps={{
                input: {
                  ref: (el) => (inputRefs.current[index] = el!),
                  onKeyDown: (event) => handleKeyDown(event, index),
                  onChange: (event) => handleChange(event, index),
                  onPaste: (event) => handlePaste(event, index),
                  value: value[index] || '',
                  inputMode: 'numeric',
                },
              }}
            />
            {index === length - 1 ? null : separator}
          </React.Fragment>
        ))}
      </Box>
      {error && <span className="helper-text">{error}</span>}
      {helperText && !error && <span className="helper-text">{helperText}</span>}
    </Box>
    </div>
  );
};

// Styled input for each OTP box
const InputElement = styled('input')(({ theme }) => `
  width: 40px;
  text-align: center;
  padding: 8px;
  font-size: 16px;
  border-radius: 8px;
  border: 3px solid #ccc;
  &:focus { outline: none; border: 3px solid #017A99; }
`);
