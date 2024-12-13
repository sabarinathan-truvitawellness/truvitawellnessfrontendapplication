import React, { useState } from "react";
import { Editpen } from "../../../utils/common/svgIcons";
import { MedicalRecord } from "../../medicalRecords";
import "./profile.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import dayjs from "dayjs";
import { ModelOverlay } from "../../../Atom/modelOvrlay";
import { EditPersonalData } from "../../editPersonalData";

export const ProfileSetting = () => {
  const { user, userData } = useSelector((state: RootState) => state.auth);

  const [isModelOpen, setIsModelOpen] = useState(false);

  const calculateAge = (birthDate: string) => {
    const today = dayjs();
    const birthDay = dayjs(birthDate);
    return today.diff(birthDay, "year");
  };

  const editInfo = () => {
    setIsModelOpen(true);
  };

  const closeOverlay = () => {
    setIsModelOpen(false);
  };
  return (
    <>
      <div className="">
        {isModelOpen && (
          <ModelOverlay closeOverlay={closeOverlay}>
          <EditPersonalData/>
          </ModelOverlay>
        )}
      </div>
      <div className="profile-settings-container">
        <div className="profile-setting-wrapper">
          <div className="colum-one">
            <div className="profile-row">
              <div className="img-section">
                <img src={userData.profile_picture_url}></img>
                <div className="img-edit">
                  <Editpen />
                </div>
              </div>
              <div className="profile-info-content">
                <h2>{`${userData.first_name} ${userData.last_name}`}</h2>
                <p>{`${calculateAge(userData.date_of_birth)},${
                  userData.gender
                }`}</p>
                <p>{userData.username}</p>
              </div>
              <div className="profile-edit-option"></div>
            </div>

            <div className="info-section-container">
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
                    <p>{userData.first_name}</p>
                  </div>

                  <div className="info-content">
                    <h3>Last Name</h3>
                    <p>{userData.last_name}</p>
                  </div>
                </div>
                <div className="info-wrapper">
                  <div className="info-content">
                    <h3>Email</h3>
                    <p>{userData.email}</p>
                  </div>

                  <div className="info-content">
                    <h3>Phone</h3>
                    <p>{userData.phone_number}</p>
                  </div>
                </div>
                <div className="info-wrapper">
                  <div className="info-content">
                    <h3>Blood Group</h3>
                    <p>{userData?.blood_group || "Update Blood Group"}</p>
                  </div>

                  <div className="info-content">
                    <h3>Gender</h3>
                    <p>{userData.gender}</p>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <div className="info-wrapper">
                  <div className="info-content">
                    <h3>Country</h3>
                    <p>{userData.country}</p>
                  </div>

                  <div className="info-content">
                    <h3>City/Sate</h3>
                    <p>{userData.state || "Upadate State"}</p>
                  </div>
                </div>
                <div className="info-wrapper">
                  <div className="info-content">
                    <h3>Postal Code</h3>
                    <p>{userData.zipcode}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="colum-two">
            <MedicalRecord />
          </div>
        </div>
      </div>
    </>
  );
};
