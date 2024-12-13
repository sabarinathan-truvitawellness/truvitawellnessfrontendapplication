import React, { ReactNode } from "react";
import "./modelOverlay.scss";
import { CancelButton } from "../../utils/common/svgIcons";

interface InputProps {
    children: ReactNode;
    closeOverlay: () => void; // Corrected return type from `null` to `void`
}

export const ModelOverlay: React.FC<InputProps> = ({ children, closeOverlay }) => {
    return (
        <div className="model-overlay-container" onClick={closeOverlay}>
            <div className="model-overlay-container-wrapper" onClick={(e) => e.stopPropagation()}>
                <button className="cancel-button" onClick={closeOverlay}>
                    <span className="cancel-icon"> <CancelButton /></span>

                </button>
                {children}
            </div>
        </div>
    );
};
