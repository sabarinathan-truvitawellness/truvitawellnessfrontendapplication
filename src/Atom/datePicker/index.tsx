import React, { useState } from "react";
import { format, addDays } from "date-fns";
import { IconButton, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight, CalendarToday } from "@mui/icons-material";
import { ModelOverlay } from "../modelOvrlay"; // Assuming ModelOverlay is your custom modal component
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "./datePicker.scss";

interface CalendarComponentProps {
  onDateSelect?: (selectedDate: Dayjs) => void; // New prop to handle selected date
}

export const CalendarComponent: React.FC<CalendarComponentProps> = ({
  onDateSelect,
}) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [isOpenOverlay, setIsOpenOverlay] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  const getDaysToDisplay = () => {
    return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  };

  const handleDateScroll = (direction: "prev" | "next") => {
    setStartDate((prevDate) =>
      direction === "next" ? addDays(prevDate, 7) : addDays(prevDate, -7)
    );
  };

  const closeOverlay = () => {
    setIsOpenOverlay(false);
  };

  const renderCalendar = () => {
    setIsOpenOverlay(true);
  };

  const handleDaySelect = (day: Date) => {
    const newSelectedDate = dayjs(day);
    setSelectedDate(newSelectedDate); // Update local state
    if (onDateSelect) {
      onDateSelect(newSelectedDate); // Notify parent component
    }
  };

  return (
    <>
      {/* Calendar Overlay */}
      {isOpenOverlay && (
        <ModelOverlay closeOverlay={closeOverlay}>
          <div className="overlay">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                value={selectedDate}
                onChange={(newDate) => {
                  if (newDate) {
                    setSelectedDate(newDate);
                    setStartDate(newDate.toDate());
                    if (onDateSelect) {
                      onDateSelect(newDate);
                    }
                    closeOverlay();
                  }
                }}
                disablePast
              />
            </LocalizationProvider>
          </div>
        </ModelOverlay>
      )}

      {/* Calendar UI */}
      <div className="calendar-container">
        <div className="calender-wrapper">
        <div className="title-section">
          <div className="h6">Your Schedule</div>
          <div className="calendar-picker">
            <div className="calendar-icon" onClick={renderCalendar}>
              <CalendarToday />
            </div>
            <div className="selected-week">
              Selected Date:{" "}
              {format(selectedDate.toDate(), "dd-MM-yyyy")}
            </div>
          </div>
        </div>
        {/* Days Navigation */}
        <div className="days-navigation">
          <IconButton onClick={() => handleDateScroll("prev")}>
            <ChevronLeft />
          </IconButton>

          <div className="days-wrapper">
            {getDaysToDisplay().map((day, index) => (
              <div
                key={index}
                className={`day ${
                  dayjs(day).format("YYYY-MM-DD") ===
                  selectedDate.format("YYYY-MM-DD")
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleDaySelect(day)}
              >
                <span>{format(day, "dd")}</span>
                <span>{format(day, "EEE")}</span>
              </div>
            ))}
          </div>

          <IconButton onClick={() => handleDateScroll("next")}>
            <ChevronRight />
          </IconButton>
        </div>
        </div>

      </div>
    </>
  );
};
