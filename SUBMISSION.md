# The Block Auction

## How to Run

```bash
npm install
npm run dev
```

Open the Vite URL printed in the terminal, usually `http://localhost:5173`.

If needed:

```bash
npm run dev -- --host 0.0.0.0 --port 5173
```

## Time Spent

Built as a focused prototype: scaffold, structured React components, inventory/detail/bid flow, responsive styling, documentation, and checks.

## Assumptions and Scope

This is a frontend-only buyer experience. Bid updates are local state only. Authentication, checkout, seller tooling, and persistent auction infrastructure are outside the prototype scope.

## Stack

- **Frontend:** React + Vite
- **Backend:** None
- **Database:** None; local JSON dataset

## What I Built

A vehicle auction browsing experience with search, filters, sortable inventory, detailed vehicle inspection, condition and damage notes, reserve context, and a validated bid flow.

## Notable Decisions

I kept `App.jsx` focused on state and orchestration, split UI into small files in `src/components`, and moved shared formatting and auction helpers into `src/utils`.

## Testing

Ran:

```bash
npm run lint
npm run build
npm audit
```

## What I'd Do With More Time

Add persisted bids, watchlists, richer vehicle-history data, and browser-level regression tests for core flows.
