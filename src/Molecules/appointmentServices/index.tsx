import React from "react";
import { InlineServiceCard } from "../../Atom";
import { RightArrow, AiBooth, AiDoctor, WellnessProgram,Appointment } from "../../utils/common/svgIcons";
import { AppRoutes } from "../../routes"; 
import './appointmentServices.scss';
// import { Appointments } from "../../Organism";

export const AppointmentServices = () => {
    const cardData = [
        {
            serviceIcon: <Appointment />,
            rightArrowIcon: <RightArrow />,
            serviceName: "Doctor Consultation",
            to: AppRoutes.doctorConsultation 
        },
        {
            serviceIcon: <AiDoctor />,
            rightArrowIcon: <RightArrow />,
            serviceName: "AI Booth Consultation",
            to: AppRoutes.aiBoothConsultation 
        },
        {
            serviceIcon: <AiBooth />,
            rightArrowIcon: <RightArrow />,
            serviceName: "AI Doctor Consultation",
            to: AppRoutes.aiDocotor
        },
        
    ];

    return (
        <div className="services-container">
            {cardData.map((card, index) => (
                <InlineServiceCard 
                    key={index}
                    serviceIcon={card.serviceIcon} 
                    rightArrowIcon={card.rightArrowIcon} 
                    serviceName={card.serviceName} 
                    to={card.to} 
                />
            ))}
        </div>
    );
};
