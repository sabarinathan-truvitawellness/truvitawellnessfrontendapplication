import React, { ReactNode } from "react";
import { Services } from "../../Molecules";
import { CalendarComponent } from "../../Atom";


export const Home = (() => {
    return (
        <div className="page-render-container">
            <div className="container-wrapper">
               <Services/>
               <CalendarComponent/>
            </div>
        </div>
    )
});

