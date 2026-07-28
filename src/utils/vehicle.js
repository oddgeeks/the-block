import { currency } from "./formatters.js";

export const BID_INCREMENT = 500;

export function money(value) {
  return value == null ? "No bid" : currency.format(value);
}

export function vehicleName(vehicle) {
  return `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
}

export function currentAmount(vehicle, bidState) {
  return bidState[vehicle.id]?.current_bid ?? vehicle.current_bid ?? vehicle.starting_bid;
}

export function bidCount(vehicle, bidState) {
  return bidState[vehicle.id]?.bid_count ?? vehicle.bid_count;
}

export function auctionStatus(vehicle) {
  const start = new Date(vehicle.auction_start);
  const hoursUntilStart = (start.getTime() - Date.now()) / 36e5;

  if (hoursUntilStart <= 0) {
    return { label: "Live now", tone: "hot" };
  }

  if (hoursUntilStart <= 24) {
    return { label: "Opening soon", tone: "soon" };
  }

  return { label: "Scheduled", tone: "quiet" };
}
