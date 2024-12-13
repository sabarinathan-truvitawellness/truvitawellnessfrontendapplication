import React from "react";
import profileAvatar from '../../Assets/images/header/profile-image-avatar.png'
import { Link } from "react-router-dom";
import { HelpandSupport, PremiumIcon, ProfileDoubleHead, ProfileSingleHead, SignOut } from "../../utils/common/svgIcons";
import './profileOverlay.scss';

interface InputProps {
  profileData: {
      first_name: string;
      last_name: string;
      profile_picture_url: string;
  };
}

export const ProfileOverlay:React.FC <InputProps> = (({profileData})=>{
    return(
        <div className="profile-overlay-conatiner">
            <div className="profile-overlay-wrapper">
              <div className="profile-section">
                <img src={profileData.profile_picture_url} alt="profileAvatar"/>
                <h3>{`${profileData.first_name} ${profileData.last_name}`}</h3>
                <p>Free User</p>
              </div>
              <div className="upgrade-btn-wrapper">
                 <Link to={"#"}>
                 <PremiumIcon/> <span>Go PREMIUM!!!</span>
                 </Link>
              </div>

              <div className="horizontal-line"></div>
              
                   <div className="mange-profile-btn-wrapper">
                   <Link to={"#"}>
                   <ProfileSingleHead/> <span>Manage Profile</span>
                   </Link>
                   </div>
                   <div className="account-settings-btn-wrapper">
                   <Link to={"#"}>
                   <ProfileDoubleHead/> <span>Account Settings</span>
                   </Link>
                   </div>
                   <div className="help-support-btn-wrapper">
                   <Link to={"#"}>
                   <HelpandSupport/> <span>Help & Support</span>
                   </Link>
                   </div>
             
              <div className="horizontal-line"></div>

              <div className="signout-btn-wrapper">
                   <Link to={"#"}>
                   <SignOut/> <span>Sign Out</span>
                   </Link>
                   </div>
            </div>
        </div>
    )
});
