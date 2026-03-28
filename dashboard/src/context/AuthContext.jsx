//create context for user, so that the server doesnt get hit with /user request when accessing every page

import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const res = await axios.get("http://localhost:8080/user", {
        withCredentials: true,
      });

      const hasModernUser = res.data?.success === true && !!res.data?.user;
      const hasLegacyUser = res.data?.status === true && !!res.data?.user;

      if (hasModernUser) {
        setUser(res.data.user);
      } else if (hasLegacyUser) {
        const legacyUser = res.data.user;
        setUser(
          typeof legacyUser === "string"
            ? { username: legacyUser }
            : legacyUser,
        );
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, refreshUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};