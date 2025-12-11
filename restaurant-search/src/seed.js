require("dotenv").config();
const mongoose = require("mongoose");
const Restaurant = require("./models/Restaurant");
const MenuItem = require("./models/MenuItem");
const Order = require("./models/Order");

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/restaurant_search";

async function seed() {
  // connect (do NOT pass legacy options here)
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  // CLEAR EXISTING DATA
  await Order.deleteMany({});
  await MenuItem.deleteMany({});
  await Restaurant.deleteMany({});

  console.log("Existing data cleared");

  // CREATE SAMPLE RESTAURANTS
  const restaurants = await Restaurant.insertMany([
    {
      name: "Hyderabadi Spice House",
      city: "Hyderabad",
      address: "Charminar Road",
    },
    { name: "Biryani Junction", city: "Hyderabad", address: "Banjara Hills" },
    { name: "Curry Corner", city: "Bengaluru", address: "MG Road" },
    { name: "Tasty Bites", city: "Mumbai", address: "Bandra" },
    { name: "Royal Biryani", city: "Lucknow", address: "Gomti Nagar" },
  ]);

  console.log("Restaurants added");

  // MENU ITEMS
  const menuItems = await MenuItem.insertMany([
    { restaurantId: restaurants[0]._id, name: "Chicken Biryani", price: 220 },
    { restaurantId: restaurants[0]._id, name: "Veg Biryani", price: 160 },

    { restaurantId: restaurants[1]._id, name: "Chicken Biryani", price: 250 },
    { restaurantId: restaurants[1]._id, name: "Mutton Biryani", price: 320 },

    { restaurantId: restaurants[2]._id, name: "Chicken Biryani", price: 180 },

    { restaurantId: restaurants[3]._id, name: "Chicken Biryani", price: 300 },

    { restaurantId: restaurants[4]._id, name: "Chicken Biryani", price: 200 },
  ]);

  console.log("Menu items added");

  // ORDERS (one order = one item)
  const orders = [];

  // Hyderabadi Spice House → 96 orders
  for (let i = 0; i < 96; i++) {
    orders.push({
      menuItemId: menuItems[0]._id,
      quantity: 1,
      priceAtOrder: menuItems[0].price,
    });
  }

  // Biryani Junction → 120 orders
  for (let i = 0; i < 120; i++) {
    orders.push({
      menuItemId: menuItems[2]._id,
      quantity: 1,
      priceAtOrder: menuItems[2].price,
    });
  }

  // Curry Corner → 40 orders
  for (let i = 0; i < 40; i++) {
    orders.push({
      menuItemId: menuItems[4]._id,
      quantity: 1,
      priceAtOrder: menuItems[4].price,
    });
  }

  // Tasty Bites → 10 orders
  for (let i = 0; i < 10; i++) {
    orders.push({
      menuItemId: menuItems[5]._id,
      quantity: 1,
      priceAtOrder: menuItems[5].price,
    });
  }

  // Royal Biryani → 60 orders
  for (let i = 0; i < 60; i++) {
    orders.push({
      menuItemId: menuItems[6]._id,
      quantity: 1,
      priceAtOrder: menuItems[6].price,
    });
  }

  await Order.insertMany(orders);

  console.log("Orders added");
  console.log("Data seeding completed successfully!");

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
