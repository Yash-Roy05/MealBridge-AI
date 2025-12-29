// server/models/FoodItem.js
const mongoose = require('mongoose');

const FoodItemSchema = new mongoose.Schema({
    donorName: String,
    foodName: String,
    quantity: String, // e.g., "5 kg" or "10 Packets"
    location: String,
    status: { type: String, default: "Available" }, // Available or Collected
    phone: String,
    datePosted: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FoodItem', FoodItemSchema);