import React, { useState } from "react";
import brandLogo from '../../Assets/images/home/brandLogo.png';
import { useLocation, useNavigate } from "react-router-dom";
import { AllSideNavBars } from '../../utils/common/constant';
import { useSelector, UseSelector } from "react-redux";
import truvitalog from '../../Assets/images/home/truvita-logo.png'
import './navBar.scss';

export const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsopen] = useState(false)
    // const sideNavBarUtils = useSelector((state) => state.utils.AllSideNavBars)
    const sideNavBarUtils = false;

    const toggleNavBar = () => {
        setIsopen(!isOpen);
    }
    const pageToggler = (link: string) => {
        navigate(link);
    };

    const isSelected = (link: string) => {
        return link === location.pathname;
    };

    return (
        <div className={`nav-bar-container ${isOpen ? 'expanded' : 'collapsed'}`}>
            <div className="animating-hidder-wrapper">
                <div className="container-wrapper">
                    <div className="row-1">
                        <div className="nav-bar-brandLogo">
                            <img src={`${isOpen ? truvitalog : brandLogo}`} alt="brand logo" />
                        </div>
                    </div>
                    <div className="navigation-wrapper">
                        <div className="row-2">
                            <div className="nav-bar-page-router">
                                <ul>
                                    {AllSideNavBars?.map((sideNavBarItems) => {
                                        const isCurrentLink = isSelected(sideNavBarItems.route);
                                        return (
                                            <li key={sideNavBarItems.route} className={``}>
                                                <div className={`logo-wrapper ${isCurrentLink ? 'active' : ''}`}>
                                                    <button className={`toggle-btn`} onClick={() => pageToggler(sideNavBarItems.route)}>
                                                        {/* Call the icon components here */}
                                                        <div className="btn-content-wrapper">
                                                        {isCurrentLink ? sideNavBarItems.icon.active() : sideNavBarItems.icon.inactive()}
                                                        {isOpen && <span>{sideNavBarItems.label}</span>}
                                                        </div>
                                                    </button>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`toggle-btn-wrapper ${isOpen ? 'open' : 'closed'}`}>
                <button className="toggle-btn" onClick={toggleNavBar}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M13 16L17 12L13 8M7 16L11 12L7 8" stroke="#44546F" stroke-opacity="0.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

