import React from "react";
import { LocationPin, Star } from "../../utils/common/svgIcons";
import "./aboutDoctor.scss"
import { DoctorCalender } from "../../Atom";

interface AboutDoctorProps {
  imageUrl: string;
  doctorName: string;
  doctorsQualification: string;
  totalRating: number;
  totalReviews: number;
  yearsOfExperience: number;
  hospitalName: string;
  location: string;
  DoctorsAboutContent: string;
}

export const AboutDoctor: React.FC<AboutDoctorProps> = ({
  imageUrl,
  doctorName,
  doctorsQualification,
  totalRating,
  totalReviews,
  yearsOfExperience,
  hospitalName,
  location,
  DoctorsAboutContent,
}) => {

    const slotsData = [
        {
          date: "2024-11-19",
          slots: [
            { time: "06:00 PM", available: true },
            { time: "06:15 PM", available: false },
            { time: "06:30 PM", available: true },
          ],
        },
        {
          date: "2024-11-20",
          slots: [
            { time: "06:00 PM", available: true },
            { time: "06:15 PM", available: true },
          ],
        },
        // Add more dates as needed
      ];
  return (
    <div className="about-doctor-container">
      <div className="about-doctor-wrapper">
        <div className="about-col-1">
      
            <img src={imageUrl} alt={`${doctorName}`} />
     
          <div className="doctor-fees-section">
            <div className="doctor-detail-wrapper">
              <p>
                {doctorName} <span>{doctorsQualification}</span>
              </p>
            </div>
            <div className="rating-content">
              <div className="rating-starts-wrapper">
                <Star />
                {totalRating}
              </div>
              <p>
                {`${totalReviews} Reviews |`}{" "}
                <span>{`${yearsOfExperience} years experience`}</span>{" "}
                <span>
                  <LocationPin /> {`${hospitalName}, ${location}`}
                </span>
              </p>
            </div>
            <div className="about-doc-content">
              <p>{DoctorsAboutContent}</p>
            </div>
            <div className="horizontal-line"></div>
            <div className="doctor-slot-section">
        <DoctorCalender slotsData={slotsData} />
        </div>
          </div>
        </div>
       
      </div>
    </div>
  );
};
