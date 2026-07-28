<p align="center">
  <img src="docs/the_block_repo.png" alt="The Block challenge hero image" width="960" />
</p>

# The Block Auction

A frontend prototype for the buyer side of an OPENLANE-style vehicle auction. Buyers can browse inventory, inspect vehicle details, review condition notes, and place local bids against the provided dataset.

## How to Run

```bash
npm install
npm run dev
```

Vite prints a local URL, usually `http://localhost:5173`.

If your browser refuses the local connection, run:

```bash
npm run dev -- --host 0.0.0.0 --port 5173
```

## Stack

- **Frontend:** React, Vite, plain CSS
- **Backend:** None
- **Database:** None; the app reads `data/vehicles.json`

## What I Built

- Inventory browsing with keyword search across make/model, VIN, lot, location, and selling dealership
- Filters for make, body style, and province
- Sort modes for recommended lots, auction time, lowest bid, and condition grade
- Vehicle detail view with photos, specs, title status, seller, condition report, damage notes, reserve context, and buy-now pricing
- Local bidding flow that validates the next bid increment and updates the visible current bid and bid count
- Responsive layout for desktop and mobile

## Project Structure

```text
src/
  components/
    AppHeader.jsx
    Fact.jsx
    InventoryPanel.jsx
    VehicleCard.jsx
    VehicleDetail.jsx
  utils/
    formatters.js
    vehicle.js
  App.jsx
  main.jsx
  styles.css
```

`App.jsx` owns application state and orchestration. Components handle display and interactions for one part of the UI. Utility files hold reusable formatting and auction/bid helpers.

## Testing

Validated with:

```bash
npm run lint
npm run build
npm audit
```

Manual test flow:

1. Search for a make, city, VIN, or lot.
2. Change make, body style, and province filters.
3. Change sort modes and confirm the inventory reorders.
4. Open a vehicle and review photos, specs, condition, seller, and damage notes.
5. Place an invalid low bid and confirm it resets to the minimum.
6. Place a valid bid and confirm current bid and bid count update.

## Assumptions and Scope

This is frontend-only by design. Authentication, persistence, payments, seller workflows, and real-time auction infrastructure are intentionally out of scope for a time-boxed prototype.

## What I'd Do With More Time

- Persist bids in a lightweight API and add optimistic update handling
- Add saved searches and watchlist behavior
- Add richer condition and vehicle history signals
- Add automated browser tests for search, filtering, and bid placement
