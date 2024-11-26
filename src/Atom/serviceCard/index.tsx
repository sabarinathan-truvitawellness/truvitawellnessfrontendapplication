import React from "react";
import { Link } from "react-router-dom"; // Import Link
import './serviceCard.scss';

interface InputProps {
    serviceIcon: React.ReactNode;    
    rightArrowIcon: React.ReactNode; 
    serviceName: string;   
    to: string; // Add a prop for the link destination
}

export const ServiceCard: React.FC<InputProps> = ({ serviceIcon, rightArrowIcon, serviceName, to }) => {
    return (
        <Link to={to} className="service-card-container"> {/* Use Link to wrap the component */}
            <div className="template-wrapper">
                <div className="row-1">
                    <div>
                        {serviceIcon}
                    </div>
                    <div>
                        {rightArrowIcon}
                    </div>
                </div>
                <div className="row-2">
                    <p>{serviceName}</p>
                </div>
            </div>
        </Link>
    );
};
