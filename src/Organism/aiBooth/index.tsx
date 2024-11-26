import React from "react";
import { Button } from "../../Atom";
import aiBoothSpecification from '../../Assets/images/header/ai-booth-specification.png';
import './aiBooth.scss'

export const AiBooth = () => {
  return (
    <div className="ai-booth-container">
      <div className="ai-booth-wrapper">
        <div className="title-bar">
          <p className="ai-title">Introducing</p>
          <h2>AI Booth</h2>
        </div>

        <div className="specification-channels">
          <div className="specification-channel-wrapper">
            <div className="spec-list-left">
              <div className="list">Instant Health advice</div>
              <div className="list">Personalized Health Advice  </div>
              <div className="list">24/7 Virtual Monitoring</div>
            </div>
            <div className="ai-center-img">
              <img src={aiBoothSpecification} />
              <div className="waitlist-btn">
                <Button
                  buttonText="Join Waitlist"
                  externalClassName="join-btn"
                />
              </div>
            </div>
            <div className="spec-list-right">
              <div className="list">Symptom Checker</div>
              <div className="list">Smart Analytics & Insights</div>
              <div className="list">Medication Reminder</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
