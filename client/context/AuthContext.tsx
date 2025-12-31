"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Types
export interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user";
    status: "active" | "inactive";
    bio?: string;
    phone?: string;
    jobTitle?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (token: string, userData: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check for token on mount
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            const savedUser = localStorage.getItem("user");

            if (token && savedUser) {
                try {
                    // Optional: Verify token availability with backend here if needed
                    setUser(JSON.parse(savedUser));
                } catch (error) {
                    console.error("Auth restoration failed", error);
                    logout();
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = (token: string, userData: User) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        router.push(userData.role === "admin" ? "/dashboard" : "/profile");
    };

    const logout = () => {
        // Show goodbye toast before clearing state (although redirect follows quickly, 
        // sonner persists if layout handles it)
        toast.info("Logged out", {
            description: "See you soon!",
        });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        router.push("/");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
