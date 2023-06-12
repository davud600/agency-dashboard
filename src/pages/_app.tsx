import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import FiltersProvider from "~/context/FiltersContext";
import TicketsProvider from "~/context/TicketsContext";
import AdminProvider from "~/context/AdminContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <AdminProvider>
        <TicketsProvider>
          <FiltersProvider>
            <Component {...pageProps} />
          </FiltersProvider>
        </TicketsProvider>
      </AdminProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
