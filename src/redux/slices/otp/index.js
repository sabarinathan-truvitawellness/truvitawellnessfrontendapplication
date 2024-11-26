import { createSlice,  } from "@reduxjs/toolkit";

const initialState = {
  otpSent: false,
  timeLeft: 0,
};

const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    otpSentSuccess: (state) => {
      state.otpSent = true;
      state.timeLeft = 180; // 30 represents seconds
    },
    otpVerificationStarted: (state) => {
      state.otpSent = false;
      state.timeLeft = 0;
    },
    updateTimeLeft: (state, action) => {
      state.timeLeft = action.payload;
    },
    resetOtpSate: (state) => {
      state.otpSent = false;
      state.timeLeft = 0;
    },
  },
});

export const { otpSentSuccess, otpVerificationStarted, updateTimeLeft, resetOtpSate } = otpSlice.actions;

export default otpSlice.reducer;
