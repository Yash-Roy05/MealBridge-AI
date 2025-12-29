const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// --- DUMMY DATA WITH EXPIRY TIMES ---
let foodDatabase = [
    {
        _id: "101",
        donorName: "Raju Dhaba",
        foodName: "Veg Biryani",
        quantity: "10 Plates",
        expiry: "4 Hours", // <--- ADDED
        location: "Shop 4, Market Road, Surat, Gujarat",
        phone: "9876543210",
        status: "Available",
        collector: ""
    },
    {
        _id: "102",
        donorName: "Anjali Home Kitchen",
        foodName: "Roti & Sabzi",
        quantity: "5 Packets",
        expiry: "2 Hours", // <--- ADDED
        location: "Sector 21, Gandhinagar, Gujarat",
        phone: "9123456789",
        status: "Available",
        collector: ""
    },
    {
        _id: "103",
        donorName: "City Bakery",
        foodName: "Leftover Breads",
        quantity: "2 kg",
        expiry: "1 Day", // <--- ADDED
        location: "Andheri West, Mumbai, Maharashtra",
        phone: "9988776655",
        status: "Collected",
        collector: "Robin Hood Army"
    }
];

app.post('/add-food', (req, res) => {
    console.log("➕ New Food Added:", req.body.foodName);
    const newFood = {
        _id: Date.now().toString(),
        ...req.body,
        status: "Available",
        collector: "" 
    };
    foodDatabase.push(newFood);
    res.json(newFood);
});

app.get('/all-food', (req, res) => {
    res.json(foodDatabase); 
});

app.put('/collect-food/:id', (req, res) => {
    const { id } = req.params;
    const { collector } = req.body; 

    const foodItem = foodDatabase.find(item => item._id === id);
    if (foodItem) {
        foodItem.status = "Collected";
        foodItem.collector = collector;
        console.log(`✅ Food collected by: ${collector}`);
        res.json(foodItem);
    } else {
        res.status(404).json({ message: "Food not found" });
    }
});

app.listen(3001, () => {
    console.log("✅ Server running on port 3001");
});