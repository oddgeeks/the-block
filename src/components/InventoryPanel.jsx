import { Search, SlidersHorizontal } from "lucide-react";
import VehicleCard from "./VehicleCard.jsx";

function InventoryPanel({
  bodyStyle,
  bodyStyles,
  bidState,
  make,
  makes,
  onBodyStyleChange,
  onMakeChange,
  onProvinceChange,
  onQueryChange,
  onSelectVehicle,
  onSortChange,
  province,
  provinces,
  query,
  selectedVehicleId,
  sort,
  vehicles,
}) {
  return (
    <section className="inventory-panel" aria-label="inventory">
      <div className="search-row">
        <label className="search-box">
          <Search size={18} />
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search make, VIN, lot, dealership"
          />
        </label>
        <label className="select-label">
          <SlidersHorizontal size={18} />
          <select value={sort} onChange={(event) => onSortChange(event.target.value)}>
            <option value="recommended">Recommended</option>
            <option value="ending">Auction time</option>
            <option value="price-low">Lowest bid</option>
            <option value="grade">Best condition</option>
          </select>
        </label>
      </div>

      <div className="filters" aria-label="inventory filters">
        <select value={make} onChange={(event) => onMakeChange(event.target.value)}>
          <option value="all">All makes</option>
          {makes.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
        <select value={bodyStyle} onChange={(event) => onBodyStyleChange(event.target.value)}>
          <option value="all">All body styles</option>
          {bodyStyles.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
        <select value={province} onChange={(event) => onProvinceChange(event.target.value)}>
          <option value="all">All provinces</option>
          {provinces.map((value) => <option key={value} value={value}>{value}</option>)}
        </select>
      </div>

      <div className="result-count">{vehicles.length} matching vehicles</div>

      <div className="vehicle-list">
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            active={vehicle.id === selectedVehicleId}
            bidState={bidState}
            onSelect={() => onSelectVehicle(vehicle.id)}
          />
        ))}
      </div>
    </section>
  );
}

export default InventoryPanel;
