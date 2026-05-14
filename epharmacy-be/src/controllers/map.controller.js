"use strict";
const { Branch } = require("../models/index");

// Tính khoảng cách bằng Haversine formula (km)
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

module.exports = {
  getNearPlaces: async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ error: "latitude and longitude are required" });
    }

    try {
      const branches = await Branch.findAll();

      const placesWithDistance = branches
        .map((branch) => {
          const distance = haversineDistance(
            parseFloat(latitude),
            parseFloat(longitude),
            branch.latitude,
            branch.longitude
          );
          return {
            id: branch.id,
            address: branch.address,
            latitude: branch.latitude,
            longitude: branch.longitude,
            distance: Math.round(distance * 100) / 100,
          };
        })
        .sort((a, b) => a.distance - b.distance);

      res.json(placesWithDistance);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};