import { type NextPage } from "next";
import Head from "next/head";
import { TicketsList } from "~/components/home/TicketsList";
import Filters from "~/components/home/Filters";
import { useTickets } from "~/context/TicketsContext";

const TicketsTable = () => {
  const { filteredTickets } = useTickets();

  return (
    <table className="w-full text-left text-sm text-gray-500">
      <thead className="bg-gray-50 text-xs uppercase text-gray-700">
        <tr>
          <th scope="col" className="px-6 py-3">
            Booking Number
          </th>
          <th scope="col" className="px-6 py-3">
            Full Name
          </th>
          <th scope="col" className="px-6 py-3">
            E-Mail
          </th>
          <th scope="col" className="px-6 py-3">
            Phone Number
          </th>
          <th scope="col" className="px-6 py-3">
            Price
          </th>
          <th scope="col" className="px-6 py-3">
            Status
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <TicketsList filteredTickets={filteredTickets} />
      </tbody>
    </table>
  );
};

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
