import { createActor } from "@/backend";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

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
  const { actor } = useActor(createActor);

  const { data: userRole } = useQuery({
    queryKey: ["userRole", identity?.getPrincipal().toString()],
    queryFn: async () => {
      return actor ? actor.getCallerUserRole() : null;
    },
    enabled: !!actor && isAuthenticated,
  });

  const handleLogin = () => {
    login();
  };

  const handleLogout = () => {
    clear();
    queryClient.clear();
  };

  const principalText = identity?.getPrincipal().toString() ?? "";
  const isAdmin = isAuthenticated && userRole && 'admin' in userRole;

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
