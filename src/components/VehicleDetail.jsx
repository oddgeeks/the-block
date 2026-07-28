import { useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  Fuel,
  Gauge,
  Gavel,
  ImageOff,
  MapPin,
  Sparkles,
} from "lucide-react";
import Fact from "./Fact.jsx";
import { number, relativeDate } from "../utils/formatters.js";
import { auctionStatus, BID_INCREMENT, bidCount, currentAmount, money, vehicleName } from "../utils/vehicle.js";

function VehicleDetail({ vehicle, bidState, bidDraft, onBack, onDraftChange, onPlaceBid }) {
  const [activeImage, setActiveImage] = useState(0);

  if (!vehicle) {
    return (
      <section className="detail-panel empty-state">
        <ImageOff size={36} />
        <p>No vehicle selected.</p>
      </section>
    );
  }

  const currentBid = currentAmount(vehicle, bidState);
  const minimumBid = currentBid + BID_INCREMENT;
  const status = auctionStatus(vehicle);
  const draftValue = bidDraft ?? String(minimumBid);
  const reserveMet = vehicle.reserve_price == null || currentBid >= vehicle.reserve_price;
  const latestBid = bidState[vehicle.id]?.last_bid_at;

  return (
    <section className="detail-panel" aria-label="vehicle details">
      <button className="mobile-back" onClick={onBack}>
        <ArrowLeft size={18} /> Inventory
      </button>

      <div className="photo-stage">
        <img src={vehicle.images[activeImage] ?? vehicle.images[0]} alt={`${vehicleName(vehicle)} photo ${activeImage + 1}`} />
        <span className={`status-pill ${status.tone}`}>{status.label}</span>
      </div>
      <div className="thumb-row">
        {vehicle.images.map((image, index) => (
          <button
            key={image}
            className={index === activeImage ? "is-active" : ""}
            onClick={() => setActiveImage(index)}
            aria-label={`Show photo ${index + 1}`}
          >
            <img src={image} alt="" />
          </button>
        ))}
      </div>

      <div className="detail-head">
        <div>
          <p className="lot">{vehicle.lot} - {vehicle.vin}</p>
          <h2>{vehicleName(vehicle)} {vehicle.trim}</h2>
          <p>{vehicle.exterior_color} over {vehicle.interior_color} - {vehicle.body_style}</p>
        </div>
        <div className="condition-badge">
          <Sparkles size={18} />
          <strong>{vehicle.condition_grade.toFixed(1)}</strong>
          <span>grade</span>
        </div>
      </div>

      <div className="bid-panel">
        <div>
          <span>Current bid</span>
          <strong>{money(currentBid)}</strong>
          <small>{bidCount(vehicle, bidState)} bids - minimum next bid {money(minimumBid)}</small>
        </div>
        <label>
          Bid amount
          <input
            type="number"
            min={minimumBid}
            step={BID_INCREMENT}
            value={draftValue}
            onChange={(event) => onDraftChange(vehicle, event.target.value)}
          />
        </label>
        <button className="primary-action" onClick={() => onPlaceBid(vehicle)}>
          <Gavel size={18} /> Place bid
        </button>
        {latestBid && (
          <p className="success-note">
            <CheckCircle2 size={16} /> Bid placed at {new Date(latestBid).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
          </p>
        )}
      </div>

      <div className="facts-grid">
        <Fact icon={<CalendarClock size={18} />} label="Auction start" value={relativeDate.format(new Date(vehicle.auction_start))} />
        <Fact icon={<Fuel size={18} />} label="Powertrain" value={`${vehicle.engine}, ${vehicle.transmission}`} />
        <Fact icon={<Gauge size={18} />} label="Mileage" value={`${number.format(vehicle.odometer_km)} km`} />
        <Fact icon={<MapPin size={18} />} label="Seller" value={`${vehicle.selling_dealership}, ${vehicle.city}`} />
        <Fact label="Drivetrain" value={vehicle.drivetrain} />
        <Fact label="Fuel" value={vehicle.fuel_type} />
        <Fact label="Title" value={vehicle.title_status} />
        <Fact label="Buy now" value={money(vehicle.buy_now_price)} />
      </div>

      <div className="condition-section">
        <div>
          <h3>Condition report</h3>
          <p>{vehicle.condition_report}</p>
        </div>
        <div>
          <h3>Bid confidence</h3>
          <p>{reserveMet ? "Reserve is met or not listed." : `Reserve has not been met. Seller reserve is ${money(vehicle.reserve_price)}.`}</p>
        </div>
      </div>

      <div className="damage-section">
        <h3>Damage notes</h3>
        {vehicle.damage_notes.length > 0 ? (
          <ul>
            {vehicle.damage_notes.map((note) => (
              <li key={note}><AlertTriangle size={16} /> {note}</li>
            ))}
          </ul>
        ) : (
          <p>No damage notes listed.</p>
        )}
      </div>
    </section>
  );
}

export default VehicleDetail;
