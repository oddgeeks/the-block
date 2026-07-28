import { BadgeDollarSign, CarFront, Gavel } from "lucide-react";

function AppHeader({ activeCount, totalCount }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">OPENLANE buyer prototype</p>
        <h1>The Block Auction</h1>
      </div>
      <div className="market-snapshot" aria-label="market snapshot">
        <span><CarFront size={18} /> {totalCount} lots</span>
        <span><Gavel size={18} /> {activeCount} active</span>
        <span><BadgeDollarSign size={18} /> CAD wholesale</span>
      </div>
    </header>
  );
}

export default AppHeader;
