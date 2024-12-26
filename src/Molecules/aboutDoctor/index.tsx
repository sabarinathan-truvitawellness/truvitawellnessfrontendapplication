
import React, { useState } from "react";
import { LocationPin } from "../../utils/common/svgIcons";
import "./aboutDoctor.scss";
import { useParams } from "react-router-dom";
import { useGetDocotorSlotQuery } from "../../redux/services";

interface TimeSlot {
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

interface AboutDoctorProps {
  imageUrl: string;
  doctorName: string;
  yearsOfExperience: number;
  DoctorsAboutContent: string;
  availableDates: string[];
}

export const AboutDoctor: React.FC<AboutDoctorProps> = ({
  imageUrl,
  doctorName,
  yearsOfExperience,
  DoctorsAboutContent,
  availableDates,
}) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [viewAllSlots, setViewAllSlots] = useState(false); // State for toggling "View More" and "View Less"
  const { doctorId } = useParams();
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

  const getTimeSlot = (date: string) => {
    setSelectedDate(date);
    setViewAllSlots(false); // Reset "View More" state when selecting a new date
  };

  const slotsToShow = viewAllSlots ? displayedSlots : displayedSlots.slice(0, 3); // Show first 3 slots if not expanded
  return (
    <div className="about-doctor-container">
      <div className="about-doctor-wrapper">
        <div className="about-col-1">
          <div className="doctor-image-wrapper"> 
          <img src={`https://truvitacare.com${imageUrl}`} alt={`${doctorName}`} />
          </div>
          <div className="doctor-fees-section">
            <div className="doctor-detail-wrapper">
              <p>{doctorName}</p>
            </div>
            <div className="rating-content">
              <p>
                <span>{`${yearsOfExperience} years experience`}</span>{" "}
               
              </p>
            </div>
            <div className="about-doc-content">
              <p>{DoctorsAboutContent}</p>
            </div>
            <div className="horizontal-line"></div>
            <div className="doctor-slot-section">
              {availableDates?.map((date, index) => (
                <div className="slot-date-wrapper" key={index}>
                  <button
                    className="slot-date-btn"
                    onClick={() => getTimeSlot(date)}
                  >
                    {date}
                  </button>
                </div>
              ))}
            </div>
            <div className="time-slots-wrapper">
              {slotsToShow.length > 0 ? (
                slotsToShow.map((slot, index) => (
                  <div key={index} className="time-slot">
                    {convertTo12HourFormat(slot.start_time)} -{" "}
                    {convertTo12HourFormat(slot.end_time)}
                  </div>
                ))
              ) : (
                <p>Select Date to view the slots</p>
              )}
              {displayedSlots.length > 3 && (
                <button
                  className="view-more-btn"
                  onClick={() => setViewAllSlots(!viewAllSlots)}
                >
                  {viewAllSlots ? "- View Less" : "+ View More"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

