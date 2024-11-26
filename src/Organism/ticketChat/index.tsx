import React, { useState } from "react";
import { Button } from "../../Atom";
import "./ticketChat.scss";
import { Link } from "react-router-dom";

interface Ticket {
  id: number;
  ticketId: string;
  issueType: string;
  ticketCreatedDate: string;
  ticketState: string;
  ticketAssignedFrom: string;
  ticketCreatorName: string;
  userInitialATR: string;
}

export const TicketChat: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const ticketList: Ticket[] = [
    {
      id: 1,
      ticketId: "TCK12345",
      issueType: "Login Issue",
      ticketCreatedDate: "2024-11-01",
      ticketState: "Open",
      ticketAssignedFrom: "3 hours ago",
      ticketCreatorName: "John Doe",
      userInitialATR: "JD",
    },
    {
      id: 2,
      ticketId: "TCK67890",
      issueType: "Payment Error",
      ticketCreatedDate: "2024-11-10",
      ticketState: "Closed",
      ticketAssignedFrom: "1 day ago",
      ticketCreatorName: "Jane Smith",
      userInitialATR: "JS",
    },
    {
        id: 3,
        ticketId: "TCK67890",
        issueType: "Payment Error",
        ticketCreatedDate: "2024-11-10",
        ticketState: "Closed",
        ticketAssignedFrom: "1 day ago",
        ticketCreatorName: "Jane Smith",
        userInitialATR: "JS",
      },
      {
        id: 4,
        ticketId: "TCK67890",
        issueType: "Payment Error",
        ticketCreatedDate: "2024-11-10",
        ticketState: "Closed",
        ticketAssignedFrom: "1 day ago",
        ticketCreatorName: "Jane Smith",
        userInitialATR: "JS",
      },
      {
        id: 5,
        ticketId: "TCK67890",
        issueType: "Payment Error",
        ticketCreatedDate: "2024-11-10",
        ticketState: "Closed",
        ticketAssignedFrom: "1 day ago",
        ticketCreatorName: "Jane Smith",
        userInitialATR: "JS",
      },
  ];

  const getRenderData = (ticketId: number) => {
    const ticket = ticketList.find((t) => t.id === ticketId) || null;
    setSelectedTicket(ticket);
  };

  return (
    <div className="ticket-chat-container">
      <div className="ticket-chat-wrapper">
        {/* Ticket List Section */}
        <div className="ticket-list-section">
          <div className="title-bar">
            <div>
            <h2>Recent Tickets</h2>
            </div>
            <div>
            {/* <Button buttonText="Create Ticket" externalClassName="crete-ticket-btn" /> */}
            <Link to="/createTicket" className="crete-ticket-btn"> Create Ticket</Link>
            </div>
          </div>
          <div className="ticket-list">
            {ticketList.map((ticket) => (
              <div
                key={ticket.id}
                className={`ticket-card ${
                  selectedTicket?.id === ticket.id ? "active" : ""
                }`}
                onClick={() => getRenderData(ticket.id)}
              >
                <div className="ticket-card-wrapper">
                  <div className="card-row-1">
                    <p>{ticket.ticketId}</p>
                    <p>{ticket.issueType}</p>
                  </div>
                  <div className="card-row-2">
                    <p>{ticket.ticketAssignedFrom}</p>
                    <p className="ticket-status">{ticket.ticketState}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="vertical-line"></div>

        {/* Ticket Overview Section */}
        <div className="ticket-overview">
          {selectedTicket ? (
            <div className="overview-wrapper">
              <div className="overview-title">
                <p>{selectedTicket.issueType}</p>
                <p>{selectedTicket.ticketCreatedDate}</p>
              </div>
              <div className="ticket-details">
                <div className="ticket-initial-container">
                  <div className="initial-wrapper">
                    {selectedTicket.userInitialATR}
                  </div>
                </div>
                <div className="ticket-creator">
                  <p>{selectedTicket.ticketCreatorName}</p>
                  <p>{selectedTicket.ticketCreatedDate}</p>
                </div>
                <div className="ticket-content">
                  <p>Ticket details and conversation will be displayed here.</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="no-ticket-message">Select a ticket to view details</p>
          )}
        </div>
      </div>
    </div>
  );
};
