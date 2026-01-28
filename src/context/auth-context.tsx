'use client';

import React, { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import type { User } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, pass: string, firstName: string, lastName: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for user in localStorage on initial load
    try {
      const storedUser = localStorage.getItem('rally-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
    } finally {
        setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string): Promise<void> => {
    // Mock login
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // In a real app, you would validate against a database.
            // Let's assume login is successful if email is not empty.
            if (email) {
                const mockUser: User = { 
                    uid: 'mock-uid-' + new Date().getTime(), 
                    email,
                    firstName: 'Jon',
                    lastName: 'Doe'
                };
                
                // Retrieve user data from localStorage if it exists from registration
                try {
                    const storedUsers = JSON.parse(localStorage.getItem('rally-users') || '{}');
                    if (storedUsers[email] && storedUsers[email].password === pass) {
                        const foundUser = storedUsers[email];
                        mockUser.firstName = foundUser.firstName;
                        mockUser.lastName = foundUser.lastName;
                    } else if (!storedUsers[email]) {
                         // For demo, if user doesn't exist, create one
                        const newUser = { password: pass, firstName: 'Jon', lastName: 'Doe'};
                        storedUsers[email] = newUser;
                        localStorage.setItem('rally-users', JSON.stringify(storedUsers));
                    } else {
                        reject(new Error("Invalid credentials"));
                        return;
                    }

                } catch (e) { console.error(e); }

                setUser(mockUser);
                localStorage.setItem('rally-user', JSON.stringify(mockUser));
                resolve();
            } else {
                reject(new Error("Invalid credentials"));
            }
        }, 1000);
    });
  };

  const register = async (email: string, pass: string, firstName: string, lastName: string): Promise<void> => {
    // Mock register
    return new Promise((resolve, reject) => {
        setTimeout(() => {
             try {
                const storedUsers = JSON.parse(localStorage.getItem('rally-users') || '{}');
                if (storedUsers[email]) {
                    reject(new Error("User already exists"));
                    return;
                }
                storedUsers[email] = { password: pass, firstName, lastName };
                localStorage.setItem('rally-users', JSON.stringify(storedUsers));
                resolve();

            } catch (error) {
                reject(error);
            }
        }, 1000);
    });
  };

  const logout = async (): Promise<void> => {
    setUser(null);
    localStorage.removeItem('rally-user');
  };

  const value = { user, loading, login, logout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
