# Recent Innovations in Generative AI – Full-Stack Analytics Dashboard
A secure Single Page Application (SPA) built with **React**, **Node.js**, and **MySQL** — deployed on a single DigitalOcean server with NGINX + PM2.

## How to Use the Application

Follow the steps below to create an account, log in, and explore all parts of the Generative AI Insights Dashboard.

---

## Create an Account

1. Open the application in your browser.
2. You will be taken to the **Login page**, which includes:
   - A video background  
   - Login form  
   - “Register” option  
3. Click the **Register** button under the form.
4. Enter:
   - **Username**
   - **Password**
5. Click **Sign Up**.
6. You will see a confirmation message:  
   **“Registration successful. You can now log in.”**

Your account is now created in the MySQL database.

---

## Log In

1. On the Login form, enter the username and password you registered.
2. (Optional) Enable **Remember Me** to save your credentials for future visits.
3. Click **Log In**.
4. If authenticated successfully, the backend issues a **JWT token**, and you are automatically redirected to the **Dashboard** page.

You will no longer see the Login page unless you log out.

---

## 3️⃣ Navigate the Website

After logging in, the **top navigation bar** is visible on every page.  
You can explore the site using these tabs:

### Dashboard
- Shows a 200-word summary of global Generative AI funding trends.
- Includes a reference link to the EY report.
- Also displays a technical overview of the project’s architecture.

---

### Summary
This page includes multiple analytics components:

- **Dynamic YoY Funding Trend Chart**  
  Pulled from the backend `/api/charts/summary-chart`.

- **Deal Count Bar Chart**

- **Regional Investment Breakdown (Doughnut Chart)**

- **Forecast Analysis**

- **Momentum Score Gauge**

All graphs and insights are designed to give a high-level view of GenAI market dynamics.

---

### Reports
- Contains a **second dynamic chart** powered by `/api/charts/reports-chart`.
- Clicking bars updates the insights text dynamically.
- Includes business interpretation of the chart results.

---

## Logout

At any time, click **Logout** on the top navigation bar.

This will:

- Remove the JWT token  
- Clear "Remember Me" data (if disabled)  
- Redirect you back to the **Login page**

All protected pages (Dashboard, Summary, Reports) will now be inaccessible until you log in again.

---

## Access Control Summary

- You **must log in** to access Dashboard, Summary, and Reports.
- If you try to manually visit a protected route (e.g., `/summary` or `/reports`) without a valid token, the app automatically redirects you to the Login page.
- JWT validation is enforced on every backend API call.

---

This interaction flow demonstrates a complete user journey through your secure SPA, covering authentication, navigation, chart exploration, and logout.


---

## 📌 Project Overview

This project delivers a complete **Generative AI Insights Dashboard** featuring interactive charts, secure authentication, and real-time analytics sourced from backend APIs. It highlights venture-capital funding trends, regional investment patterns, and market momentum in the global Generative AI landscape (2023–H1 2025).

The application is a **fully decoupled SPA**:

- **Frontend:** React (served by NGINX on port 80)  
- **Backend:** Node.js/Express (running on port 3000)  
- **Database:** MySQL (same server)  
- **Auth:** JWT with protected routes  

Users begin at a login screen, then access:

- **Dashboard** – A 200-word narrative summary  
- **Summary** – Multi-chart funding insights (1 dynamic API chart)  
- **Reports** – Additional dynamic analytics (2nd chart API)

---

## 🚀 Features

### 🔐 Authentication  
- Login, registration, and logout  
- JWT-secured routes  
- Remember-me functionality  
- Redirect to Dashboard after login  
- Access control: protected Pages require a valid token  

### 📊 Charts & Analytics  
- Two fully dynamic charts pulled from backend APIs  
- Additional supporting static charts  
- Built using **Chart.js**  
- API endpoints:
  - `/api/charts/summary-chart`
  - `/api/charts/reports-chart`

### 🖥 SPA Frontend  
- Built using **React + Vite**  
- Responsive, accessible design  
- WCAG-friendly ARIA labels & semantic structure  
- Video background on Login screen  
- Top navigation on all authenticated pages  

### 🗄 Backend Architecture  
- Node.js + Express  
- JWT authentication middleware  
- MySQL connection pooling  
- Environment-based configuration via `.env`  
- Modularized route structure

### 💽 MySQL Database  
Tables include:
- `users`
- `summary_funding`
- `reports_funding`

---

## 📁 Project Structure

project/
├── Backend/
│ ├── src/
│ │ ├── index.js
│ │ ├── authRoutes.js
│ │ ├── chartRoutes.js
│ │ ├── database.js
│ │ └── middleware/authMiddleware.js
│ ├── package.json
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ │ ├── Login.jsx
│ │ │ ├── Dashboard.jsx
│ │ │ ├── Summary.jsx
│ │ │ └── Reports.jsx
│ │ ├── Layout.jsx
│ ├── public/ai-trends.mp4
│ ├── index.css
│ └── vite.config.js
│
└── README.md

---

## API Endpoints

---

### **Auth Endpoints**

| Method | Endpoint              | Description           |
|--------|------------------------|------------------------|
| POST   | `/api/auth/register`  | Register user          |
| POST   | `/api/auth/login`     | Login & receive JWT    |

---

### **Chart Data Endpoints**

| Method | Endpoint                     | Description                |
|--------|-------------------------------|-----------------------------|
| GET    | `/api/charts/summary-chart`  | Summary page chart data     |
| GET    | `/api/charts/reports-chart`  | Reports page chart data     |

## 📊 Data Source

This dashboard uses insights from:

- **EY — Generative AI VC Funding Report 2025**  
  https://www.ey.com/en_ie/newsroom/2025/06/generative-ai-vc-funding-49-2b-h1-2025-ey-report