import { type NextPage } from "next";
import Head from "next/head";
import Filters from "~/components/home/Filters";
import { AddTicketBtn } from "~/components/home/AddTicketComponents";
import TicketsTable from "~/components/home/TicketsTable";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Agency Dashboard</title>
        <meta name="description" content="Agency dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-start bg-[#6200EE] p-0 md:p-4">
        <div className="min-h-[90vh] w-full overflow-x-scroll border border-neutral-600 bg-white p-1 shadow-md sm:rounded-lg md:p-3">
          {/* Filters Container */}
          <Filters />

          {/* Tickets Table */}
          <TicketsTable />
        </div>
      </main>
    </>
  );
};

export default Home;
