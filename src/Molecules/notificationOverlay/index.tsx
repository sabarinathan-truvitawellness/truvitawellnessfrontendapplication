import React, { useState } from "react";
import './notificationOverlay.scss';
import { Button } from "../../Atom";
import { Pill, BlueInbox, Appointment } from "../../utils/common/svgIcons";

export const NotificationOverlay = () => {
    const [activeBtn, setActiveBtn] = useState(0);

    const handleBtnClick = (id:number) => {
        setActiveBtn(id);
    };

    return (
        <div className="notification-overlay-container">
            <div className="notification-overlay-wrapper">
                <div className="overlay-title">
                    <h3>Notifications</h3>
                </div>
                <div className="filter-btns-wrapper">
                    {["All", "Appointments", "Pill Reminder", "Chats"].map((label, index) => (
                        <Button 
                            key={index} 
                            onClick={() => handleBtnClick(index)} 
                            buttonText={label} 
                            externalClassName={`filter-btn ${activeBtn === index ? "active" : ""}`}
                        />
                    ))}
                </div>

                <div className="notification-render-section">
                    {/* Filter notifications based on active button */}
                    {activeBtn === 0 || activeBtn === 2 ? (
                        <div className="notify-section">
                            <div className="logo-wrapper">
                            <Pill />
                            </div>
                            <div className="notify-content">
                                <h4>Pill Reminder: Time to take your medication!</h4>
                                <p>Time to take your medication! Remember to take it on time.</p>
                            </div>
                            <div className="notify-timing">
                                <p>15 min ago</p>
                                <div className="notify-count">2</div>
                            </div>
                        </div>
                    ) : null}

                    {activeBtn === 0 || activeBtn === 1 ? (
                        <div className="notify-section">
                             <div className="logo-wrapper">
                            <Appointment />
                            </div>
                            <div className="notify-content">
                                <h4>Appointment Reminder</h4>
                                <p>Upcoming appointment with Dr. Smith on Nov 7</p>
                            </div>
                            <div className="notify-timing">
                                <p>10:17</p>
                                <div className="notify-count">2</div>
                            </div>
                        </div>
                    ) : null}

                    {activeBtn === 0 || activeBtn === 3 ? (
                        <div className="notify-section">
                             <div className="logo-wrapper">
                            <BlueInbox color={"#0FC0ED"} />
                            </div>
                            <div className="notify-content">
                                <h4>Inbox: Unread Messages</h4>
                                <p>You have 4 unread messages from 2 chats</p>
                            </div>
                            <div className="notify-timing">
                                <p>45 min ago</p>
                                <div className="notify-count">4</div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};
