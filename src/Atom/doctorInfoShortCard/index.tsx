import React from "react";
import { LocationPin, Star } from "../../utils/common/svgIcons";
import './doctorInfoShortCard.scss';

interface DoctorInfoShortCardProps {
  doctorsName: string;
  medicalSpecialization: string;
  experience: number;
  hospitalName: string;
  location: string;
  totalRating: number;
  totalReviews: number;
  timeSlots: { time: string }[];
  imageUrl:string
  doctorCosting:string
}

export const DoctorInfoShortCard: React.FC<DoctorInfoShortCardProps> = ({
  doctorsName,
  medicalSpecialization,
  experience,
  hospitalName,
  location,
  totalRating,
  totalReviews,
  timeSlots,
  imageUrl,
  doctorCosting
}) => {
  return (
    <div className="short-card-container">
      <div className="short-card-wrapper">
        <div className="card-col-1">
          <img src={imageUrl} alt={`${doctorsName} profile`} />
        </div>
        <div className="card-col-2">
            <div className="doctors-content">
          <h2>{doctorsName}</h2>
          <p>
            {medicalSpecialization} <span>|</span> {`${experience} yrs experience`}
          </p>
          <p>
            <LocationPin /> {`${hospitalName}, ${location}`}
          </p>
          <div className="rating-content">
            <div className="rating-starts-wrapper">
              <Star />
              {totalRating}
            </div>
            <p>{`${totalReviews} Reviews`}</p>
          </div>

          <div className="doctors-time-slot">
            {timeSlots?.map((slot, index) => (
              <div key={index} className="slots-list">
                {slot.time}
              </div>
            ))}
          </div>
          </div>
          <div className="doctor-costing">
              <p> ${doctorCosting}</p>
            </div>
        </div>
       
      </div>
    </div>
  );
};
