import { type NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import Filters from "~/components/home/Filters";
import PageBtns from "~/components/home/PageBtns";
import TicketsTable from "~/components/home/TicketsTable";
import TopInfo from "~/components/home/TopInfo";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Agency Dashboard</title>
        <meta name="description" content="Agency dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-[200vh] w-[200vw] flex-col items-center justify-start bg-[#6200EE] p-0 md:min-h-screen md:w-screen md:p-4">
        <div className="min-h-[195vh] w-[200vw] overflow-x-scroll border border-neutral-600 bg-white p-1 shadow-md sm:rounded-lg md:min-h-[90vh] md:w-full md:p-3">
          {/* Info Container */}
          <TopInfo />

          {/* Filters Container */}
          <Filters />

          {/* Tickets Table */}
          <TicketsTable />

          {/* Page btns */}
          <PageBtns />
        </div>
      </main>
    </>
  );
};

export default Home;
