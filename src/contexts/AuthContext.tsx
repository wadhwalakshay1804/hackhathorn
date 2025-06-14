import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'grower' | 'sales-rep';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Mock user for demonstration - in real app, this would come from localStorage or API
    return {
      id: 1,
      name: 'John Farmer',
      email: 'john@example.com',
      role: 'grower'
    };
  });

  const login = (email: string, password: string): boolean => {
    // Mock login logic
    if (email && password) {
      const mockUser: User = {
        id: 1,
        name: email.includes('sales') ? 'Sales Rep' : 'John Farmer',
        email: email,
        role: email.includes('sales') ? 'sales-rep' : 'grower'
      };
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};