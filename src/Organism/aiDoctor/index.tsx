import React from "react";
import aiCenterImage from "../../Assets/images/header/ai-specification.png";
import { Button } from "../../Atom";
import './aiDoctor.scss';

export const AiDoctor = () => {
  return (
    <div className="ai-doctor-container">
      <div className="ai-dotor-wrapper">
        <div className="title-bar">
          <div className="ai-doctor-title">
            Meet Our <span>AI Doctor</span>
          </div>
        </div>

        <div className="specification-channels">
            <div className="specification-channel-wrapper">
          <div className="spec-list-left">
            <div className="list">Instant Health advice</div>
            <div className="list">Personalized Health Advice </div>
            <div className="list">24/7 Virtual Monitoring</div>
          </div>
          <div className="ai-center-img">
            <img src={aiCenterImage} />
            <div className="waitlist-btn">
            <Button buttonText="Join Waitlist" externalClassName="join-btn"/>
        </div>
          </div>
          <div className="spec-list-right">
            <div className="list">Symptom Checker</div>
            <div className="list">Medication Reminder</div>
            <div className="list">Smart Analytics & Insights</div>
          </div>
          
          </div>
          
         
        </div>
       
      </div>
    </div>
  );
};
