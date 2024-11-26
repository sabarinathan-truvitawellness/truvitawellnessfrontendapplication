import React from "react";
import { Download, RightArrow } from "../../utils/common/svgIcons";
import "./prescription.scss";
import dummyDoctor from '../../Assets/images/header/dummy-doctor-profile-2.png'
import { Link } from "react-router-dom";
import { AppRoutes } from "../../routes";

export const Prescription = () => {
  const prescriptions = [
    {
      id: 1,
      doctorImage: dummyDoctor,
      doctorName: "Dr. John Doe",
      medicationType: "Anesthesiology",
      medicationDate: "2024-11-20",
    },
    {
      id: 2,
      doctorImage: dummyDoctor,
      doctorName: "Dr. Jane Smith",
      medicationType: "Dermatology",
      medicationDate: "2024-11-15",
    },
    {
      id: 3,
      doctorImage: dummyDoctor,
      doctorName: "Dr. Emily Johnson",
      medicationType: "Family Medicine",
      medicationDate: "2024-11-10",
    },
    {
        id: 4,
        doctorImage: dummyDoctor,
        doctorName: "Dr. Emily Johnson",
        medicationType: "Emergency Medicine",
        medicationDate: "2024-11-10",
      },
  ];

  return (
    <div className="prescription-container">
      {prescriptions.map((prescription) => (
        <Link to={AppRoutes.prescriptionOverView}>
        <div className="prescription-wrapper" key={prescription.id}>
          <div className="doctor-image">
            <img src={prescription.doctorImage} alt="Doctor" />
          </div>
          <div className="doctor-name">
            <p>{prescription.doctorName}</p>
          </div>
          <div className="medication-type">
            <p>{prescription.medicationType}</p>
          </div>
          <div className="medication-date">
            <p>{prescription.medicationDate}</p>
          </div>
          <div className="download-icon">
            <Download />
          </div>
          <div className="right-arrow">
            <RightArrow />
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
};
