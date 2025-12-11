const express = require("express");
const mongoose = require("mongoose");
const MenuItem = require("./models/MenuItem");
const Order = require("./models/Order");
const Restaurant = require("./models/Restaurant");

const router = express.Router();

/**
 * GET /search/dishes?name=...&minPrice=...&maxPrice=...
 * Returns top 10 restaurants where the dish (by name) has the highest order count,
 * but include only restaurants where the menu item price is within [minPrice, maxPrice]
 */
router.get("/search/dishes", async (req, res) => {
  try {
    const { name, minPrice, maxPrice } = req.query;
    if (!name || minPrice == null || maxPrice == null) {
      return res
        .status(400)
        .json({
          error: "Missing required query params: name, minPrice, maxPrice",
        });
    }

    const minP = Number(minPrice);
    const maxP = Number(maxPrice);
    if (Number.isNaN(minP) || Number.isNaN(maxP)) {
      return res
        .status(400)
        .json({ error: "minPrice and maxPrice must be numbers" });
    }

    // Aggregation pipeline:
    // 1. Lookup menu item for each order
    // 2. Filter menuItem.name matches (case-insensitive) and menuItem.price within range
    // 3. Group by restaurantId and collect dish info and total orderCount
    // 4. Lookup restaurant details
    // 5. Project and limit to top 10 sorted by orderCount desc

    const pipeline = [
      {
        $lookup: {
          from: "menuitems",
          localField: "menuItemId",
          foreignField: "_id",
          as: "menuItem",
        },
      },
      { $unwind: "$menuItem" },
      {
        $match: {
          "menuItem.name": { $regex: name, $options: "i" },
          "menuItem.price": { $gte: minP, $lte: maxP },
        },
      },
      {
        $group: {
          _id: "$menuItem.restaurantId",
          orderCount: { $sum: "$quantity" }, // quantity included
          dishName: { $first: "$menuItem.name" },
          dishPrice: { $first: "$menuItem.price" },
          menuItemId: { $first: "$menuItem._id" },
        },
      },
      {
        $lookup: {
          from: "restaurants",
          localField: "_id",
          foreignField: "_id",
          as: "restaurant",
        },
      },
      { $unwind: "$restaurant" },
      {
        $project: {
          _id: 0,
          restaurantId: "$_id",
          restaurantName: "$restaurant.name",
          city: "$restaurant.city",
          dishName: 1,
          dishPrice: 1,
          orderCount: 1,
        },
      },
      { $sort: { orderCount: -1 } },
      { $limit: 10 },
    ];

    const results = await Order.aggregate(pipeline).allowDiskUse(true);

    return res.json({ restaurants: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
