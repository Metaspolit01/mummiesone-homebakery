# Mummies One Bakery

A local bakery ordering system with:
- **Frontend** (user store) — React app on port 3000
- **Backend** (API) — Node.js/Express/MongoDB on port 5000
- **Admin** (dashboard) — React admin app on port 3001

---

## Setup

Open **three separate terminals** and run each part independently.

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env — add your MongoDB Atlas connection string and a JWT secret
npm run dev
# Runs on http://localhost:5000
```

### 2. Frontend (User Store)

```bash
cd frontend
npm install
npm run dev
# Opens at http://localhost:3000
```

### 3. Admin Panel

```bash
cd admin
npm install
npm run dev
# Opens at http://localhost:3001
```

---

## Admin Login

- **URL:** http://localhost:3001
- **Username:** `admin`
- **Password:** `admin`

---

## Environment Variables (`backend/.env`)

```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/mummies-one
JWT_SECRET=any-random-secret
PORT=5000
```

> The backend auto-seeds categories (Cakes, Chocolates, Brownies, Cookies, Donuts) and sample items on first run.

---

## Project Structure

```
app/
├── backend/    # Node.js + Express + MongoDB API
├── frontend/   # React user-facing store
└── admin/      # React admin dashboard
```

## Notes

- Start the **backend first** before launching frontend or admin.
- Make sure your MongoDB Atlas cluster is running and the connection string in `.env` is correct.
- For phone-based calls: the "Call Us" button dials **7013386529** directly on mobile.
- Delivery charges are paid separately to Rapido — item price covers product cost only.
