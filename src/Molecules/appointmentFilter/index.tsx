import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../routes";
import { Button, CalendarComponent } from "../../Atom";
import "./appointmentFilter.scss";
import { CancelButton, Pill, Tick } from "../../utils/common/svgIcons";
import dayjs, { Dayjs } from "dayjs";
import { useGetUpcomingAppointmentsListQuery } from "../../redux/services";

type Appointment = {
  appointment_id: string;
  status: string;
  time_slot_details: {
    start_time: string;
    end_time: string;
  };
  doctor: {
    first_name: string;
    last_name: string;
    profile_picture_url?: string;
    specialty: string;
    doctor_experience: number;
  };
};

type PillData = {
  pillName: string;
  pillTakenTime: string;
  mealDecision: string;
  appointmentStatus: string;
  appointmentId: string;
};

export const AppointmentShortCardFilter: React.FC = () => {
  const userId = localStorage.getItem("userId") || "";
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const formattedDate = selectedDate ? selectedDate.format("YYYY-MM-DD") : "";

  const { data: upComingAppointmentList } = useGetUpcomingAppointmentsListQuery({
    userId,
    date: formattedDate,
  });

  const [appointmentData, setAppointmentData] = useState<Appointment[]>([]);
  console.log("appointmwen data",appointmentData)
  const [pillData, setPillData] = useState<PillData[]>([
    {
      pillName: "Vitamin C",
      pillTakenTime: "8:00 AM",
      mealDecision: "After Meal",
      appointmentStatus: "Scheduled",
      appointmentId: "12345",
    },
    {
      pillName: "Calcium",
      pillTakenTime: "2:00 PM",
      mealDecision: "Before Meal",
      appointmentStatus: "Missed",
      appointmentId: "67890",
    },
  ]);

  const [currentPillIndex, setCurrentPillIndex] = useState(0);
  const [currentAppointmentIndex, setCurrentAppointmentIndex] = useState(0);

  useEffect(() => {
    if (upComingAppointmentList) {
      setAppointmentData(upComingAppointmentList);
    }
  }, [upComingAppointmentList]);

  const onPrePillHandle = () => {
    setCurrentPillIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : pillData.length - 1
    );
  };

  const onNextPillHandle = () => {
    setCurrentPillIndex((prevIndex) =>
      prevIndex < pillData.length - 1 ? prevIndex + 1 : 0
    );
  };

  const pillConsumeHandler = (btnType: string) => {
    console.log(`Pill ${btnType}`);
  };

  const onPreAppHandle = () => {
    setCurrentAppointmentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : appointmentData.length - 1
    );
  };

  const onNextAppHandle = () => {
    setCurrentAppointmentIndex((prevIndex) =>
      prevIndex < appointmentData.length - 1 ? prevIndex + 1 : 0
    );
  };

  return (
    <div className="app-filter-container">
      <div className="app-filter-wrapper">
        <div className="app-filter-row-1">
          <CalendarComponent
            onDateSelect={(date: Dayjs) => setSelectedDate(date)}
          />
        </div>
        <div className="app-filter-row-2">
          <div className="app-filter-col-1">
            <p className="section-title">Pill Remainder</p>
            <div className="pill-sho-wrapper">
              <div className="pill-sho-row-1">
                <div className="icon-wrapper">
                  <Pill />
                </div>
                <div className="details-wrapper">
                  <p>{pillData[currentPillIndex]?.pillName}</p>
                  <p>
                    {pillData[currentPillIndex]?.pillTakenTime}, {" "}
                    {pillData[currentPillIndex]?.mealDecision}
                  </p>
                </div>
              </div>
              <div className="pill-sho-row-2">
                <div className="pill-shobtn-wrapper">
                  <div className="pill-reject-btn">
                    <button onClick={() => pillConsumeHandler("taken")}>
                      <CancelButton />
                    </button>
                  </div>
                  <div className="pill-taken-btn">
                    <button onClick={() => pillConsumeHandler("skipped")}>
                      <Tick />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="change-slide-btn-wrapper">
              <Button buttonText="<" onClick={onPrePillHandle} />
              <Button buttonText=">" onClick={onNextPillHandle} />
            </div>
          </div>
          <div className="app-filter-col-2">
            <p className="section-title">Appointments</p>
            {appointmentData?.length > 0 ? (
              <div className="app-sho-wrapper">
                  <div className="slot-date-wrapper">
                      {appointmentData[currentAppointmentIndex]?.time_slot_details.start_time} - {" "}
                      {appointmentData[currentAppointmentIndex]?.time_slot_details.end_time}
                    </div>
                <div className="app-sho-row-1">
                  <img
                    src={
                      appointmentData[currentAppointmentIndex]?.doctor
                        .profile_picture_url
                        ? `https://truvitacare.com${appointmentData[currentAppointmentIndex]?.doctor.profile_picture_url}`
                        : "/default-profile.png"
                    }
                    alt="Doctor"
                  />
                  <div className="details-wrapper">
                    <p>{
                      `${appointmentData[currentAppointmentIndex]?.doctor.first_name} ${appointmentData[currentAppointmentIndex]?.doctor.last_name}`
                    }</p>
                    <p>
                      {appointmentData[currentAppointmentIndex]?.doctor.specialty}, {" "}
                      {appointmentData[currentAppointmentIndex]?.doctor.doctor_experience} yrs
                      Experience
                    </p>
                  
                  </div>
                </div>
                <div className="app-sho-row-2">
                  <div className="app-shobtn-wrapper">
                    <div className="app-approve-status">
                      {appointmentData[currentAppointmentIndex]?.status}
                    </div>
                    <div className="view-details-btn">
                      <Link
                        to={AppRoutes.appointmentOverView.replace(
                          ":appointment_id",
                          appointmentData[currentAppointmentIndex]?.appointment_id
                        )}
                      >
                        {"View Details >"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p>No appointments found for the selected date.</p>
            )}
            <div className="change-slide-btn-wrapper">
              <Button buttonText="<" onClick={onPreAppHandle} />
              <Button buttonText=">" onClick={onNextAppHandle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
