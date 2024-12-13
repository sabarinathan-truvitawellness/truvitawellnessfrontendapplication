import React, { ReactNode, useEffect } from "react";
import { useRefreshMutation } from "./redux/services"; // Import the refresh mutation
import { LocalStorageKeys } from "./utils/common/constant"; // LocalStorage key constants
import { Spin } from "antd";
import { error } from "console";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface InputProps {
  children?: ReactNode;
}

export const AppAuth: React.FC<InputProps> = (props) => {
  const [refreshToken, { isLoading }] = useRefreshMutation();

  useEffect(() => {
    // If the auth token exists in local storage, refresh it
    if (localStorage.getItem(LocalStorageKeys.authToken)) {
      refreshAPI();
    }

    // Add cross-browser logout listener
    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === LocalStorageKeys.refreshToken && // Check refreshToken key
        e.oldValue && // Old value exists
        !e.newValue // New value is removed
      ) {
        alert("You have been logged out. Click OK to reload.");
        window.location.reload();
      }
    };

    // Add the event listener for the `storage` event
    window.addEventListener("storage", handleStorageChange);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // Dependency array ensures the effect runs once on mount

  const refreshAPI = async () => {
    try {
      // Call the refresh mutation
      const result = await refreshToken({});
  
      // Safely check if the error exists and is a FetchBaseQueryError
      if (result?.error) {
        if ('status' in result.error && (result.error as FetchBaseQueryError).status === 401) {
          console.log("Token is invalid, logging out...");
          localStorage.removeItem(LocalStorageKeys.authToken);
        } else {
          console.error("Unhandled error during token refresh:", result.error);
        }
      } else {
        console.log("Token refreshed successfully.");
      }
    } catch (err) {
      console.error("Error while refreshing token:", err);
      localStorage.removeItem(LocalStorageKeys.authToken);
    }
  };
  

  return (
    <>
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        props.children
      )}
    </>
  );
};
