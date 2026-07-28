import { ChevronRight, Gauge, MapPin } from "lucide-react";
import { number } from "../utils/formatters.js";
import { auctionStatus, currentAmount, money, vehicleName } from "../utils/vehicle.js";

function VehicleCard({ vehicle, active, bidState, onSelect }) {
  const status = auctionStatus(vehicle);

  return (
    <button className={`vehicle-card ${active ? "is-active" : ""}`} onClick={onSelect}>
      <img src={vehicle.images[0]} alt={`${vehicleName(vehicle)} exterior`} loading="lazy" />
      <span className={`status-pill ${status.tone}`}>{status.label}</span>
      <div className="card-body">
        <div>
          <p className="lot">{vehicle.lot}</p>
          <h2>{vehicleName(vehicle)}</h2>
          <p>{vehicle.trim}</p>
        </div>
        <ChevronRight className="card-arrow" size={18} />
      </div>
      <div className="card-meta">
        <span><Gauge size={16} /> {number.format(vehicle.odometer_km)} km</span>
        <span><MapPin size={16} /> {vehicle.city}</span>
      </div>
      <div className="bid-strip">
        <span>Current bid</span>
        <strong>{money(currentAmount(vehicle, bidState))}</strong>
      </div>
    </button>
  );
}

export default VehicleCard;
