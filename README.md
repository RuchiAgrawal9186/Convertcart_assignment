# Convertcart_assignment

## 🍽️ Restaurant Dish Search API
A simple backend service that allows users to search for restaurants based on a dish name and price range, returning the top 10 restaurants where that dish

# LIVE API - https://convertcart-assignment-yf92.onrender.com/api/search/dishes?name=biryani&minPrice=150&maxPrice=300

## 📌 Key Features

Search restaurants by dish name
Apply mandatory price range filter
Returns:
    Restaurant details
    Dish name & price
    Total number of orders for that dish
Efficient MongoDB aggregation pipeline
Includes seed script to populate sample data
Fully deployable on Render or Railway

## 📂 Project Structure
```
restaurant-search/
│ package.json
│ package-lock.json
│ README.md
│ .env.example
│ .gitignore
│
└── src/
    │ app.js
    │ routes.js
    │ seed.js
    │
    └── models/
        │ Restaurant.js
        │ MenuItem.js
        │ Order.js
        ```

## 🛠️ Setup Instructions

1️⃣ Clone the Repository
git clone https://github.com/RuchiAgrawal9186/Convertcart_assignment.git
cd restaurant-search

2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment Variables
MONGO_URI=<YOUR_MONGODB_URL>
PORT=<PORT_NUMBER>

## 🌱 Seed the Database
npm run seed

## ▶️ Start the Server
npm run dev


