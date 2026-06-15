<div align="center">
  <h1>📈 Zenvest (Zerodha Clone)</h1>
  <p>A full-stack stock trading and investment platform built with the MERN stack.</p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  </p>
</div>

---

## 📖 Table of Contents
- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Installation & Setup](#-installation--setup)
- [API Overview](#-api-overview)
- [License](#-license)

---

## 🚀 Project Overview

**Zenvest** is a comprehensive, production-ready clone of [Zerodha](https://zerodha.com/), India's largest retail stockbroker. It simulates the core functionalities of a trading platform, offering users the ability to authenticate securely, view interactive market charts, manage their investment portfolios, track holdings and positions, and place simulated orders.

The application is modularized into three distinct parts:
1. **Frontend (Landing Page)**: A public-facing informative site that describes the platform's features, pricing, and about sections.
2. **Dashboard (Trading App)**: A protected, interactive SPA (Single Page Application) where logged-in users manage their assets and execute trades.
3. **Backend API**: A secure Node.js REST API that powers both client applications, securely handling authentication, database interactions, and business logic.

---

## ✨ Key Features

- **Secure Authentication**: User registration and login utilizing JWT (JSON Web Tokens), bcrypt hashing, and Passport.js. Secure HTTP-only cookies are used for session management.
- **Interactive Dashboard**: A highly responsive user dashboard built with React and MUI.
- **Portfolio Management**: Real-time tracking of:
  - **Holdings**: Long-term investments and stock holdings.
  - **Positions**: Intraday active trades.
  - **Funds**: Virtual wallet balance and fund management.
- **Order Execution**: Place buy and sell orders seamlessly.
- **Data Visualization**: Dynamic stock charts powered by Chart.js & react-chartjs-2.
- **Responsive UI/UX**: Draggable components, skeleton loading states, and toast notifications for an exceptional user experience.

---

## 🛠️ Architecture & Tech Stack

### 🖥️ Client Applications (`/frontend` & `/dashboard`)
- **Core Framework**: React.js 19
- **Build Tool**: Vite (Lightning-fast HMR and optimized builds)
- **Routing**: React Router DOM (v7)
- **UI/Styling**: Material UI (MUI), Emotion, React Bootstrap
- **Data Visualization**: Chart.js, react-chartjs-2
- **State & Networking**: Axios (API requests), react-cookie
- **Utilities**: react-toastify (Notifications), react-draggable, react-spinners

### ⚙️ Server (`/backend`)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Atlas) with Mongoose ODM
- **Authentication**: Passport.js (Local Strategy), JWT
- **Validation**: Joi, express-joi-validation
- **Security & Middleware**: CORS, body-parser, cookie-parser, bcrypt

---

## 📂 Project Structure

```text
Zenvest (Zerodha)/
│
├── backend/                  # RESTful API Server
│   ├── controllers/          # Business logic for routes
│   ├── middlewares/          # Custom express middlewares (auth, etc.)
│   ├── models/               # Mongoose schemas (Users, Orders, Holdings, Positions, Funds)
│   ├── routes/               # Express API routes definition
│   ├── schemas/              # Joi validation schemas
│   ├── utils/                # Helper functions
│   └── app.js                # Server entry point
│
├── dashboard/                # Main Trading Dashboard (React + Vite)
│   ├── src/
│   │   ├── components/       # (charts, dashboard, funds, holdings, orders, positions, etc.)
│   │   └── index.css         # Global dashboard styles
│   └── vite.config.js
│
└── frontend/                 # Public Landing Pages (React + Vite)
    ├── src/
    │   ├── landing_page/     # Public components (Home, About, Signup)
    │   └── common_comp/      # Reusable UI components (Navbar, Footer)
    └── vite.config.js
```

---

## 🔒 Environment Variables

To run this project, you will need to add the following environment variables.

### Backend (`/backend/.env`)
Create a `.env` file in the `/backend` directory:
```env
PORT=<YOUR_PORT_NUMBER>
MONGO_URL=<YOUR_MONGODB_CONNECTION_STRING>
JWT_SECRET=<YOUR_JWT_SECRET_KEY>
FRONTEND_URL=<YOUR_FRONTEND_URL>
DASHBOARD_URL=<YOUR_DASHBOARD_URL>
```

### Dashboard (`/dashboard/.env`)
Create a `.env` file in the `/dashboard` directory:
```env
VITE_BACKEND_URL=<YOUR_BACKEND_URL>
```

### Frontend (`/frontend/.env`)
Create a `.env` file in the `/frontend` directory:
```env
VITE_BACKEND_URL=<YOUR_BACKEND_URL>
```

---

## 🏁 Installation & Setup

Follow these steps to run the application locally on your machine.

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Git](https://git-scm.com/)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or local MongoDB instance.

### 2. Clone the Repository
```bash
git clone <repository-url>
cd "Zenvest (Zerodha)"
```

### 3. Start the Backend Server
```bash
cd backend
npm install
# Ensure your .env file is set up correctly
npm run test  # Runs nodemon for development
```

### 4. Start the Frontend Application
In a new terminal window:
```bash
cd frontend
npm install
npm run dev
```

### 5. Start the Dashboard Application
In a new terminal window:
```bash
cd dashboard
npm install
npm run dev
```

The applications should now be running concurrently:
- **Backend**: `http://localhost:8080`
- **Frontend**: `http://localhost:5173`
- **Dashboard**: `http://localhost:5174`

---

## 📡 API Overview

While the full API documentation is extensive, here are the core models managed by the backend:
- **`UsersModel`**: Manages user accounts, authentication credentials, and profiles.
- **`HoldingsModel`**: Tracks the user's long-term stock purchases and current portfolio value.
- **`PositionsModel`**: Tracks intraday trades and short-term positions.
- **`OrdersModel`**: Records all transaction history (Buy/Sell executions).
- **`FundsModel`**: Manages the user's available trading margin and cash balance.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 
Feel free to check the issues page if you want to contribute.

## 📝 License

This project is open-sourced under the **ISC License**.
