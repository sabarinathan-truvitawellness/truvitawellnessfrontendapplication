import React from "react";
import "./wellnessPrograme.scss";

export const WellnessProgram = () => {
  return (
    <div className="wellness-program-container">
      <div className="content-section">
        <h1 className="title">Wellness Program</h1>
        <p className="description">
          Start your personalized wellness journey with expert-guided programs tailored to your fitness, nutrition, and mental well-being goals.
        </p>
        <ul className="features-list">
          <li>Personalized Plans</li>
          <li>Expert Guidance</li>
          <li>Community Support</li>
          <li>Holistic Focus</li>
          <li>Progress Tracking</li>
        </ul>
        <button className="join-button">Join Waitlist</button>
      </div>
      <div className="image-section">
        <div className="image-wrapper">
          <div className="image yoga"></div>
          <div className="image runner"></div>
        </div>
      </div>
    </div>
  );
};
