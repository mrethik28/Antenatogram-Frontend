/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { createContext, useEffect, useRef, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ loggedIn: false, role: "patient" });
    let refreshInterval = useRef();
    const navigate = useNavigate();
    useEffect(() => {
        if (auth.loggedIn) {
            refreshInterval.current = setInterval(async () => {
                try {
                    const result = await axios.post('/auth/refresh', {}, {
                        withCredentials: true, headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                    console.log(result);
                } catch (error) {
                    setAuth({ loggedIn: false, role: "patient" });
                    navigate('/login');
                }
            },10 * 60 * 1000);
        }

        return () => {
            if (refreshInterval.current) {
                clearInterval(refreshInterval.current);
            }
        };
    }, [auth.loggedIn, navigate, refreshInterval]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;