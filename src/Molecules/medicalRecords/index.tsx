



import React from "react";
import doctorDummyImage from "../../Assets/images/header/dummy-dotor-profile.png";
import { DoubleLine, LocationPin } from "../../utils/common/svgIcons";
import "./medicalRecords.scss";

export const MedicalRecord = () => {
  const prescriptionData = [
    {
      doctorImageUrl: doctorDummyImage,
      doctorsName: "Dr. Lana Parker",
      MedicationType: "Cardiology",
      location: "Texas, United States",
    },
    {
        doctorImageUrl: doctorDummyImage,
        doctorsName: "Dr. Lana Parker",
        MedicationType: "Cardiology",
        location: "Texas, United States",
      },{
        doctorImageUrl: doctorDummyImage,
        doctorsName: "Dr. Lana Parker",
        MedicationType: "Cardiology",
        location: "Texas, United States",
      },{
        doctorImageUrl: doctorDummyImage,
        doctorsName: "Dr. Lana Parker",
        MedicationType: "Cardiology",
        location: "Texas, United States",
      },{
        doctorImageUrl: doctorDummyImage,
        doctorsName: "Dr. Lana Parker",
        MedicationType: "Cardiology",
        location: "Texas, United States",
      },
  ];

  return (
    <div className="medical-record-container">
      <h2>Medical Records</h2>
      <div className="record-wrapper">
      {prescriptionData.map((record, index) => (
        <div className="prescription-short-card" key={index}>
          <div className="short-card-wrapper">
            <div className="image-wrapper">
              <img src={record.doctorImageUrl} alt={record.doctorsName} />
            </div>
            <div className="prescription-short-notes">
              <h3>{record.doctorsName}</h3>
              <p>{record.MedicationType}</p>
              <p>
                <LocationPin /> {record.location}
              </p>
            </div>
            <div className="view-prescription-btn">
              <DoubleLine />
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

