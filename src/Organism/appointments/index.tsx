import React from "react";
import { AppointmentServices, Services } from "../../Molecules";
import { AppointmentListCard } from "../../Atom";

export const Appointments = () => {
  return (
    <div className="appointment-page-container">
      <div className="appointment-page-wrapper">
        <div className="appointment-service-section">
          <AppointmentServices />
          <AppointmentListCard
            consultation="Doctor Consultation"
            location="Texas, United States"
            doctorName="Dr. Smith"
            specialization="Cardiologist"
            startTime={"3"}
            fromTime="10:00 AM"
            toTime="11:00 AM"
            onViewDetails={() => console.log("Viewing details")}
          />
          <AppointmentListCard
            consultation="Doctor Consultation"
            location="Texas, United States"
            doctorName="Dr. Smith"
            specialization="Cardiologist"
            startTime={"3"}
            fromTime="10:00 AM"
            toTime="11:00 AM"
            onViewDetails={() => console.log("Viewing details")}
          />
          <AppointmentListCard
            consultation="Doctor Consultation"
            location="Texas, United States"
            doctorName="Dr. Smith"
            specialization="Cardiologist"
            startTime={"3"}
            fromTime="10:00 AM"
            toTime="11:00 AM"
            onViewDetails={() => console.log("Viewing details")}
          />
        </div>
      </div>
    </div>
  );
};
