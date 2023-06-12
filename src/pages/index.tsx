import { type GetServerSideProps, type NextPage } from "next";
import Head from "next/head";
import Filters from "~/components/home/Filters";
import PageBtns from "~/components/home/PageBtns";
import TicketsTable from "~/components/home/TicketsTable";
import TopInfo from "~/components/home/TopInfo";
import { prisma } from "~/server/db";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // delete all expired sessions, (doing it here since i cant anywhere else cus serverless)
  await prisma.adminSession.deleteMany({
    where: {
      expires: {
        lt: new Date(Date.now()),
      },
    },
  });

  const { adminSession } = ctx.req.cookies;

  if (!!!adminSession) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const adminSessionObj = JSON.parse(adminSession) as unknown as {
    token: string;
  };

  const sess = await prisma.adminSession.findFirst({
    where: {
      id: adminSessionObj.token,
    },
  });

  if (!!!sess || new Date(sess.expires) <= new Date(Date.now())) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Venera Tours</title>
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
