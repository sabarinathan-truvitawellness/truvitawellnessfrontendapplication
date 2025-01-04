import React, { useEffect, useState } from "react";
import "./header.scss";
import { WalletIcon, Notification, Logout } from "../../utils/common/svgIcons";
import profileAvatar from "../../Assets/images/header/profile-image-avatar.png";
import { DynamicOverlay } from "../../Atom/overlay";
import { ProfileOverlay } from "../profileOverlay";
import { NotificationOverlay } from "../notificationOverlay";
import { useProfileDataQuery } from "../../redux/services";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setUserData } from "../../redux/slices/auth";
import { RootState } from "../../redux";
import { Modal, notification } from "antd";
import { LocalStorageKeys } from "../../utils/common/constant";

export const Header = () => {
  const [isProfileOverlayOpen, setIsProfileOverlayOpen] = useState(false);
  const [isNotificationOverlayOpen, setIsNotificationOverlayOpen] =
    useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const dispatch = useDispatch();

  const userId = localStorage.getItem("userId");
  //getting the data from, rtk query
  const { data } = useProfileDataQuery({ userId: userId });
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (data) {
      console.log("Profile Data:", data);
      dispatch(setUserData({ userData: data }));
    }
  }, [data]);

  const { user, userData } = useSelector((state: RootState) => state.auth);
  console.log("headr", user);

  const handleOpenProfileOverlay = () => {
    setIsProfileOverlayOpen(true);
  };

  const handleCloseProfileOverlay = () => {
    setIsProfileOverlayOpen(false);
  };

  const handleOpenNotificationOverlay = () => {
    setIsNotificationOverlayOpen(true);
  };

  const handleCloseNotificationOverlay = () => {
    setIsNotificationOverlayOpen(false);
  };

  const handleOpenLogoutModal = () => {
    setIsLogoutModalVisible(true);
  };

  const handleCancelLogout = () => {
    setIsLogoutModalVisible(false);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalVisible(false);

    notification.success({
      message: "Logged Out",
      description: "You have been successfully logged out.",
      placement: "topRight",
    });

    localStorage.removeItem(LocalStorageKeys.authToken);
    window.location.href = "/login"; // Replace with your login route
  };

  return (
    <div className="header-container">
      {/* Profile Overlay */}
      <DynamicOverlay
        isOpen={isProfileOverlayOpen}
        closeOverlay={handleCloseProfileOverlay}
      >
        <ProfileOverlay profileData={userData} />
      </DynamicOverlay>

      {/* Notification Overlay */}
      <DynamicOverlay
        isOpen={isNotificationOverlayOpen}
        closeOverlay={handleCloseNotificationOverlay}
      >
        <NotificationOverlay />
      </DynamicOverlay>

      {/* Logout Confirmation Modal */}
      <Modal
        title="Confirm Logout"
        visible={isLogoutModalVisible}
        onOk={handleConfirmLogout}
        onCancel={handleCancelLogout}
        okText="Logout"
        cancelText="Cancel"
      >
        <p>Are you sure you want to log out?</p>
      </Modal>

      <div className="header-container-wrapper">
        <div className="header-col-1-wrapper">
          <div className="column-1">
            <div className="name-details">
              <h2>
                Welcome,{" "}
                {`${userData?.first_name || ""} ${userData?.last_name || ""}!`}
              </h2>
              <p>{role}</p>
            </div>
            <div className="calendar-details">
              <p>
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p>
                {new Date().toLocaleDateString("en-GB", {
                  weekday: "long",
                  day: "numeric",
                  month: "short",
                })}
              </p>
            </div>
          </div>

          <div className="column-2">
            <div className="icon-wrp">
              <WalletIcon />
            </div>
            <div className="wallet-content-wrp">
              <h2>43.77$</h2>
              <p>Wallet Balance</p>
            </div>
          </div>
        </div>

        <div className="header-col-2-wrapper">
          <div className="column-3">
            <div className="input-wrp">
              <input type="text" placeholder="Search..." />
            </div>
            <div className="imp-btn-wrapper">
              <div
                className="notification-icon-wrp"
                onClick={handleOpenNotificationOverlay}
              >
                <Notification />
              </div>
              <div
                className="profile-avatar-wrp"
                onClick={handleOpenProfileOverlay}
              >
                <img
                  src={
                    userData?.profile_picture_url ||
                    "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?semt=ais_hybrid"
                  }
                  alt="profile pic"
                />
              </div>
              <div className="logout-icon-wrp" onClick={handleOpenLogoutModal}>
                <Logout />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
