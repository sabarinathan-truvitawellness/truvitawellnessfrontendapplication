import React from "react";
import { Button, ServiceCard } from "../../../Atom";
import PricingPlans from "../../pricing";
import './billing.scss'
import { CardPayment, MoneyPayment, OfferPayment, RightArrow, TransactionHistory } from "../../../utils/common/svgIcons";
import { AppRoutes } from "../../../routes";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";

export const BillingPayments = (()=>{

    const { user, userData } = useSelector((state: RootState) => state.auth);
    console.log(userData)

    const cardData = [
        {
            serviceIcon: <CardPayment />,
            rightArrowIcon: <RightArrow />,
            serviceName: "Add Payment Methods",
            to: AppRoutes.doctorConsultation 
        },
        {
            serviceIcon: <OfferPayment />,
            rightArrowIcon: <RightArrow />,
            serviceName: "Promotions & Discounts",
            to: AppRoutes.aiBoothConsultation 
        },
        {
            serviceIcon: < MoneyPayment />,
            rightArrowIcon: <RightArrow />,
            serviceName: "Payment Dues",
            to: AppRoutes.aiDocotor
        },
        {
            serviceIcon: <TransactionHistory />,
            rightArrowIcon: <RightArrow />,
            serviceName: "Transactions History",
            to: AppRoutes.paymentHistory 
        }
    ];
    return(
        <div className="billing-tab-container">
            <div className="billing-tab-warpper">
                <div className="billing-col-1">
                  <div className="subscribe-card">
                      <div className="top-data">
                         <p>{`${userData.first_name} ${userData.last_name}`}</p>
                         <p>10/12</p>
                      </div>
                      <div className="bottom-data">
                        <div className="wallet-section">
                      <p>$43.27</p>
                      <p>Your Wallet Balance</p>
                      </div>
                      <div className="add-fund-btn">
                        <Button buttonText="add-funds"></Button>
                      </div>

                      </div>
                  </div>
                  <div className="payment-services-cards">
                  {cardData.map((card, index) => (
                <ServiceCard 
                    key={index}
                    serviceIcon={card.serviceIcon} 
                    rightArrowIcon={card.rightArrowIcon} 
                    serviceName={card.serviceName} 
                    to={card.to} 
                />
            ))}
                  </div>
                </div>
                <div className="billing-col-2">
                    <PricingPlans/>
                </div>
            </div>
        </div>
    )
})