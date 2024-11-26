import React from "react";
import profileAvatar from "../../../Assets/images/header/profile-avatar-xxl.png";
import { Editpen } from "../../../utils/common/svgIcons";
import { MedicalRecord } from "../../medicalRecords";
import './profile.scss';
import { useProfileDataQuery } from "../../../redux/services/profile";


export const ProfileSetting = () => {
  const { data, error, isLoading } = useProfileDataQuery({ userId: 17 });
  console.log(data)
  const editInfo = () => {};
  return (
    <div className="profile-settings-container">
      <div className="profile-setting-wrapper">
        <div className="colum-one">
          <div className="profile-row">
            <div className="img-section">
              <img src={profileAvatar}></img>
              <div className="img-edit"><Editpen /></div>
            </div>
            <div className="profile-info-content">
              <h2>Steven Gerald</h2>
              <p>21, Male</p>
              <p>@steve_grld347</p>
            </div>
            <div className="profile-edit-option"></div>
          </div>

          <div className="info-section">
            <div className="sub-title-section">
              {" "}
              <h2>Personal Information</h2>{" "}
              <div className="edit-info-btn" onClick={editInfo}>
                Edit <Editpen />
              </div>
            </div>

            <div className="info-wrapper">
              <div className="info-content">
                <h3>First Name</h3>
                <p>Steven</p>
              </div>

              <div className="info-content">
                <h3>Last Name</h3>
                <p>Gerald</p>
              </div>
            </div>
            <div className="info-wrapper">
              <div className="info-content">
                <h3>Email</h3>
                <p>stephen@gamil.com</p>
              </div>

              <div className="info-content">
                <h3>Phone</h3>
                <p>+31 345 346 46</p>
              </div>
            </div>
            <div className="info-wrapper">
              <div className="info-content">
                <h3>Blood Group</h3>
                <p>o+</p>
              </div>

              <div className="info-content">
                <h3>Gender</h3>
                <p>Male</p>
              </div>
            </div>
          </div>

          <div className="info-section">
            <div className="sub-title-section">
              {" "}
              <h2>Address</h2>{" "}
              <div className="edit-info-btn" onClick={editInfo}>
                Edit <Editpen />
              </div>
            </div>

            <div className="info-wrapper">
              <div className="info-content">
                <h3>Country</h3>
                <p>United States</p>
              </div>

              <div className="info-content">
                <h3>City/Sate</h3>
                <p>Leeds, East London</p>
              </div>
            </div>
            <div className="info-wrapper">
              <div className="info-content">
                <h3>Postal Code</h3>
                <p>ERT 2356</p>
              </div>
            </div>
          </div>
        </div>
        <div className="colum-two">
            <MedicalRecord/>
        </div>
      </div>
    </div>
  );
};




