# ride-hailing-platform
# 🚖 RideHail App

A full‑stack ride‑hailing platform built with **React (Vite)** on the frontend and **Node.js/Express + MongoDB** on the backend.  
It supports **riders** requesting trips, **drivers** managing availability, **real‑time trip tracking** via Socket.IO, and a **dispute center** for resolving issues.

---

## ✨ Features
- 🔐 User authentication (login/register with JWT)
- 👥 Role‑based dashboards (Rider vs Driver)
- 🚗 Request rides and track them live
- 📊 Driver dashboard with trips & earnings
- ⭐ Rate completed trips
- ⚖️ Dispute center for trip issues
- ⚡ Real‑time updates with Socket.IO
- 🎨 Global styles for consistent UI

---
```
## 📂 Project Structure
client/
├── public/
│   └── index.html
├── src/
│   ├── components/        # Reusable UI components
│   ├── context/           # AuthContext
│   ├── pages/             # App pages (Home, Login, Register, Profile, etc.)
│   ├── services/          # API service (axios wrapper)
│   ├── sockets/           # socket.js (Socket.IO client)
│   ├── styles/            # global.css
│   └── utils/             # validators.js
├── vite.config.js
├── .env
├── .gitignore
└── README.md

Code
```
---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/jimmyopot-alando/ridehail-app.git
cd ridehail-app
2. Install dependencies
bash
npm install
3. Configure environment variables
Create a .env file in the root:

env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ridehail
JWT_SECRET=your_jwt_secret_key_here
SOCKET_URL=http://localhost:5000
4. Run the development server
bash
npm run dev
Frontend runs at: http://localhost:3000 (localhost in Bing)

Backend runs at: http://localhost:5000 (localhost in Bing)

🚀 Build for Production
bash
npm run build
Output will be in the dist/ folder.

🛠️ Tech Stack
Frontend: React, Vite, Axios

Backend: Node.js, Express, MongoDB

Real‑time: Socket.IO

Auth: JWT

Styling: CSS (global.css)

📌 Notes
Ensure MongoDB is running locally or update MONGO_URI in .env.

Socket.IO requires backend server running on the same port defined in .env.

Use validators.js for consistent input validation across forms.