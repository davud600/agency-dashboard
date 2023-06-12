import { createContext, type ReactNode, useContext, useState } from "react";
import { type AdminSession } from "~/interfaces/admin";
import Cookies from "js-cookie";

interface AdminContext {
  adminSession: AdminSession;
  authorizeClient: ({ adminSession }: { adminSession: AdminSession }) => void;
  validateAuthorization: () => boolean;
}

export const AdminContext = createContext<AdminContext>({
  adminSession: {
    token: "",
  },
  authorizeClient: () => {
    return;
  },
  validateAuthorization: () => false,
});

export const useAdmin = () => {
  return useContext(AdminContext);
};

const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string>("");
  const [expires, setExpires] = useState<Date | undefined>();

  const validateAuthorization = (): boolean => {
    return token !== "";
  };

  const authorizeClient = ({
    adminSession,
  }: {
    adminSession: AdminSession;
  }) => {
    setToken(adminSession.token);
    setExpires(adminSession.expires);

    // save to cookie
    Cookies.set("adminSession", JSON.stringify(adminSession));
  };

  const value = {
    adminSession: {
      token,
      expires,
    },
    authorizeClient,
    validateAuthorization,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminProvider;
