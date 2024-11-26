import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LocalStorageKeys } from "../utils/common/constant";
import { AppRoutes } from "../routes";

// Define the prop types
interface RequireAuthProps {
    children: ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const location = useLocation();

    if (!localStorage.getItem(LocalStorageKeys.authToken)) {
        return <Navigate to={AppRoutes.login} state={{ from: location }} replace />;
    }
    return <>{children}</>;
};
