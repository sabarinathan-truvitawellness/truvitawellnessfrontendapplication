import React, { useState } from "react";
import { Editpen, Repeat, Star } from "../../utils/common/svgIcons";
import { Button, Input, TextBox } from "../../Atom";
import "./bookingOverview.scss";
import { notification } from "antd";
import { useBookSlotMutation } from "../../redux/services";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";

import { AppRoutes } from "../../routes";
import { useNavigate } from "react-router-dom";

export const BookingOverView = () => {
    const navigate = useNavigate();

      const doctorDetailss = useSelector((state: RootState) => state.booking.doctorDetails);
      const selectedDatee = useSelector((state: RootState) => state.booking.selectedDate);
      const slotTimingg = useSelector((state: RootState) => state.booking.slotTiming);
      console.log("ppppppppppp",doctorDetailss,selectedDatee,slotTimingg);
    const [bookAppointment] = useBookSlotMutation();

    const [formData, setFormData] = useState({
       notes:"",
       symptoms: "",
     });

    const inputChangeHandler = (value: string, name: string) => {
        setFormData({ ...formData, [name]: value });
      };

    const bookAppointmentWithSymptoms = async () => {
        const { symptoms, notes } = formData;
    
        if (!symptoms || !slotTimingg.slotId || !selectedDatee ) {  
            //  || !doctorId
          notification.error({
            message: "Error",
            description: "Please fill in all required fields before booking.",
          });
          return;
        }
    
        try {
          const payload = {
            // doctorId,
            bookingData: {
            //   doctor_id: doctorId,
              date: selectedDatee,
              time_slot_id:slotTimingg.slotId,
              symptoms: formData.symptoms,
            },
          };
    
          await bookAppointment(payload);
          notification.success({
            message: "Appointment Booked Successfully",
            description: "Your appointment has been successfully booked.",
          });
     
        } catch (error) {
          console.error(error);
          notification.error({
            message: "Booking Failed",
            description: "An error occurred while booking the appointment.",
          });
        }
      };
      const formatDate = (dateString:string) => {
        const date = new Date(dateString);
        
        const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit' };
        return date.toLocaleDateString('en-US', options).toLowerCase();
      };
      
      const formattedDate = formatDate(selectedDatee);

      const backToEdit = (() =>{
        navigate(-1);
      })
  return (
    <div className="bookig-verview-conatiner">
      <div className="booking-overview-wrapper">
        <div className="bv-col-1">
          <div className="bv-row-1">
            <p className="title-section">Booking Details</p>
            <div className="doctor-info-wrapper">
              <div className="image-wrapper">
                <img src={`https://truvitacare.com${doctorDetailss?.profile_picture_url}`} alt="" />
              </div>
              <div className="content-wrapper">
                <p>{doctorDetailss?.doctor_name}</p>
                <p>{doctorDetailss?.specialty}, {doctorDetailss?.doctor_experience}Years Experince</p>
                <p>
                  <Star />
                  <span>Reviews</span>
                </p>
              </div>
            </div>

            <div className="appointment-data-wrapper">
              <div className="date-section">
              <p>{formattedDate.split(' ')[0]}</p>
              <p>{formattedDate.split(' ')[1]}</p>
              </div>
              <div className="app-timing-info">
                <p>{slotTimingg.startTime} - {slotTimingg.endTime}</p>
                <p>{doctorDetailss?.specialty}, Doctor Consultation</p>
              </div>
            </div>

            <div className="edit-app-btn-wrapper">
              <button onClick={backToEdit}>
                <Editpen />
                Edit Booking Status
              </button>
            </div>
          </div>
          <div className="bv-row-2">
            <p className="sub-section-title">Who needs help?</p>
            <div className="edit-member-wrapper">
              <div className="memeber-info">
                <div className="col-1">
                  <img src="" />
                  <p>memeber name</p>
                </div>

                <div className="col-2">
                  <div className="icon-wrapper">
                    <Repeat />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bv-col-2">
          <div className="bv-row-1">
            <div className="paymnet-info">
              <p className="section-title">Payment Information</p>
              <ul>
                <li>
                  <p>Doctor Fees</p>
                  <p>${doctorDetailss?.doctor_fees}</p>
                </li>
                <li>
                  <p>Online Charges</p>
                  <p>$0.25</p>
                </li>
                <li>
                  <p>Tax</p>
                  <p>$1</p>
                </li>
              </ul>
              <div className="grand-total-section">
                <p>Total Amount Payable</p>
                <p>${doctorDetailss?.doctor_fees+1}</p>
              </div>
            </div>
            <div className="form-wrapper">
              <div className="booking-conformation-form">
                <div className="global-input-wrapper">
                  <Input
                    type="text"
                    placeholder="Symptoms"
                    onChange={inputChangeHandler}
                    name="symptoms"
                    label="Symptoms"
                    value={formData.symptoms}
                    required
                  />
                </div>

                <div className="global-input-wrapper">
                    <label>Reason for Appointment</label>
                  <TextBox
                    placeholder="Enter Reason"
                    onchange={inputChangeHandler}
                    name="notes"
                    // value={""}
                 value={formData.notes}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bv-row-2">
            <div className="boot-btn-wrapper">
              <Button
                buttonText="Book Slot"
                externalClassName="book-appointment"
                //   onClick={bookAppointmentWithSymptoms}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
