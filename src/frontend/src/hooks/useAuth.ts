import { useEffect, useState, useCallback, useMemo } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsInitializing(false);
    });
    return unsubscribe;
  }, []);

  const isAuthenticated = !!user;
  const principalText = useMemo(() => user?.uid ?? "", [user]);

  const { data: userRole } = useQuery({
    queryKey: ["userRole", principalText],
    queryFn: async () => {
      if (!user) return null;
      const token = await user.getIdToken();
      const res = await fetch(`${API_URL}/api/auth/role`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return null;
      return res.json();
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });

  const handleLogin = useCallback(async () => {
    setIsLoggingIn(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Login failed", err);
    } finally {
      setIsLoggingIn(false);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    queryClient.invalidateQueries({ queryKey: ["userRole", principalText] });
    await signOut(auth);
    setUser(null);
    queryClient.clear();
  }, [queryClient, principalText]);

  const getToken = useCallback(async (): Promise<string | null> => {
    if (!user) return null;
    return user.getIdToken();
  }, [user]);

  const isAdmin = isAuthenticated && userRole?.isAdmin === true;

  return {
    user,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    principalText,
    isAdmin,
    getToken,
    handleLogin,
    handleLogout,
  };
}
