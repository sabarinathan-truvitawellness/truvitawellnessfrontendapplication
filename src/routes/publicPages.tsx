import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AppRoutes } from "../routes";

interface PublicPageProps {
    children?: ReactNode;
}

export const PublicPage: React.FC<PublicPageProps> = ({ children }) => {
    return <>{children || null}</>;
};
