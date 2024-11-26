import React from "react";
import { Add, OnlyPhone, SendMeesgae, Video } from "../../utils/common/svgIcons";
import { Input } from "../../Atom";
import { Link } from "react-router-dom";
import "./inbox.scss";
import doctorBummy from '../../Assets/images/header/dummy-doctor-profile-2.png'

export const Inbox = () => {
  const membersList = [
    {
      memberId: 1,
      doctorImageUrl: doctorBummy,
      doctorName: "Dr. John Doe",
      LastMessage: "See you at 5 PM",
      unreadMessageCount: "3",
      doctorSpeciality: "Cardiologist",
    },
    {
      memberId: 2,
      doctorImageUrl: doctorBummy,
      doctorName: "Dr. Jane Smith",
      LastMessage: "Can you confirm your symptoms?",
      unreadMessageCount: "1",
      doctorSpeciality: "Pediatrician",
    },
  ];

  const conversation = [
    {
      messageId: "1",
      conversationTimeDate: "2024-11-22 10:30 AM",
      conversationMemberId: 1,
      message: "Hi, how are you feeling today?",
    },
    {
      messageId: "2",
      conversationTimeDate: "2024-11-22 10:32 AM",
      conversationMemberId: 1,
      message: "I’m feeling better, thank you!",
    },
    {
      messageId: "3",
      conversationTimeDate: "2024-11-22 10:35 AM",
      conversationMemberId: 1,
      message: "Great, let’s continue with the medication.",
    },
  ];

  return (
    <div className="inbox-container">
      <div className="inbox-wrapper">
        {/* Member List Section */}
        <div className="inbox-member-list">
          <div className="inbox-list-wrapper">
            {membersList.map((res) => (
              <div className="inbox-list-card" key={res.memberId}>
                <img src={res.doctorImageUrl} alt="Doctor" />
                <div className="inbox-info">
                  <h4>{res.doctorName}</h4>
                  <p>{res.LastMessage}</p>
                </div>
                {res.unreadMessageCount && (
                  <div className="unviewed-count">
                    <p>{res.unreadMessageCount}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Message Viewer Section */}
        <div className="message-viewer">
          <div className="message-viewer-wrapper">
            <div className="message-viewer-header">
              <img src={membersList[0].doctorImageUrl} alt="Doctor" />
              <div className="doctor-info">
                <h3>{membersList[0].doctorName}</h3>
                <p>{membersList[0].doctorSpeciality}</p>
              </div>
              <div className="icon-wrapper">
                <div className="call-icon">
                  <OnlyPhone />
                </div>
                <div className="video-icon">
                  <Video />
                </div>
              </div>
            </div>
            <div className="conversation-section">
              <div className="conversation-wrapper">
                {conversation.map((msg) => (
                  <div className="message-card" key={msg.messageId}>
                    <p className="message-time">{msg.conversationTimeDate}</p>
                    <p className="message-text">{msg.message}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="message-viewer-footer">
              <div className="input-wrapper">
                <Input placeholder="Type a message" />
              </div>
              <div className="add-btns">
                <div className="add-file-btn">
                  <Add />
                </div>
                <div className="send-message-btn"><SendMeesgae/></div>
              </div>
            </div>
          </div>
        </div>

        {/* Member Profile Section */}
        <div className="messaging-member-profile">
          <div className="member-profile-wrapper">
            <img src={membersList[0].doctorImageUrl} alt="Doctor" />
            <div className="doctor-details">
              <p>{membersList[0].doctorName}</p>
              <p>{membersList[0].doctorSpeciality}</p>
            </div>
            <div className="actions">
              <Link to="#">Book Appointment</Link>
              <Link to="#">View Schedule</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
