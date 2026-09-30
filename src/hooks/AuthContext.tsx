import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { user } from "../interfaces/user";

interface AuthContextType {
    isLogged: boolean;
    login: (token: string) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const api = axios.create({
    baseURL: "https://route-posts.routemisr.com",
    headers: { "Content-Type": "application/json" },
});

export function AuthProvidor({ children }: { children: React.ReactNode }) {
    const [isLogged, setIsLogged] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<user | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLogged(true);
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        setIsLoading(false);
    }, []);

    const login = (token: string) => {
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setIsLogged(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
        setIsLogged(false);
    }

    return (
        <AuthContext.Provider value={{ isLogged, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}