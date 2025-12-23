import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { AuthSession, AuthContextType } from "./auth";
import { authService } from "./auth.service";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedSession = authService.getSession();
    setSession(storedSession);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const session = await authService.login(email, password);
    setSession(session);
  };

  const register = async (email: string, password: string) => {
    await authService.register(email, password);
  };

  const logout = () => {
    authService.logout();
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{ session, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
