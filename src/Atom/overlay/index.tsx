import React from "react";
import './overlay.scss';
import { CancelButton } from "../../utils/common/svgIcons";

interface OverlayProps {
    children: React.ReactNode;
    isOpen: boolean; // Controlled prop for the overlay visibility
    closeOverlay: () => void; // Function to close the overlay
}

export const DynamicOverlay: React.FC<OverlayProps> = ({ children, isOpen, closeOverlay }) => {
    // Return null if the overlay is not open
    if (!isOpen) {
        return null;
    }

    return (
        <div className="overlay-container open">
            <div className="overlay-container-wrapper">
                <button className="cancel-button" onClick={closeOverlay}><CancelButton /></button>
                <div className="overlay-content">
                    {children}
                </div>
            </div>
        </div>
    );
};
