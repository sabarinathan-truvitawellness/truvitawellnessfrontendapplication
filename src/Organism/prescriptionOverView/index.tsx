import React from "react";
import { Button } from "../../Atom";
import pxLogo from "../../Assets/images/header/px-prescription.png";
import truvitaLogo from "../../Assets/images/home/truvita-logo.png";
import './prescriptionOverView.scss'

export const PreacriptionOverView = () => {
  const prescriptionData = [
    {
      id: "1",
      medicineName: "Dolo 650",
      dosage: "Daily: 0-1-1",
      instructions: "3 days; after meals",
    },
  ];
  const docotorAdvice = [
    "Lorem ipsum dolor sit amet.",
    "Lorem ipsum dolor sit amet.",
    "Lorem ipsum dolor sit amet.",
  ];

  return (
    <div className="view-prescription-container">
      <div className="view-prescription-wrapper">
        <div className="download-btn-wrapper">
          <Button
            buttonText="Download Prescription"
            externalClassName="download-btn"
          />
        </div>

        <div className="prescription-overview-container">
          <div className="prescription-overview-header">
            <div className="doctor-personal-info">
              <img src={pxLogo} />
              <ul>
                <li className="doctor-name">Dr.Bright</li>
                <li className="doctor-info">MBBS - General Medicine</li>
                <li className="doctor-reg-id">KMY - 134566</li>
                <li className="doctor-rx-id">839283920</li>
              </ul>
            </div>

            <div className="truvita-logo">
  <img src={truvitaLogo} alt="" />
</div>
          </div>

          <div className="prescription-patient-info">
            <div className="patient-info-col-1">
              <ul>
                <li>Name:Johan Bride</li>
                <li>Age: 23 Age</li>
                <li>Gender: Male</li>
                <li>Height: 180cm</li>
                <li>weight: 65Kgs</li>
              </ul>
            </div>
            <div className="patient-info-col-2">
              <ul>
                <li>Date: 18-05-2024</li>
                <li>Patient Id:1982199</li>
              </ul>
            </div>
          </div>

          <div className="horizontal-line"></div>

          <div className="diagnosis-summery">
            <h5>Diagnosis</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
              deserunt alias perferendis sint explicabo.
            </p>
          </div>
          <div className="description-summery">
            <h5>Description</h5>
            <p>Lorem ipsum dolor sit.</p>
          </div>

          <div className="medication-list">
            <table>
              <tr>
                <th>S.No</th>
                <th>Prescribed Medicines</th>
                <th>Dosage</th>
                <th>Instructions</th>
              </tr>

              {prescriptionData.map((res) => {
                return (
                  <tr>
                    <td>{res.id}</td>
                    <td>{res.medicineName}</td>
                    <td>{res.dosage}</td>
                    <td>{res.instructions}</td>
                  </tr>
                );
              })}
            </table>
          </div>

          <div className="drug-allergies">
            <h5>Drug Allergies</h5>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
          </div>
          <div className="medicine-follow-up">
            <h5>Folllow Up</h5>
            <p>1 Month</p>
          </div>
          <div className="doctors-advice">
            <p>Doctor Advice</p>
            <ol>
              {docotorAdvice.map((res) => {
                return <li>{res}</li>;
              })}
            </ol>
          </div>

          <div className="docotr-signature">
            <ul>
                <li>Dr.Bright</li>
                <li>MBBS - General Medicine</li>
                <li>www.truvitawellness.com</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
