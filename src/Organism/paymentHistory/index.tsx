import React from "react";
import { Download } from "../../utils/common/svgIcons";
import { Button } from "../../Atom";
import "./paymentHistory.scss";

export const PaymentHistory: React.FC = () => {
  // Dummy data defined directly inside the component
  const paymentData = [
    {
      paymentType: "Credit Card",
      paymentId: "TXN123456789",
      paymentDate: "2024-11-01",
      amount: "$250.00",
      paymentCompletionDate: "5",
    },
    {
      paymentType: "UPI",
      paymentId: "TXN987654321",
      paymentDate: "2024-11-15",
      amount: "$500.00",
      paymentCompletionDate: "2",
    },
    {
      paymentType: "Net Banking",
      paymentId: "TXN112233445",
      paymentDate: "2024-11-10",
      amount: "$1,000.00",
      paymentCompletionDate: "10",
    },
  ];

  return (
    <div className="payment-history-container">
        <h2>Payment History</h2>
      {paymentData.map((payment, index) => (
        <div key={index} className="payment-history-wrapper">
          {/* Payment Card */}
          <div className="payment-type">
            <p className="payment-type-label">Payment Type</p>
            <p className="payment-type-value">{payment.paymentType}</p>
          </div>
          <div className="payment-id">
            <p className="payment-id-label">Payment ID</p>
            <p className="payment-id-value">{payment.paymentId}</p>
          </div>
          <div className="payment-date">
          <p className="payment-date-label">Date of Information</p>
            <p className="payment-date-value">{payment.paymentDate}</p>
          </div>
          <div className="payment-amount">
            <p className="payment-amount-label">Amount</p>
            <p className="payment-amount-value">{payment.amount}</p>
          </div>
          <div className="payment-completed">
            <p className="payment-completed-label">Payment Completed on</p>
            <p className="payment-completed-value">
              {payment.paymentCompletionDate} days ago
            </p>
          </div>
          <div className="payment-download">
            <Download />
          </div>
          <div className="payment-view-btn">
            <Button buttonText="View Details" />
          </div>
        </div>
      ))}
    </div>
  );
};
