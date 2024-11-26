import React from "react";
import { Link } from "react-router-dom";
import "./inlineServiceCard.scss";

interface InputProps {
  serviceIcon: React.ReactNode;
  rightArrowIcon: React.ReactNode;
  serviceName: string;
  to: string;
}

export const InlineServiceCard: React.FC<InputProps> = ({
  serviceIcon,
  rightArrowIcon,
  serviceName,
  to,
}) => {
  return (
    <Link to={to} className="inline-service-card-container">
      <div className="template-wrapper">
        <div className="row-1">
          <div>{serviceIcon}</div>
          <div className="">
            <p>{serviceName}</p>
          </div>
            
          <div>{rightArrowIcon}</div>
        </div>
      </div>
    </Link>
  );
};
