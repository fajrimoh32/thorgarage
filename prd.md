# PRD
# Neo Analytics Dashboard
Version: 1.0
Author: Muhammad Fajri
Status: Planning

---

# 1. Overview

Neo Analytics Dashboard merupakan sebuah web application modern yang berfungsi sebagai pusat monitoring data bisnis secara realtime.

Aplikasi memiliki tampilan Neo Brutalism Modern dengan dukuran enterprise dashboard.

Target pengguna:

- Administrator
- Owner
- Manager
- Staff

Dashboard akan memiliki berbagai macam analytic chart, management data, user management, activity log, notification serta setting.

Project berjalan secara local menggunakan React.

---

# 2. Goals

Membuat dashboard yang:

✔ Cepat

✔ Responsive

✔ Mudah digunakan

✔ Modern

✔ Dark Mode

✔ Light Mode

✔ Professional

✔ Mudah dikembangkan menjadi SaaS

---

# 3. Tech Stack

Frontend

- React 19
- React Router
- Vite
- HTML5
- CSS3
- Javascript ES6

State Management

- Context API

Charts

- Recharts

Icons

- Lucide React

Animation

- Framer Motion

Table

- Tanstack Table

Theme

- CSS Variables

Storage

- LocalStorage

Future Ready

- REST API
- Firebase
- Supabase
- Laravel API

---

# 4. Color Palette

Light

Primary
#4F46E5

Secondary
#00D4FF

Background
#F8FAFC

Card
#FFFFFF

Border
#111111

Text
#111111

Accent
#FFB703

Success
#22C55E

Danger
#EF4444

Warning
#F59E0B

---

Dark

Primary
#6D5DF6

Background
#111111

Card
#181818

Text
#FFFFFF

Border
#FFFFFF

Accent
#00D4FF

---

# 5. Design Language

Neo Brutalism

Characteristics

- Thick Border
- Shadow Offset
- Bold Typography
- Rounded Large Radius
- Bright Color
- Large Cards
- Floating Components
- Smooth Animation

---

# 6. Layout

Sidebar

Top Navbar

Main Content

Footer

---

# 7. Sidebar Menu

🏠 Dashboard

📈 Analytics

💰 Sales

📦 Products

👥 Customers

📊 Reports

🧾 Orders

📂 Inventory

💳 Finance

👤 Users

🔔 Notifications

⚙ Settings

🚪 Logout

---

# 8. Dashboard

Top KPI Cards

Revenue

Orders

Customers

Profit

Growth

Conversion

Below KPI

Revenue Chart

Monthly Sales

Traffic

Top Products

Latest Orders

Recent Activities

Calendar

Todo

Weather Widget

---

# 9. Analytics Page

Charts

Area Chart

Line Chart

Bar Chart

Horizontal Bar

Pie Chart

Donut Chart

Radar Chart

Scatter Chart

Funnel Chart

Heatmap

Timeline

Growth Chart

Comparison Chart

Forecast Chart

Revenue Analysis

Traffic Analysis

Customer Analysis

Sales Analysis

---

# 10. Admin Panel

CRUD Product

CRUD User

CRUD Category

CRUD Customer

CRUD Order

CRUD Supplier

CRUD Inventory

CRUD Role

CRUD Permission

CRUD Notification

CRUD Setting

CRUD Banner

CRUD Promotion

---

# 11. User Management

List User

Create

Edit

Delete

Search

Pagination

Export CSV

Export Excel

Bulk Delete

Assign Role

Reset Password

Deactivate User

---

# 12. Product Management

Photo

Barcode

SKU

Stock

Purchase Price

Selling Price

Category

Supplier

Status

History

---

# 13. Inventory

Incoming

Outgoing

Adjustment

History

Low Stock

Stock Alert

Warehouse

---

# 14. Finance

Income

Expense

Profit

Loss

Cashflow

Invoice

Payment

Transaction History

---

# 15. Reports

Daily

Weekly

Monthly

Yearly

Export PDF

Export Excel

Print

---

# 16. Notification

Realtime Badge

Toast Notification

Inbox

Read

Unread

Delete

---

# 17. Settings

Company Profile

Theme

Language

Currency

Date Format

Email

Backup

Security

---

# 18. Theme

Dark

Light

Auto

Saved into LocalStorage

---

# 19. Components

NeoButton

NeoCard

NeoTable

NeoInput

NeoModal

NeoBadge

NeoChart

NeoSidebar

NeoNavbar

NeoDropdown

NeoToast

NeoAvatar

NeoLoader

NeoPagination

NeoTabs

NeoSwitch

NeoCalendar

NeoTooltip

NeoSearch

---

# 20. Folder Structure

src/

components/

layout/

pages/

dashboard/

analytics/

products/

users/

reports/

settings/

hooks/

contexts/

services/

utils/

styles/

assets/

icons/

charts/

data/

App.jsx

main.jsx

---

# 21. Dummy Data

Revenue

Orders

Visitors

Customers

Products

Stock

Income

Expense

Profit

Traffic

Conversion

Activities

Notification

---

# 22. Dashboard Widgets

Revenue Today

Sales Today

Profit

Visitors

Conversion

Sessions

Top Products

Top Customers

Best Seller

Active Users

Recent Orders

Monthly Goal

Progress

Tasks

Weather

Calendar

Activity Feed

---

# 23. Responsive

Desktop

Laptop

Tablet

Mobile

---

# 24. Animations

Hover

Card Lift

Button Press

Sidebar Collapse

Chart Loading

Fade

Slide

Scale

Skeleton Loading

---

# 25. Security

Protected Routes

Role Management

Permission

Session Timeout

Local Auth

---

# 26. Future Feature

Realtime Dashboard

AI Insight

Predictive Analytics

Google Analytics Integration

Firebase

Supabase

Laravel Backend

API Gateway

JWT Authentication

Chat Module

CRM

POS Integration

Warehouse System

Accounting

ERP

---

# 27. Performance Target

Lighthouse >95

Responsive 100%

Dark Mode

60 FPS Animation

Fast Loading

---

# 28. Deliverables

✔ Neo Brutalism Dashboard

✔ Admin Panel

✔ Analytics

✔ CRUD Module

✔ Responsive

✔ Charts

✔ Theme Toggle

✔ Localhost Ready

✔ React Architecture

✔ Easily Extendable

#struktur project
neo-dashboard/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── components/
│   │   ├── Cards/
│   │   ├── Charts/
│   │   ├── Buttons/
│   │   ├── Table/
│   │   ├── Modal/
│   │   ├── Inputs/
│   │   ├── Sidebar/
│   │   ├── Navbar/
│   │   ├── Widgets/
│   │   └── Theme/
│   │
│   ├── layouts/
│   │
│   ├── pages/
│   │   ├── Dashboard/
│   │   ├── Analytics/
│   │   ├── Orders/
│   │   ├── Customers/
│   │   ├── Inventory/
│   │   ├── Products/
│   │   ├── Reports/
│   │   ├── Finance/
│   │   ├── Users/
│   │   ├── Settings/
│   │   └── Login/
│   │
│   ├── services/
│   ├── hooks/
│   ├── contexts/
│   ├── styles/
│   ├── utils/
│   ├── data/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md