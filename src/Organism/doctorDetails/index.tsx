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

  const { data: doctorDetails } = useGetDocotorDetailsQuery(doctorId);
  console.log("param", doctorDetails?.profile_picture_url);

  return (
    <div className="doctor-details-container">
      <div className="doctor-details-wrapper">
        <div className="about-dr-section">
          <AboutDoctor
            imageUrl={doctorDetails?.profile_picture_url}
            doctorName={doctorDetails?.doctor_name}
            yearsOfExperience={doctorDetails?.doctor_experience}
            DoctorsAboutContent={doctorDetails?.bio}
            availableDates={doctorDetails?.dates}
          />
        </div>
      </div>
    </div>
  );
};
