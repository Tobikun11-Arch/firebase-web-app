"use client"
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import firebase_app from "../firebase/config";

const auth = getAuth(firebase_app);

// Define the shape of the AuthContext
interface AuthContextType {
  user: User | null;
}

// Create AuthContext with a default value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook for consuming AuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};

// Define the props for AuthContextProvider
interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
        {loading ? <div className="h-screen bg-white text-black flex justify-center items-center">
          Loading...</div> : children}
        </AuthContext.Provider>
    );
};
