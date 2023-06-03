import { useTickets } from "~/context/TicketsContext";

const TotalPrice = () => {
  const { totalProfits } = useTickets();

  return (
    <div className="flex gap-2 text-sm">
      <span>Total Profits: </span>
      <span className="font-semibold">{totalProfits}€</span>
    </div>
  );
};

const TotalNumberOfTickets = () => {
  const { totalNumberOfTickets } = useTickets();

  return (
    <div className="flex gap-2 text-sm">
      <span>Total Tickets: </span>
      <span className="font-semibold">{totalNumberOfTickets}</span>
    </div>
  );
};

const TopInfo = () => {
  return (
    <div className="my-2 flex w-full justify-start gap-8">
      <TotalPrice />
      <TotalNumberOfTickets />
    </div>
  );
};

export default TopInfo;
