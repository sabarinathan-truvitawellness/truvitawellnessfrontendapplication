// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     doctorDetails: {
//         doctor_id: 0,
//         doctor_name: "",
//         specialty: "",
//         profile_picture_url:"",        
//         doctor_experience:0,
//         doctor_fees:0,
//         bio: "",
//         dates: [""],
//       },
//   selectedDate: "", // For storing the selected date
//   slotTiming: {
//     startTime: "",
//     endTime: "",
//   },
// };

// const bookingSlice = createSlice({
//   name: "booking",
//   initialState,
//   reducers: {
//     setDoctorDetails(state, action) {
//       state.doctorDetails = action.payload; // Set doctor details
//     },
//     setSelectedDate(state, action) {
//       state.selectedDate = action.payload; // Set selected date
//     },
//     setSlotTiming(state, action) {
//       state.slotTiming = action.payload; // Set slot timing
//     },
//   },
// });

// export const { setDoctorDetails, setSelectedDate, setSlotTiming } =
//   bookingSlice.actions;
// export default bookingSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    doctorDetails: {
                doctor_id: 0,
                doctor_name: "",
                specialty: "",
                profile_picture_url:"",        
                doctor_experience:0,
                doctor_fees:0,
                bio: "",
                dates: [""],
              },
  selectedDate: null,
  slotTiming: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setDoctorDetails(state, action) {
      state.doctorDetails = action.payload;
    },
    setSelectedDate(state, action) {
      state.selectedDate = action.payload;
    },
    setSlotTiming(state, action) {
      state.slotTiming = action.payload;
    },
    setAllBookingDetails(state, action) {
      state.doctorDetails = action.payload.doctorDetails;
      state.selectedDate = action.payload.selectedDate;
      state.slotTiming = action.payload.slotTiming;
    },
  },
});

export const {
  setDoctorDetails,
  setSelectedDate,
  setSlotTiming,
  setAllBookingDetails,
} = bookingSlice.actions;

export default bookingSlice.reducer;
