import React, { useState, useEffect } from "react";
import "./doctorCalender.scss"; // Link to the SCSS file

interface Slot {
  time: string;
  available: boolean;
}

interface CalendarProps {
  slotsData: { date: string; slots: Slot[] }[];
}

export const DoctorCalender: React.FC<CalendarProps> = ({ slotsData }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    // Set current date as the default selected date if available
    const todayString = startDate.toISOString().split("T")[0];
    if (slotsData.some((slot) => slot.date === todayString)) {
      setSelectedDate(todayString);
    }
  }, [slotsData, startDate]);

  const getWeekDays = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      return date;
    });
  };

  console.log("selected dates",selectedDate,startDate)
//   if(startDate <= )

  const formattedDate = (date: Date) => {
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' }); // Get the short weekday name (Mon, Tue, etc.)
    return `${date.getDate()} ${dayOfWeek}`; // Return date and weekday
  };  

  const handleNextWeek = () => {
    setStartDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 7);
      console.log("next",newDate)
    //   if(selectedDate )
      return newDate;
    });
  };

  const handlePreviousWeek = () => {
    setStartDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 7);
      console.log("prev",newDate)
      return newDate;
    });
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <div className="calendar-container">
      <div className="week-navigation">
        <button onClick={handlePreviousWeek}>&lt; Previous</button>
        <button onClick={handleNextWeek}>Next &gt;</button>
      </div>
      <div className="date-selector">
        {getWeekDays().map((date) => {
          const dateString = date.toISOString().split("T")[0];
          const isAvailable = slotsData.some((slot) => slot.date === dateString);

          return (
            <button
              key={dateString}
              onClick={() => handleDateClick(dateString)}
              className={`date-item ${isAvailable ? "" : "unavailable"} ${
                selectedDate === dateString ? "selected" : ""
              }`}
              disabled={!isAvailable}
            >
              {formattedDate(date)}
            </button>
          );
        })}
      </div>
      {selectedDate && (
        <div className="slots-container">
          <h3>Available Slots for {selectedDate}</h3>
          {slotsData
            .find((slot) => slot.date === selectedDate)
            ?.slots.map((slot, index) => (
              <button
                key={index}
                className={`slot-item ${slot.available ? "" : "unavailable-slot"}`}
                disabled={!slot.available}
              >
                {slot.time}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};
