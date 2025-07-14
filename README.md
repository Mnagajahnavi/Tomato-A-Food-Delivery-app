# 🍅 Tomato - A Food Delivery App

A full-stack food delivery application built using the **MERN stack**. Tomato allows users to explore menus, add items to cart, place orders with payment, and gives admins the power to manage the entire system.

---

## 🔥 Features

- 🔐 User Authentication & Registration
- 🍽️ Browse and Filter Food Menu by Category
- 🛒 Add/Remove Items from Cart
- 🧾 Place Orders with Address and Razorpay Integration
- 🛠️ Admin Panel to Manage Food Items and Orders
- 📱 Responsive UI Design for all devices

---

## 🛠️ Tech Stack

| Layer       | Technologies                          |
|-------------|---------------------------------------|
| Frontend    | React, Vite, Axios, Context API       |
| Backend     | Node.js, Express.js, MongoDB, Mongoose|
| Payments    | Razorpay                              |
| Other Tools | React Toastify, dotenv                |

---

## 🚀 Getting Started

### ⚙️ Prerequisites

- Node.js & npm
- MongoDB (local or Atlas)
- Razorpay Account

### 📦 Installation

# 1. Clone the Repository :-

```bash
git clone https://github.com/Mnagajahnavi/Tomato-A-Food-Delivery-app.git
cd Tomato-A-Food-Delivery-app
```
# 2. Install Backend Dependencies :-
```bash
cd backend
npm install
```
# 3. Install Frontend Dependencies :-
```bash
cd ../frontend
npm install
```
# 4. Set Up environment variables :-
- Create **.env** file in the ```🗂️ backend``` folder
```
MONGODB_URL=your_mongodb_connection_string
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET_KEY=your_razorpay_secret_key
JWT_SECRET=your_jwt_secret
```
### 🧑🏻‍💻 Running the App
# 1. Start the Backend Server :-
```bash
cd backend
npm start
```
# 2. Start the Frontend App :-
```bash
cd ../frontend
npm run dev
```
# 3. Admin Panel :-
- To access admin features, visit the `admin/` route in the browser (if implemented).

# 🗂️ Folder Structure :-
```bash
Tomato-A-Food-Delivery-app/
├── backend/                    # Express.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/                   # React (Vite) frontend
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── App.jsx
│       └── main.jsx
│
├── admin/                      # Admin panel (React)
│   └── fooddelivery/
│       └── src/
│           ├── components/
│           └── pages/
│
├── README.md
└── .gitignore
```
