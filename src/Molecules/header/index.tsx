import React, { useState } from "react";
import './header.scss';
import { WalletIcon, Notification, Logout } from "../../utils/common/svgIcons"; 
import profileAvatar from '../../Assets/images/header/profile-image-avatar.png';
import { DynamicOverlay } from "../../Atom/overlay";
import { ProfileOverlay } from "../profileOverlay";
import { NotificationOverlay } from "../notificationOverlay";

export const Header = () => {
    const [isProfileOverlayOpen, setIsProfileOverlayOpen] = useState(false);
    const [isNotificationOverlayOpen, setIsNotificationOverlayOpen] = useState(false);

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

    return (
        <div className="header-container">
            {/* Profile Overlay */}
            <DynamicOverlay isOpen={isProfileOverlayOpen} closeOverlay={handleCloseProfileOverlay}>
                <ProfileOverlay />
            </DynamicOverlay>

            {/* Notification Overlay */}
            <DynamicOverlay isOpen={isNotificationOverlayOpen} closeOverlay={handleCloseNotificationOverlay}>
                <NotificationOverlay />
            </DynamicOverlay>

            <div className="header-container-wrapper">
                <div className="column-1">
                    <div className="name-details">
                        <h2>Welcome, Steven!</h2>
                        <p>Patient</p>
                    </div>
                    <div className="calendar-details">
                        <p>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        <p>{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })}</p>
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

                <div className="column-3">
                    <div className="input-wrp">
                        <input type="text" placeholder="Search..." />
                    </div>
                    <div className="notification-icon-wrp" onClick={handleOpenNotificationOverlay}>
                        <Notification />
                    </div>
                    <div className="profile-avatar-wrp" onClick={handleOpenProfileOverlay}>
                        <img src={profileAvatar} alt="profile pic" />
                    </div>
                    <div className="logout-icon-wrp">
                        <Logout />
                    </div>
                </div>
            </div>
        </div>
    );
};
