import React from "react";
import './pricingCard.scss';

interface PlanCardProps {
  title?: string;
  price?: string;
  features: string[];
  isPremium?: boolean;
  buttonText?:string;
  offerPrice?:string;
}

export const PlanCard: React.FC<PlanCardProps> = ({ title, price, features, isPremium,buttonText,offerPrice }) => {
  return (
    <div className={`plan-card ${isPremium ? 'premium' : ''}`}>
      <div className="plan-card-title-section">
        <h3>{title ? title : ""}</h3>
        {price && (
          <p>
        <span className="offer-price">{offerPrice ? offerPrice : ""}</span> {price ? price : ""} <span>/ mo</span>
          </p>
        )}
      </div>
      <ul>
        {features.map((feature, index) => (
          <li key={index}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
                  fill="#0FC0ED"
                />
              </svg>
            </span>
            {feature}
          </li>
        ))}
      </ul>

 {
  buttonText &&   <button>
  {buttonText}
 </button>
 }
      

    </div>
  );
};

