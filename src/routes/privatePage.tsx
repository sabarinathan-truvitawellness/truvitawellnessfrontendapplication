import React from "react";
import { AppRoutes } from ".";
import {
  AiDoctor,
  Appointments,
  CreateTicket,
  DoctorConsultation,
  DoctorDetails,
  FamilyMemebers,
  Home,
  PaymentHistory,
  PillRemainder,
  Prescription,
  RegisterFamily,
  Settings,
  TicketChat,
  AiBooth,
  PreacriptionOverView,
  WellnessProgram
} from "../Organism";
import { Inbox } from "../Organism/inbox";

export const PrivatePages = [
  {
    path: AppRoutes.home,
    element: <Home />,
  },
  {
    path: AppRoutes.settings,
    element: <Settings />,
  },
  {
    path: AppRoutes.appointments,
    element: <Appointments />,
  },
  {
    path: AppRoutes.familyMemeberSelector,
    element: <FamilyMemebers />,
  },
  {
    path: AppRoutes.doctorConsultation,
    element: <DoctorConsultation />,
  },
  {
    path: AppRoutes.doctorsDetails,
    element: <DoctorDetails />,
  },
  {
    path: AppRoutes.registerFamily,
    element: <RegisterFamily />,
  },
  {
    path: AppRoutes.paymentHistory,
    element: <PaymentHistory />,
  },
  {
    path: AppRoutes.createTicket,
    element: <CreateTicket />,
  },
  {
    path: AppRoutes.ticketChat,
    element: <TicketChat />,
  },
  {
    path: AppRoutes.inbox,
    element: <Inbox/>
  },
  {
    path:AppRoutes.prescription,
    element:<Prescription/>
  },
  {
    path:AppRoutes.pillRemainder,
    element:<PillRemainder/>
  },
  {
    path:AppRoutes.aiDocotor,
    element:<AiDoctor/>
  },
  {
    path:AppRoutes.aiBooth,
    element:<AiBooth/>
  },
  {
    path:AppRoutes.prescriptionOverView,
    element: <PreacriptionOverView/>
  },
  {
    path: AppRoutes.wellnessPrograme,
    element: <WellnessProgram/> 
  }
];
