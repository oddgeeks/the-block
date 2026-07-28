import { useMemo, useState } from "react";
import AppHeader from "./components/AppHeader.jsx";
import InventoryPanel from "./components/InventoryPanel.jsx";
import VehicleDetail from "./components/VehicleDetail.jsx";
import { BID_INCREMENT, bidCount, currentAmount, vehicleName } from "./utils/vehicle.js";
import vehicles from "../data/vehicles.json";

function getUnique(key) {
  return [...new Set(vehicles.map((vehicle) => vehicle[key]))].sort();
}

const bodyStyles = getUnique("body_style");
const provinces = getUnique("province");
const makes = getUnique("make");

function App() {
  const [query, setQuery] = useState("");
  const [bodyStyle, setBodyStyle] = useState("all");
  const [province, setProvince] = useState("all");
  const [make, setMake] = useState("all");
  const [sort, setSort] = useState("recommended");
  const [selectedId, setSelectedId] = useState(vehicles[0]?.id);
  const [bidState, setBidState] = useState({});
  const [bidDrafts, setBidDrafts] = useState({});

  const filteredVehicles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return vehicles
      .filter((vehicle) => matchesInventoryFilters(vehicle, {
        bodyStyle,
        make,
        province,
        query: normalizedQuery,
      }))
      .sort((first, second) => compareVehicles(first, second, sort, bidState));
  }, [bidState, bodyStyle, make, province, query, sort]);

  const selectedVehicle = filteredVehicles.find((vehicle) => vehicle.id === selectedId) ?? filteredVehicles[0] ?? vehicles[0];

  function updateBidDraft(vehicle, value) {
    setBidDrafts((drafts) => ({ ...drafts, [vehicle.id]: value }));
  }

  function placeBid(vehicle) {
    const minimumBid = currentAmount(vehicle, bidState) + BID_INCREMENT;
    const proposedBid = Number(bidDrafts[vehicle.id] ?? minimumBid);

    if (!Number.isFinite(proposedBid) || proposedBid < minimumBid) {
      updateBidDraft(vehicle, String(minimumBid));
      return;
    }

    setBidState((state) => ({
      ...state,
      [vehicle.id]: {
        current_bid: proposedBid,
        bid_count: bidCount(vehicle, state) + 1,
        last_bid_at: new Date().toISOString(),
      },
    }));
    updateBidDraft(vehicle, String(proposedBid + BID_INCREMENT));
  }

  return (
    <div className="app-shell">
      <AppHeader activeCount={vehicles.filter((vehicle) => vehicle.current_bid).length} totalCount={vehicles.length} />

      <main className="layout">
        <InventoryPanel
          bodyStyle={bodyStyle}
          bodyStyles={bodyStyles}
          bidState={bidState}
          make={make}
          makes={makes}
          onBodyStyleChange={setBodyStyle}
          onMakeChange={setMake}
          onProvinceChange={setProvince}
          onQueryChange={setQuery}
          onSelectVehicle={setSelectedId}
          onSortChange={setSort}
          province={province}
          provinces={provinces}
          query={query}
          selectedVehicleId={selectedVehicle?.id}
          sort={sort}
          vehicles={filteredVehicles}
        />

        <VehicleDetail
          vehicle={selectedVehicle}
          bidState={bidState}
          bidDraft={bidDrafts[selectedVehicle?.id]}
          onBack={() => setSelectedId(filteredVehicles[0]?.id)}
          onDraftChange={updateBidDraft}
          onPlaceBid={placeBid}
        />
      </main>
    </div>
  );
}

function matchesInventoryFilters(vehicle, filters) {
  const searchable = [
    vehicleName(vehicle),
    vehicle.trim,
    vehicle.vin,
    vehicle.lot,
    vehicle.selling_dealership,
    vehicle.city,
    vehicle.province,
  ]
    .join(" ")
    .toLowerCase();

  return (
    (!filters.query || searchable.includes(filters.query)) &&
    (filters.bodyStyle === "all" || vehicle.body_style === filters.bodyStyle) &&
    (filters.province === "all" || vehicle.province === filters.province) &&
    (filters.make === "all" || vehicle.make === filters.make)
  );
}

function compareVehicles(first, second, sort, bidState) {
  if (sort === "ending") {
    return new Date(first.auction_start) - new Date(second.auction_start);
  }

  if (sort === "price-low") {
    return currentAmount(first, bidState) - currentAmount(second, bidState);
  }

  if (sort === "grade") {
    return second.condition_grade - first.condition_grade;
  }

  return (
    bidCount(second, bidState) - bidCount(first, bidState) ||
    second.condition_grade - first.condition_grade
  );
}

export default App;
