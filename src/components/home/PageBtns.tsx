import { useTickets } from "~/context/TicketsContext";

const LeftBtn = () => {
  const { page, setPage } = useTickets();

  const onClickHandler = () => {
    const firstPage = 0;

    if (page <= firstPage) {
      setPage(firstPage);
      return;
    }

    setPage((prevPage) => prevPage - 1);
  };

  return (
    <button
      onClick={onClickHandler}
      className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
    >
      <svg
        className="h-4 w-4 fill-neutral-600"
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 320 512"
      >
        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
      </svg>
    </button>
  );
};

const RightBtn = () => {
  const { page, setPage, totalNumberOfTickets, limit } = useTickets();

  const onClickHandler = () => {
    const lastPage = Math.ceil(totalNumberOfTickets / limit) - 1;

    if (page >= lastPage) {
      setPage(lastPage);
      return;
    }

    setPage((prevPage) => prevPage + 1);
  };

  return (
    <button
      onClick={onClickHandler}
      className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200"
    >
      <svg
        className="h-4 w-4 fill-neutral-600"
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 320 512"
      >
        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
      </svg>
    </button>
  );
};

const PageBtns = () => {
  const { page, totalNumberOfTickets, limit } = useTickets();

  return (
    <div className="flex w-full items-center justify-between p-4">
      <LeftBtn />

      <div className="flex w-full items-center justify-center">
        <span>
          Page: {page + 1} / {Math.ceil(totalNumberOfTickets / limit)}
        </span>
      </div>

      <RightBtn />
    </div>
  );
};

export default PageBtns;
