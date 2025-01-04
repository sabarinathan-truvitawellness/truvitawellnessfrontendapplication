import React from "react";
import "./wellnessCardSection.scss";
import { Cycling, RightArrow, Running, Swimming } from "../../utils/common/svgIcons";
import { AppRoutes } from "../../routes";
import { Link } from "react-router-dom";

export const WellnessCardsSection = () => {
  const dummyData = [
    { time: "06:30 AM", activityType: "Running", icon: <Running/> },
    { time: "07:00 AM", activityType: "Swimming", icon: <Swimming/> },
    { time: "08:00 AM", activityType: "Cycling", icon: <Cycling/> },
  ];

  return (
    <div className="wellness-card-section-container">
      <div className="wellness-card-section-wapper">
        {dummyData.map((item, index) => (
          <div key={index} className="wcard-container">
            <div className="wcard-wrapper">
              <div className="icon-section">
                {item.icon}
              </div>
              <div className="activity-timing">
                <p>{item.time}</p>
                <p>{item.activityType}</p>
              </div>
            </div>
          </div>
        ))}

        <div  className="spl-wcard-container">
            <Link to={AppRoutes.wellnessPrograme}>
            <div className="spl-wcard-wrapper">
              <h2>Explore Wellness <RightArrow/></h2>
            </div>
            </Link>
          </div>
      </div>
    </div>
  );
};
