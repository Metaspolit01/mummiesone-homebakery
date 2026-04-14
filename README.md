# Mummies One Bakery

A simple home-bakery website with:
- **Frontend** (user store) — React app on port 3000
- **Ordering via WhatsApp** — “Place Order” opens WhatsApp with prefilled order text

---

## Setup

### Frontend (User Store)

```bash
cd frontend
npm install
npm run dev
# Opens at http://localhost:3000
```

---

## Project Structure

```
app/
└── frontend/   # React user-facing store
```

## Catalog data

- Update categories and items in [frontend/src/data/catalog.ts](frontend/src/data/catalog.ts)
- Update the WhatsApp number in [frontend/src/pages/Order.tsx](frontend/src/pages/Order.tsx)

## Notes

- For phone-based calls: the "Call Us" button dials **7013386529** directly on mobile.
- Delivery charges are paid separately to Rapido — item price covers product cost only.
