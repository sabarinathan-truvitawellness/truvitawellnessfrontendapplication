import React from "react";
import { CalendarComponent, DoctorCalender } from "../../Atom"; // Ensure the correct path is used
import { AboutDoctor } from "../../Molecules";
import "./doctorDetails.scss";
import dummyDoctorStanding from "../../Assets/images/header/doctor-standing-full.png";
import { Link, useParams } from "react-router-dom";
import { AppRoutes } from "../../routes";
import { useGetDocotorDetailsQuery } from "../../redux/services";

export const DoctorDetails: React.FC = () => {
  const { doctorId } = useParams();


console.log(typeof(doctorId))
  return (
    <div className="doctor-details-container">
      <div className="doctor-details-wrapper">
        <div className="about-dr-section">
        <AboutDoctor doctorId={doctorId} />
        </div>
      </div>
    </div>
  );
};
