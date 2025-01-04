import React, { useEffect, useState } from "react";
import "./aboutDoctor.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
  useBookSlotMutation,
  useGetDocotorDetailsQuery,
  useGetDocotorSlotQuery,
} from "../../redux/services";
import { Button, Input, ModelOverlay } from "../../Atom";
import { notification } from "antd";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";
import {  setAllBookingDetails, setDoctorDetails, setSelectedDate } from "../../redux/slices/appointmentData";
import { RootState } from "../../redux";
import { AppRoutes } from "../../routes";

interface TimeSlot {
  start_time: string;
  end_time: string;
  is_booked: boolean;
  time_slot_id: number;
}

interface AboutDoctorProps {
  doctorId:string | number | undefined;
  // doctorDetails: {
  //   doctor_id: number;
  //   doctor_name: string;
  //   specialty: string;
  //   profile_picture_url: string;
  //   doctor_experience: number;
  //   doctor_fees: number;
  //   bio: string;
  //   dates: string[];
  // };
}

export const AboutDoctor: React.FC<AboutDoctorProps> = ({doctorId}) => {
  //  const { user, userData } = useSelector((state: RootState) => state.auth);

  const { data: doctorDetails } = useGetDocotorDetailsQuery(doctorId);
  console.log("param", doctorDetails?.profile_picture_url);

  const navigate = useNavigate();
  // useEffect(()=>{
  //   doctorDetails
  // },[slotBookingHandler])

  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [viewAllSlots, setViewAllSlots] = useState(false);
  const [isOpenOverlay, setIsOpenOverlay] = useState(false);
  const [slotTiming, setSlotTiming] = useState({
    startTime: "",
    endTime: "",
    slotId:0
  });
  const [formData, setFormData] = useState({
    selectedDate: dayjs().format("YYYY-MM-DD"),
    time_slot_id: 0,
    symptoms: "",
  });

  // const [bookAppointment] = useBookSlotMutation();
  const { data: getDoctorSlots } = useGetDocotorSlotQuery({
    doctorId: doctorId,
    date: selectedDate,
  });

  const convertTo12HourFormat = (time: string): string => {
    const [hour, minute] = time.split(":").map(Number);
    const amPm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${amPm}`;
  };

  const filterFutureSlotsForToday = (slots: TimeSlot[]): TimeSlot[] => {
    const currentTime = new Date();
    return slots.filter((slot) => {
      const slotStartTime = new Date(
        `${currentTime.toISOString().split("T")[0]}T${slot.start_time}`
      );
      return slotStartTime >= currentTime;
    });
  };

  const getDisplayedSlots = (): TimeSlot[] => {
    if (!selectedDate) return [];
    const currentDate = new Date().toISOString().split("T")[0];
    if (selectedDate === currentDate) {
      return filterFutureSlotsForToday(getDoctorSlots?.slots || []);
    }
    return getDoctorSlots?.slots || [];
  };

  const displayedSlots = getDisplayedSlots();
  const slotsToShow = viewAllSlots
    ? displayedSlots
    : displayedSlots.slice(0, 3);

  const handleDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      const formattedDate = newDate.format("YYYY-MM-DD");
      setSelectedDate(formattedDate);
      setFormData({ ...formData, selectedDate: formattedDate });
      setViewAllSlots(false);
    }
  };

 

  const getSlotTimingId = (
    slotId: number,
    slotStart: string,
    slotEnd: string
  ) => {
    setSlotTiming({ startTime: slotStart, endTime: slotEnd,slotId:slotId });
    setFormData((prev) => ({ ...prev, time_slot_id: slotId }));
  };
  console.log(doctorDetails,selectedDate,slotTiming)
  
  const slotBookingHandler = () => {
    
    if (doctorDetails && selectedDate && slotTiming) {
      dispatch(
        setAllBookingDetails({
          doctorDetails,
          selectedDate,
          slotTiming,
        })
      );
      navigate(AppRoutes.bookingOverview);
      
    } else {
      console.error("Missing booking details to dispatch.");
    }
  };

  
  
  // setDoctorDetails, setSelectedDate, setSlotTiming

  // doctorDetails
  // selectedDate
  // slotTiming

  console.log("seletedslot", formData.time_slot_id);
  return (
    <div className="about-doctor-container">
      <div className="about-doctor-wrapper">
        <div className="about-col-1">
          <div className="doctor-image-wrapper">
            <img
              src={`https://truvitacare.com${doctorDetails?.profile_picture_url}`}
              alt={`${doctorDetails?.doctor_name}`}
            />
          </div>
          <div className="doctor-fees-section">
            <div className="doctor-detail-wrapper">
              <p>{doctorDetails?.doctor_name}</p>
            </div>
            <div className="rating-content">
              <p>
                <span>{doctorDetails?.specialty}</span>
                <span>{` | ${doctorDetails?.doctor_experience} - years experience`}</span>
              </p>
            </div>
            <div className="doctor-fees-wrapper">
              <p>Doctor Fees</p>
              <p>
                <span>{doctorDetails?.doctor_fees}</span>/Session
              </p>
            </div>
          </div>
        </div>
        <div className="about-col-2">
          <div className="slot-selection-wrapper">
            <div className="date-picker-wrapper">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  value={dayjs(selectedDate)}
                  onChange={(newDate) => handleDateChange(newDate)}
                  disablePast
                />
              </LocalizationProvider>
            </div>
            <div className="time-slots-wrapper">
              <div className="time-slot-sanity-box">
                {slotsToShow.length > 0 ? (
                  slotsToShow.map((slot, index) => (
                    <button
                      key={index}
                      className={`time-slot ${
                        slot.is_booked
                          ? "bg-gray-500"
                          : formData.time_slot_id === slot.time_slot_id
                          ? "active-slot"
                          : ""
                      }`}
                      onClick={() =>
                        !slot.is_booked &&
                        getSlotTimingId(
                          slot.time_slot_id,
                          slot.start_time,
                          slot.end_time
                        )
                      }
                      disabled={slot.is_booked}
                    >
                      {convertTo12HourFormat(slot.start_time)} -{" "}
                      {convertTo12HourFormat(slot.end_time)}
                    </button>
                  ))
                ) : (
                  <p>Select a date to view the slots</p>
                )}
                {displayedSlots.length > 3 && (
                  <button
                    className="abt-doc-view-more-btn"
                    onClick={() => setViewAllSlots(!viewAllSlots)}
                  >
                    {viewAllSlots ? "- View Less" : "+ View More"}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="booking-section">
            <Button
              buttonText="BOOK APPOINTMENT"
              onClick={slotBookingHandler}
            />
          </div>

          <div className="horizontal-line"></div>
          <p className="about-title-section">About Doctor</p>
          <div className="about-doc-content">
            <p>{doctorDetails?.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
