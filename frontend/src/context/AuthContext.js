import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const savedUser = localStorage.getItem("user");
    //     const savedToken = localStorage.getItem("token");

    //     if (savedUser && savedToken) {
    //         setUser(JSON.parse(savedUser));
    //     }

    //     setLoading(false);
    // }, []);

    useEffect(() => {
        const init = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const user = await api.get("/auth/me");
                setUser(user);
            } catch (error) {
                localStorage.removeItem("token");
            }

            setLoading(false);
        };

        init();
    }, []);

    const login = async (email, password) => {

        const data = await api.post("/auth/login", {
            email,
            password,
        });
        console.log("Login Response:", data);
        localStorage.setItem("token", data.token);
        // localStorage.setItem("user", JSON.stringify(data.user));

        setUser(data.user);

        return data;
    };

    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            console.error(error);
        }

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);

    if (!ctx) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return ctx;
};