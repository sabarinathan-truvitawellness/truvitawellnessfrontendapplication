import React, { ReactNode } from "react";
import { Header, NavBar } from "./Molecules";

interface AppNavBarsProps {
    children?: ReactNode;
}

export const AppNavBars: React.FC<AppNavBarsProps> = ({ children }) => {
    return (
        <div className="page-render-container">
            <div className="container-wrapper flex">
                <div className="pr-col-1">
                    <NavBar />
                </div>

                <div className="pr-col-2 flex-1">
                    <Header />
                    {children}
                    <p>&#169; All Rights Reserved</p>
                </div>
            </div>
        </div>
    );
};
