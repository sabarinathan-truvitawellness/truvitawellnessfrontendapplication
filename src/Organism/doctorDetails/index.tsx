import React from "react";
import { CalendarComponent, DoctorCalender } from "../../Atom"; // Ensure the correct path is used
import { AboutDoctor } from "../../Molecules";
import './doctorDetails.scss'
import dummyDoctorStanding from '../../Assets/images/header/doctor-standing-full.png'
import { Link } from "react-router-dom";
import { AppRoutes } from "../../routes";

export const DoctorDetails: React.FC = () => {


  const doctorData = {
    imageUrl: dummyDoctorStanding,
    doctorName: "Dr. John Smith",
    doctorsQualification: "MBBS, MD - General Medicine",
    totalRating: 4.8,
    totalReviews: 125,
    yearsOfExperience: 15,
    hospitalName: "City Hospital",
    location: "New York, NY",
    DoctorsAboutContent:
      "Dr. John Smith is a highly skilled physician with over 15 years of experience in general medicine. He is known for his compassionate care and thorough approach to patient health. Dr. Smith has received numerous accolades for his contributions to the medical field and is dedicated to providing the best possible treatment to his patients.",
  };

  return (
    <div className="doctor-details-container">
      <div className="doctor-details-wrapper">
        <div className="about-dr-section">
          <Link to={AppRoutes.doctorsDetails}>
      <AboutDoctor
      imageUrl={doctorData.imageUrl}
      doctorName={doctorData.doctorName}
      doctorsQualification={doctorData.doctorsQualification}
      totalRating={doctorData.totalRating}
      totalReviews={doctorData.totalReviews}
      yearsOfExperience={doctorData.yearsOfExperience}
      hospitalName={doctorData.hospitalName}
      location={doctorData.location}
      DoctorsAboutContent={doctorData.DoctorsAboutContent}
    />
    </Link>
    </div>
      </div>
    </div>
  );
};
