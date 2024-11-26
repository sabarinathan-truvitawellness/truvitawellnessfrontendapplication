import React from "react";
import { ServiceCard } from "../../Atom";
import { RightArrow, Doctor, AiBooth, AiDoctor, WellnessProgram } from "../../utils/common/svgIcons";
import { AppRoutes } from "../../routes"; 
import './services.scss';

export const Services = () => {
    const cardData = [
        {
            serviceIcon: <Doctor />,
            rightArrowIcon: <RightArrow />,
            serviceName: "Doctor Consultation",
            to: AppRoutes.doctorConsultation // Define the path for the service
        },
        {
            serviceIcon: <AiBooth />,
            rightArrowIcon: <RightArrow />,
            serviceName: "AI Booth Consultation",
            to: AppRoutes.aiBoothConsultation // Define the path for the service
        },
        {
            serviceIcon: <AiDoctor />,
            rightArrowIcon: <RightArrow />,
            serviceName: "AI Doctor Consultation",
            to: AppRoutes.aiDocotor // Define the path for the service
        },
        {
            serviceIcon: <WellnessProgram />,
            rightArrowIcon: <RightArrow />,
            serviceName: "Wellness Program",
            to: AppRoutes.wellNesProgram // Define the path for the service
        }
    ];

    return (
        <div className="services-container">
            {cardData.map((card, index) => (
                <ServiceCard 
                    key={index}
                    serviceIcon={card.serviceIcon} 
                    rightArrowIcon={card.rightArrowIcon} 
                    serviceName={card.serviceName} 
                    to={card.to} // Pass the link destination
                />
            ))}
        </div>
    );
};
