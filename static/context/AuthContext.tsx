import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};

interface StoredUser extends User {
  password: string;
}

const USERS_KEY = "hotel_users";
const SESSION_KEY = "hotel_session";

const getUsers = (): StoredUser[] => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch { return []; }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const s = localStorage.getItem(SESSION_KEY);
      return s ? JSON.parse(s) : null;
    } catch { return null; }
  });

  const login = useCallback((email: string, password: string) => {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...safe } = found;
      setUser(safe);
      localStorage.setItem(SESSION_KEY, JSON.stringify(safe));
      return true;
    }
    return false;
  }, []);

  const register = useCallback((name: string, email: string, password: string) => {
    const users = getUsers();
    if (users.some((u) => u.email === email)) return false;
    const newUser: StoredUser = { id: crypto.randomUUID(), name, email, password };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    const { password: _, ...safe } = newUser;
    setUser(safe);
    localStorage.setItem(SESSION_KEY, JSON.stringify(safe));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
