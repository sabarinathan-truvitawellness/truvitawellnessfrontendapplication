import React, { useState } from "react";
import {
  DoctorInfoShortCard,
  DynamicDateField,
  Input,
  Select,
} from "../../Atom";
import doctorDummy from "../../Assets/images/header/doctor-standing-full.png";
import { Button } from "../../Atom";
import './doctorConsultation.scss'
import { useGetDoctorListQuery } from "../../redux/services";
import { config } from "process";
import { LocalStorageKeys } from "../../utils/common/constant";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../routes";

export const DoctorConsultation = () => {
  const [formData, setFormData] = useState({
    // location: "",
    date: null,
    speciality:""
  });

  // const userId = localStorage.getItem(LocalStorageKeys.authToken);

  const {data: getDocorsListData} = useGetDoctorListQuery({ specialty: formData.speciality, date: formData.date });

  console.log("doctorListdata",getDocorsListData?.availability)


  function changeHandler(value: string, name: string): void {
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const optionsData = [
    { label: "Cardiology", value: "cardiology" },
    { label: "Dermatology", value: "dermatology" },
    { label: "Endocrinology", value: "endocrinology" },
    { label: "Gastroenterology", value: "gastroenterology" },
    { label: "Hematology", value: "hematology" },
    { label: "Neurology", value: "neurology" },
    { label: "Oncology", value: "oncology" },
    { label: "Orthopedics", value: "orthopedics" },
    { label: "Pediatrics", value: "pediatrics" },
    { label: "Psychiatry", value: "psychiatry" },
    { label: "Radiology", value: "radiology" },
    { label: "Rheumatology", value: "rheumatology" },
    { label: "Urology", value: "urology" },
    { label: "Ophthalmology", value: "ophthalmology" },
    { label: "Obstetrics and Gynecology", value: "obstetrics_gynecology" },
    { label: "General Surgery", value: "general_surgery" },
    { label: "Plastic Surgery", value: "plastic_surgery" },
    { label: "Anesthesiology", value: "anesthesiology" },
    { label: "Pathology", value: "pathology" },
    { label: "Family Medicine", value: "family_medicine" },
  ];


  console.log("formData", formData);
  return (
    <div className="doctor-consulation-container">
      <div className="doctor-consultation-wrapper">
        <div className="filter-section">
        {/* <div className="global-input-wrapper">
          <Input
            type="text"
            placeholder="Location"
            onChange={changeHandler}
            name="location"
            label="Enter Your Location"
            externalClassName="internal-input-firstname"
            required={true}
            variant="outlined"
            value={formData["location"] || ""}
          />
        </div> */}
        <div className="global-input-wrapper">
          <DynamicDateField
            type="date"
            onChange={changeHandler}
            name="date"
            label="Date"
            externalClassName="internal-input-dob"
            required={true}
            variant="outlined"
            value={formData["date"]}
            isShrunk={true}
          />
        </div>
        <div className="global-input-wrapper">
          <Select
            label={"Select Speciality"}
            value={formData["speciality"]}
            options={optionsData}
            onChange={changeHandler}
            name={"speciality"}
            helperText={""}
            error={false}
          />
        </div>
        <div>
          <Button buttonText="Submit" externalClassName="filter-btn" /> 
          {/* onClick={filterHandler}  */}
        </div>
        </div>
      
{
  getDocorsListData?.availability?.map((res:any, index:number) => {
    return (
      // <Link to={`${AppRoutes.doctorsDetails.replace(':doctorId', res?.doctor_id)}`}>
  <DoctorInfoShortCard
    key={res?.doctor_id}
    doctorsName={res?.doctor_name}
    medicalSpecialization={res?.specialty}
    experience={res?.doctor_experience}
    imageUrl={res?.profile_picture_url}
    timeSlots={res?.slots}
    doctorCosting={res?.doctor_fees}
    doctorId = {res?.doctor_id}
  />
//  </Link>

    );
  })
}
        
      </div>
    </div>
  );
};
