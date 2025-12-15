import { createContext, useContext, useEffect, useState } from "react";
import keycloak from "./keycloak";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    keycloak.init({
      onLoad: "check-sso",
      pkceMethod: "S256",
    }).then(authenticated => {
      if (authenticated) {
        setUser({
          username: keycloak.tokenParsed.preferred_username,
          roles: keycloak.tokenParsed.realm_access?.roles || [],
        });
      }
      setReady(true);
    });
  }, []);

  const login = () => keycloak.login();
  const logout = () => keycloak.logout();

  const fetchWithAuth = (url, options = {}) =>
    fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${keycloak.token}`,
      },
    });

  return (
    <AuthContext.Provider value={{ user, ready, login, logout, fetchWithAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
