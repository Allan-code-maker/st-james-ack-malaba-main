import { AuthClient } from "@dfinity/auth-client";
import { Identity } from "@dfinity/agent";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useState, useEffect, useCallback, useMemo } from "react";
import { createActor } from "../declarations/backend";

// Internet Identity URL — mainnet by default, local for dev
const II_URL =
  process.env.NODE_ENV === "production"
    ? "https://identity.ic0.app"
    : `http://localhost:4943?canisterId=${process.env.CANISTER_ID_INTERNET_IDENTITY}`;

const BACKEND_CANISTER_ID = process.env.CANISTER_ID_BACKEND ?? "";

export function useAuth() {
  const [authClient, setAuthClient] = useState<AuthClient | null>(null);
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const queryClient = useQueryClient();

  // Boot: create the AuthClient and check existing session
  useEffect(() => {
    AuthClient.create().then(async (client) => {
      const authenticated = await client.isAuthenticated();
      setAuthClient(client);
      if (authenticated) {
        setIdentity(client.getIdentity());
        setIsAuthenticated(true);
      }
      setIsInitializing(false);
    });
  }, []);

  const principalText = useMemo(
    () => identity?.getPrincipal().toString() ?? "",
    [identity]
  );

  // Create the backend actor using the current identity
  const actor = useMemo(() => {
    if (!identity || !BACKEND_CANISTER_ID) return null;
    return createActor(BACKEND_CANISTER_ID, {
      agentOptions: { identity },
    });
  }, [identity]);

  const { data: userRole } = useQuery({
    queryKey: ["userRole", principalText],
    queryFn: async () => {
      return actor ? actor.getCallerUserRole() : null;
    },
    enabled: !!actor && isAuthenticated,
    staleTime: 5 * 60 * 1000, // role rarely changes
  });

  const handleLogin = useCallback(async () => {
    if (!authClient) return;
    setIsLoggingIn(true);
    await authClient.login({
      identityProvider: II_URL,
      onSuccess: () => {
        const id = authClient.getIdentity();
        setIdentity(id);
        setIsAuthenticated(true);
        setIsLoggingIn(false);
      },
      onError: () => {
        setIsLoggingIn(false);
      },
    });
  }, [authClient]);

  const handleLogout = useCallback(async () => {
    if (!authClient) return;
    queryClient.invalidateQueries({ queryKey: ["userRole", principalText] });
    await authClient.logout();
    setIdentity(null);
    setIsAuthenticated(false);
    queryClient.clear();
  }, [authClient, queryClient, principalText]);

  const isAdmin = isAuthenticated && !!userRole && "admin" in userRole;

  return {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    identity,
    principalText,
    isAdmin,
    handleLogin,
    handleLogout,
  };
}