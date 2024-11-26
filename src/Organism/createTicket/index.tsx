import React, { useState } from "react";
import { Input, Select, TextBox } from "../../Atom";
import "./createTicket.scss";

export const CreateTicket = () => {
  const [formData, setFormData] = useState({
    ticketName: "",
    ticketType: "",
    description: "",
  });

  const [error, setError] = useState({
    ticketName: "",
    ticketType: "",
    description: "",
  });

  const ticket_Data = [
    { label: "Technical Issue", value: "technical" },
    { label: "Billing", value: "billing" },
    { label: "General Inquiry", value: "general" },
  ];

  const changeHandler = (value: string, name: string): void => {
    setFormData({
      ...formData,
      [name]: value,
    });

    if (!value) {
      setError({
        ...error,
        [name]: "This field is required",
      });
    } else {
      setError({
        ...error,
        [name]: "",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form
    let hasError = false;
    const newError = { ...error };

    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof typeof formData]) {
        newError[key as keyof typeof error] = "This field is required";
        hasError = true;
      }
    });

    setError(newError);

    if (!hasError) {
      console.log("Form Submitted: ", formData);
      // Make API call or further processing
    }
  };

  return (
    <div className="create-ticket-container">
      <div className="create-ticket-wrapper">
        <div className="title-section">
          <p>Create Support Ticket</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="global-input-wrapper">
            <Input
              type="text"
              placeholder="Ticket Name"
              onChange={changeHandler}
              name="ticketName"
              label="Ticket Name"
              externalClassName="internal-input-ticketname"
              helperText={error["ticketName"] || ""}
              required={true}
              variant="outlined"
              error={!!error["ticketName"]}
              value={formData["ticketName"] || ""}
            />
          </div>

          <div className="global-input-wrapper">
            <Select
              label="Choose Ticket Type"
              options={ticket_Data}
              onChange={changeHandler}
              name="ticketType"
              value={formData["ticketType"] || ""}
              helperText={error["ticketType"] || ""}
              error={!!error["ticketType"]}
            />
          </div>

          <div className="global-input-wrapper">
            <TextBox
              name="description"
              value={formData["description"] || ""}
              onchange={changeHandler}
              error={!!error["description"]}
              placeholder="Enter ticket description"
              variant="outlined"
              minRows={5}
              minColumns={20}
            />
          </div>

          <div className="submit-btn-wrapper">
            <button type="submit" className="submit-btn">
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
