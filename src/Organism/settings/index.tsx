
    import React, { useState } from "react";
    import { Button } from "../../Atom";
    import { BillingPayments, ProfileSetting } from "../../Molecules/settingsChildrenPages";
    import './settings.scss';
import { HelpSupport } from "../../Molecules/settingsChildrenPages/helpSupport/HelpSupport";
    
    export const Settings = () => {
        const [isActive, setIsActive] = useState(0);
    
        const handleActiveState = (id: number) => {
            setIsActive(id);
        };
    
        const renderPage = () => {
            switch (isActive) {
                case 0:
                    return <ProfileSetting />;
                // case 1: return <GeneralSettings />;
                // case 2: return <NotificationSettings />;
                case 3: return <BillingPayments />;
                case 4: return <HelpSupport />;
                default:
                    return <ProfileSetting />;
            }
        };
    
        // Define the button data in an array
        const buttons = [
            { id: 0, text: "Profile" },
            { id: 1, text: "General" },
            { id: 2, text: "Notification" },
            { id: 3, text: "Billing & Payments" },
            { id: 4, text: "Help & Support" },
        ];
    
        return (
            <div className="settings-page-container">
                <div className="settings-page-wrapper">
                    <div className="navigation-section">
                        <ul className="navigation-list">
                            {buttons.map((button) => (
                                <li key={button.id} className="nav-list-item">
                                    <Button
                                        buttonText={button.text}
                                        onClick={() => handleActiveState(button.id)}
                                        externalClassName={isActive === button.id ? 'active' : ''}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="vertical-separator"></div>
                    <div className="page-rendering-section">
                        {renderPage()}
                    </div>
                </div>
            </div>
        );
    };
    
