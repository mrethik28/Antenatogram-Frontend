/* eslint-disable react/prop-types */
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles, requiredAuthParams }) => {
    const { auth } = useAuth();
    const location = useLocation();

    // Check if the user's role is allowed and they are logged in
    let isAllowed = allowedRoles.includes(auth.role) && auth.loggedIn;

    let authparams;
    if(requiredAuthParams)  authparams = requiredAuthParams.every(param => auth[param] != null);

    return (
        isAllowed ? (
            authparams ? (
                <Outlet />
            ) : (
            <Navigate to="/profile" state={{ from: location }} replace />

            )
        ) : (
            <Navigate to="/login" state={{ from: location }} replace />
        )
    );
};

export default RequireAuth;
