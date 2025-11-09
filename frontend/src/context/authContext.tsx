import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { setupAxiosInterceptors } from '../axios/axiosInstance';
import { authService } from '../services/authService';


interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  // Setup axios interceptors dynamically
  useEffect(() => {
    setupAxiosInterceptors(() => token);
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const data = await authService.login(email, password);
      setToken(data.token);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
