import React, { ReactNode } from "react";
import { AppointmentShortCardFilter, HealthMatrixSection, Services, WellnessCardsSection } from "../../Molecules";
import { CalendarComponent } from "../../Atom";
import './pageRender.scss'


export const Home = (() => {
    return (
        <div className="home-page-render-container">
            <div className="home-container-wrapper">
                <div className="home-pr-col-1">
               <Services/>
               <AppointmentShortCardFilter/>
               <WellnessCardsSection/>
               </div>
               <div className="home-pr-col-2">
               <HealthMatrixSection/>
               </div>

            </div>
        </div>
    )
});

