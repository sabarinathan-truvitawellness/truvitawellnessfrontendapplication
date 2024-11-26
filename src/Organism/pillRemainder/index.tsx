import React from "react";
import { CancelButton, Pill, Tick } from "../../utils/common/svgIcons";
import "./pillRemainder.scss";

export const PillRemainder = () => {
  const pillData = [
    {
      id: 1,
      medicineName: "Paracetamol",
      doctorsName: "Dr. John Doe",
      timesPerDay: 2,
      fromTiming: "8:00 AM",
      toTiming: "8:00 PM",
      mealPrescribe: "After Meal",
      upcomingPillTime: "12:00 PM",
    },
    {
      id: 2,
      medicineName: "Ibuprofen",
      doctorsName: "Dr. Jane Smith",
      timesPerDay: 3,
      fromTiming: "6:00 AM",
      toTiming: "6:00 PM",
      mealPrescribe: "Before Meal",
      upcomingPillTime: "2:00 PM",
    },
    {
      id: 3,
      medicineName: "Amoxicillin",
      doctorsName: "Dr. Emily Johnson",
      timesPerDay: 1,
      fromTiming: "9:00 AM",
      toTiming: "9:00 AM",
      mealPrescribe: "With Meal",
      upcomingPillTime: "9:00 AM",
    },
  ];

  return (
    <div className="pill-remainder-container">
      {pillData.map((pill) => (
        <div className="pill-remainder-wrapper" key={pill.id}>
          <div className="pill-icon">
            <Pill />
          </div>
          <div className="medicine-name">
            <h2>{pill.medicineName}</h2>
          </div>
          <div className="doctor-name">
            <p>Prescribed by {pill.doctorsName}</p>
          </div>
          <div className="intake-info">
            <p>X{pill.timesPerDay}</p>
            <p>Intake Per Day</p>
          </div>
          <div className="intimate-timing">
            <p>
              {pill.fromTiming} - {pill.toTiming}
            </p>
            <p>{pill.mealPrescribe}</p>
          </div>
          <div className="upcoming-timing">
            <p>Next Pill: {pill.upcomingPillTime}</p>
          </div>
          <div className="action-buttons">
            <div className="cancel-btn">
              <CancelButton />
            </div>
            <div className="taken-btn">
              <Tick />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
