import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const {
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    loginStatus,
    identity,
  } = useInternetIdentity();

  const queryClient = useQueryClient();

  const handleLogin = () => {
    login();
  };

  const handleLogout = () => {
    clear();
    queryClient.clear();
  };

  const principalText = identity?.getPrincipal().toString() ?? "";
  const isAdmin = isAuthenticated; // Admin is any authenticated user (first login becomes admin)

  return {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    loginStatus,
    identity,
    principalText,
    isAdmin,
    handleLogin,
    handleLogout,
  };
}
