
import {
  DashboardIconActive,
  DashboardIconInactive,
  AppointmentsIconActive,
  AppointmentsIconInactive,
  ChatIconActive,
  ChatIconInactive,
  ScheduleIconActive,
  ScheduleIconInactive,
  AnalyticsActive,
  AnalyticsInActive,
  SettingsActive,
  SettingsInActive,
  PrescriptionActive,
  PrescriptionInactive
} from './svgIcons';


const REGEX_CONSTANT: { [key: string]: RegExp } = {
  ONLY_CHARACTERS: /^[a-zA-Z]+$/,
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE_NUMBER: /^(?:\(\d{3}\)\s?|\d{3}[-.\s]?)(\d{3})[-.\s]?(\d{4})$/,
  PASSWORD_VERIFY: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&]).{8,}$/,
  USER_NAME: /^(?=.*[a-zA-Z])(\w*(?=\d)\w*)+$|^[a-zA-Z]+$/,
  ONLY_NUMBER:/^\d+$/

};

 let LocalStorageKeys = {
  authToken:"authToken",
  version:"version"
};

const Gender_Data=  [
  {
     label:"Male",
     value:"male"
  },
  {
    label:"Female",
    value:"female"
 },
 {
  label:"Others",
  value:"others"
}

]


const AllSideNavBars = [
  {
    label: "Dashboard",
    route: '/dashboard',
    icon: {
      active: DashboardIconActive ,
      inactive: DashboardIconInactive 
    },
  },
  {
    label: "Appointments",
    route: '/appointments',
    icon: {
      active: AppointmentsIconActive ,
      inactive: AppointmentsIconInactive 
    },
  },
  {
    label: "Chat",
    route: '/inbox',
    icon: {
      active: ChatIconActive ,
      inactive: ChatIconInactive 
    },
  },
  {
    label: "Schedule",
    route: '/schedule',
    icon: {
      active: ScheduleIconActive ,
      inactive: ScheduleIconInactive 
    },
  },
  {
    label: "Prescriptions",
    route: '/prescription',
    icon: {
      active: PrescriptionActive ,
      inactive: PrescriptionInactive 
    },
  },
  {
    label: "Analytics",
    route: '/analytics',
    icon: {
      active: AnalyticsActive ,
      inactive: AnalyticsInActive 
    },
  },
  {
    label: "Settings",
    route: '/settings',
    icon: {
      active: SettingsActive ,
      inactive: SettingsInActive 
    },
  },
];

export default AllSideNavBars;


export {
  REGEX_CONSTANT,
  AllSideNavBars,
  LocalStorageKeys,
  Gender_Data
}