import React, { useState } from 'react';
import './accordian.scss';

type FAQItem = {
  question: string;
  answer: string;
};

interface AccordionProps {
  items: FAQItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
    <h2>Frequently Asked Questions</h2>
    <ul className="faq-list">
      {items.map((item, index) => (
        <li key={index} className="faq-item">
          <button
            className="faq-button"
            onClick={() => toggleAccordion(index)}
          >
            <span className="faq-question">{index + 1}. {item.question}</span>
            <span className="faq-icon">{openIndex === index ? '▲' : '▼'}</span>
          </button>
          {openIndex === index && (
            <div className="faq-answer">
              {item.answer}
            </div>
          )}
        </li>
      ))}
    </ul>
  </div>
  );
};

export default Accordion;
