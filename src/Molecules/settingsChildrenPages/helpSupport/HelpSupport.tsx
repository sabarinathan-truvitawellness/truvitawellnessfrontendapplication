import React from "react";
import {
  CallSupport,
  LiveChart,
  RightArrow,
  Ticket,
} from "../../../utils/common/svgIcons";
import { AppRoutes } from "../../../routes";
import { Button, Input, ServiceCard } from "../../../Atom";
import Accordion from "../../../Atom/accordian/Accordian";
import "./helpSupport.scss";

export const HelpSupport = () => {
  const cardData = [
    {
      serviceIcon: <CallSupport />,
      rightArrowIcon: <RightArrow />,
      serviceName: "Add Payment Methods",
      to: AppRoutes.doctorConsultation,
    },
    {
      serviceIcon: <LiveChart />,
      rightArrowIcon: <RightArrow />,
      serviceName: "Promotions & Discounts",
      to: AppRoutes.aiBoothConsultation,
    },
    {
      serviceIcon: <Ticket />,
      rightArrowIcon: <RightArrow />,
      serviceName: "Tickets",
      to: AppRoutes.ticketChat,
    },
  ];

  const FAQData = [
    {
      question:
        "Aliquam porta nisl dolor, molestie pellentesque elit molestie in?",
      answer:
        "Aliquam porta nisl dolor. Morbi metus neque, elementum ullamcorper libero nec, tristique vehicula velit.",
    },
    {
      question: "Aliquam pulvinar vestibulum blandit. Donec sed nisl libero?",
      answer:
        "Fusce dignissim luctus sem eu dapibus. Proin eget quam tincidunt, facilisis mauris ac, consequat lacus.",
    },
    {
      question: "Donec sed erat ut magna suscipit mattis?",
      answer:
        "Aliquam erat volutpat. Morbi in orci risus. Donec pretium felis sit amet est condimentum, vel facilisis orci posuere.",
    },
    {
      question: "Aliquam erat volutpat. Morbi in orci risus?",
      answer:
        "Donec pretium felis sit amet est condimentum, vel facilisis orci posuere. Nam tincidunt vehicula sapien.",
    },
    {
      question: "Aliquam porta nisl dolor, molestie pellentesque?",
      answer:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    },
  ];
  return (
    <div className="help-support-container">
      <div className="help-support-wrapper">
        <div className="help-col-1">
          <div className="help-service-cards">
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
          <div className="help-feedback-section">
            <p>Give us a Feedback</p>
            <div className="help-feedback-input">
              <Input
                type="text"
                label="FeedBack"
                placeholder="Share your feedback here"
                name="feedback"
                externalClassName="feedback-input m-0"
              />
              <Button
                buttonText="Submit"
                type="button"
                externalClassName="feedback-btn"
              />
            </div>
          </div>
        </div>
        <div className="help-faq">
          <div className="help-faq-wrapper">
            <Accordion items={FAQData} />
          </div>
        </div>
      </div>
    </div>
  );
};
