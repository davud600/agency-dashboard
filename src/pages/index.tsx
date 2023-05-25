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

      <main className="flex min-h-screen flex-col items-center justify-center bg-[#6200EE]">
        <div className="overflow-x-auto border border-neutral-600 bg-white p-4 shadow-md sm:rounded-lg">
          {/* Add new Ticket button */}
          <div className="mb-4 flex w-full items-center justify-end">
            <AddTicketBtn />
          </div>

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
