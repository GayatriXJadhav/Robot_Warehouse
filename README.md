# Robot_Warehouse

# Robot Warehouse

## Project Overview
Robot Warehouse is a web-based dashboard to manage robots and tasks in a warehouse environment.  
It provides real-time bot statuses, task allocation, and analytics to monitor efficiency.

---

## Tech Stack
- **Frontend:** React.js, Vite, TailwindCSS
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM
- **Charts:** Recharts (for analytics)
- **Deployment:** https://robot-warehouse.onrender.com

---

## Folder Structure
src/
├─ components/ # Reusable UI components
├─ pages/ # Page-level components
├─ app/ # Router configuration (AppRoute.jsx)
├─ redux/ # State management (slices, store)
├─ assets/ # Images, icons
├─ App.jsx
└─ main.jsx


## How to Run the Project

### Install dependencies
cd client
npm install

### Run locally
npm run dev

##Data Flow

Redux store holds the global state:
auth: user authentication status
bots: all bot statuses
tasks: task queue
Components dispatch actions to update state.
Components subscribe to Redux store to render updated values.

##State Management Reasoning
Redux Toolkit used for centralized state and predictable updates.
Actions and reducers provide clear separation between UI and data logic.
Async operations (like fetching bots) can be easily managed with thunk or custom middleware.
