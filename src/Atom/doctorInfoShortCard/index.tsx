import React, { useState } from "react";
import { LocationPin, Star } from "../../utils/common/svgIcons";
import "./doctorInfoShortCard.scss";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../routes";

interface TimeSlot {
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

interface DoctorInfoShortCardProps {
  doctorsName: string;
  medicalSpecialization: string;
  experience: number;
  timeSlots: TimeSlot[];
  imageUrl: string;
  doctorCosting: string;
  doctorId: string
}

export const DoctorInfoShortCard: React.FC<DoctorInfoShortCardProps> = ({
  doctorsName,
  medicalSpecialization,
  experience,
  timeSlots,
  imageUrl,
  doctorCosting,
  doctorId
}) => {
  const [viewAll, setViewAll] = useState(false);

  console.log("img",imageUrl)

  // Convert time to 12-hour format with AM/PM
  const convertTo12HourFormat = (time: string): string => {
    const [hour, minute] = time.split(":").map(Number);
    const amPm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${amPm}`;
  };

  // Filter future time slots
  const getFutureSlots = (slots: TimeSlot[]): TimeSlot[] => {
    const currentTime = new Date();
    return slots.filter((slot) => {
      const slotStartTime = new Date(
        `${currentTime.toISOString().split("T")[0]}T${slot.start_time}`
      );
      return slotStartTime >= currentTime;
    });
  };

  const futureSlots = getFutureSlots(timeSlots);

  // Limit the number of slots displayed initially
  const displayedSlots = viewAll ? futureSlots : futureSlots.slice(0, 3);

  return (
   
    <div className="short-card-container">
       <Link to={`${AppRoutes.doctorsDetails.replace(':doctorId', doctorId)}`}>
      <div className="short-card-wrapper">
        <div className="card-col-1">
          <img src={`https://truvitacare.com${imageUrl}`} alt={`${doctorsName} profile`} />
        </div>
        <div className="card-col-2">
          <div className="doctors-content">
            <h2>{doctorsName}</h2>
            <p>
              {medicalSpecialization} <span>|</span>{" "}
              {`${experience} yrs experience`}
            </p>

            <div className="doctors-time-slot">
              {displayedSlots.length > 0 ? (
                displayedSlots.map((slot, index) => (
                  <div key={index} className="slots-list">
                    {convertTo12HourFormat(slot.start_time)} -{" "}
                    {convertTo12HourFormat(slot.end_time)}
                  </div>
                ))
              ) : (
                <p>No future slots available</p>
              )}
              {futureSlots.length > 3 && (
                <button
                className="view-more-btn"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent Link's click event
                  setViewAll(!viewAll);
                }}
              >
                {viewAll ? "View Less" : "View More"}
              </button>
              )}
            </div>
          </div>
          <div className="doctor-costing">
            <p> ${doctorCosting}</p>
          </div>
        </div>
      </div>
      </Link>
    </div>
   
  );
};
