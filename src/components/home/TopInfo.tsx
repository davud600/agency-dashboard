import { useTickets } from "~/context/TicketsContext";

const TotalPriceEUR = () => {
  const { totalProfitsEUR } = useTickets();

  return (
    <div className="flex gap-2 text-sm">
      <span>Total Profits (EUR): </span>
      <span className="font-semibold">{totalProfitsEUR}€</span>
    </div>
  );
};

const TotalPriceCHF = () => {
  const { totalProfitsCHF } = useTickets();

  return (
    <div className="flex gap-2 text-sm">
      <span>Total Profits (CHF): </span>
      <span className="font-semibold">{totalProfitsCHF}₣</span>
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
      <TotalPriceEUR />
      <TotalPriceCHF />
      <TotalNumberOfTickets />
    </div>
  );
};

export default TopInfo;
