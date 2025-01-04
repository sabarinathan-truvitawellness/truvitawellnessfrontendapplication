import React, { useState } from "react";
import { AppointmentServices } from "../../Molecules";
import { AppointmentListCard } from "../../Atom";
import { useGetAppointmentListQuery } from "../../redux/services";
import "./appointments.scss";

interface TimeSlotDetails {
  id: number;
  from_date: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

interface Doctor {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture_url: string;
}

interface Appointment {
  id: number;
  appointment_id: string;
  profile_picture_url: string;
  time_slot_details: TimeSlotDetails;
  status: string;
  notes: string;
  meeting_link: string;
  doctor: Doctor;
}

export const Appointments: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState("confirmed");
  const patientId = localStorage.getItem("userId") || "";
  const { data: getAppointmentList, isLoading } = useGetAppointmentListQuery({
    userId: patientId,
    status: statusFilter,
  });

  if (isLoading) {
    return <p>Loading appointments...</p>;
  }

  const handleStatusChange = (status: string) => {
    setStatusFilter(status);
  };

  return (
    <div className="appointment-page-container">
      <div className="appointment-page-wrapper">

        <div className="appointment-service-section">
          <AppointmentServices />

          <div className="appointment-filters">
          <button
            className={`filter-button ${statusFilter === "pending" ? "active" : ""}`}
            onClick={() => handleStatusChange("pending")}
          >
            Pending
          </button>
          <button
            className={`filter-button ${statusFilter === "completed" ? "active" : ""}`}
            onClick={() => handleStatusChange("completed")}
          >
            Completed
          </button>
          <button
            className={`filter-button ${statusFilter === "confirmed" ? "active" : ""}`}
            onClick={() => handleStatusChange("confirmed")}
          >
            Confirmed
          </button>
          <button
            className={`filter-button ${statusFilter === "cancelled_by_doctor" ? "active" : ""}`}
            onClick={() => handleStatusChange("cancelled_by_doctor")}
          >
            Cancelled
          </button>
        </div>

          {getAppointmentList && getAppointmentList.length > 0 ? (
            getAppointmentList.map((appointment: Appointment) => (
              <AppointmentListCard
                appointment_id={appointment.appointment_id}
                key={appointment.id}
                consultation="Doctor Consultation"
                location={
                  appointment.time_slot_details.from_date || "Location not specified"
                }
                doctorName={`${appointment.doctor.first_name} ${appointment.doctor.last_name}`}
                specialization="Cardiology" // Replace with actual specialization if available.
                startTime={"3"}
                fromTime={new Date(
                  `${appointment.time_slot_details.from_date}T${appointment.time_slot_details.start_time}`
                ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                toTime={new Date(
                  `${appointment.time_slot_details.from_date}T${appointment.time_slot_details.end_time}`
                ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                onViewDetails={() => window.open(appointment.meeting_link, "_blank")}
                patientImageUrl={appointment?.doctor.profile_picture_url}
              />
            ))
          ) : (
            <p>No appointments found.</p>
          )}
        </div>
      </div>
    </div>
  );
};
