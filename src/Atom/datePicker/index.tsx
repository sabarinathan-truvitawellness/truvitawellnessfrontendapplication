import React, { useState, useEffect } from "react";
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, isSameMonth } from "date-fns";
import { FaCalendarAlt } from 'react-icons/fa';

interface CalendarComponentProps {
    defaultDate?: Date;
}

export const CalendarComponent: React.FC<CalendarComponentProps> = ({ defaultDate = new Date() }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(defaultDate);
    const [currentStartDate, setCurrentStartDate] = useState<Date>(startOfMonth(defaultDate));
    const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(defaultDate));
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (!isSameMonth(currentStartDate, currentMonth)) {
            setCurrentStartDate(startOfMonth(currentMonth));
        }
    }, [currentMonth]);

    const getDaysToDisplay = () => {
        const endDate = endOfMonth(currentMonth);
        return eachDayOfInterval({
            start: currentStartDate,
            end: new Date(Math.min(addDays(currentStartDate, 6).getTime(), endDate.getTime())),
        });
    };

    const handleDateScroll = (direction: 'prev' | 'next') => {
        const newStartDate = direction === 'next' 
            ? addDays(currentStartDate, 7) 
            : addDays(currentStartDate, -7);
        // Ensure newStartDate remains within the current month
        if (isSameMonth(newStartDate, currentMonth)) {
            setCurrentStartDate(newStartDate);
        }
    };

    const handleMonthScroll = (direction: 'prev' | 'next') => {
        const newMonth = direction === 'next' ? addMonths(currentMonth, 1) : subMonths(currentMonth, 1);
        setCurrentMonth(newMonth);
    };

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setSelectedDate(date);
            setCurrentMonth(startOfMonth(date)); // Update the current month
            setIsOpen(false);
        }
    };

    const handleMonthSelect = (month: Date) => {
        setCurrentMonth(month); // Set the selected month
        setCurrentStartDate(startOfMonth(month)); // Update start date to the first of the selected month
    };

    const isSelectedDate = (day: Date) => selectedDate && day.toDateString() === selectedDate.toDateString();

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md relative">
            <h3 className="text-lg font-semibold text-center">Your Schedule</h3>

            {/* Month Navigation */}
            <div className="flex items-center justify-between mt-4">
                <button onClick={() => handleMonthScroll('prev')} className="p-2 rounded-lg bg-gray-300 hover:bg-gray-400">
                    &lt;
                </button>
                <div className="flex justify-between flex-1 mx-2">
                    {Array.from({ length: 3 }, (_, i) => {
                        const month = addMonths(currentMonth, i);
                        return (
                            <div 
                                key={i} 
                                className={`text-center p-2 rounded-lg cursor-pointer ${
                                    isSameMonth(month, currentMonth) ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                                }`}
                                onClick={() => handleMonthSelect(month)} // Month selection handler
                            >
                                <p className="font-medium">{format(month, "MMMM yyyy")}</p>
                            </div>
                        );
                    })}
                </div>
                <button onClick={() => handleMonthScroll('next')} className="p-2 rounded-lg bg-gray-300 hover:bg-gray-400">
                    &gt;
                </button>
            </div>

            {/* Days of the current month with navigation */}
            <div className="flex items-center justify-between mt-4">
                <button onClick={() => handleDateScroll('prev')} className="p-2 rounded-lg bg-gray-300 hover:bg-gray-400">
                    &lt;
                </button>
                <div className="flex justify-between flex-1 mx-2 space-x-2">
                    {getDaysToDisplay().map((day, index) => (
                        <div
                            key={index}
                            className={`w-12 text-center p-2 rounded-lg cursor-pointer ${isSelectedDate(day) ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                            onClick={() => handleDateChange(day)}
                        >
                            <p className="text-sm font-medium">{format(day, "dd")}</p>
                            <p className="text-xs">{format(day, "EEE")}</p>
                        </div>
                    ))}
                </div>
                <button onClick={() => handleDateScroll('next')} className="p-2 rounded-lg bg-gray-300 hover:bg-gray-400">
                    &gt;
                </button>
            </div>

            {/* Selected Date and Calendar Icon */}
            <div className="mt-4 flex items-center justify-center space-x-2">
                <span className="font-medium">Selected Date: {selectedDate ? format(selectedDate, "dd-MM-yyyy") : "None"}</span>
               
            </div>

        </div>
    );
};
