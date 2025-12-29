import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FoodFeed() {
    // --- 1. INITIAL DEMO DATA (So page looks full) ---
    const [foodList, setFoodList] = useState([
        {
            _id: "101",
            foodName: "Veg Biryani",
            quantity: "10 Plates",
            expiry: "4 Hours",
            location: "Shop 4, Market Road, Surat, Gujarat",
            donorName: "Raju Dhaba",
            status: "Available",
            collector: ""
        },
        {
            _id: "102",
            foodName: "Roti & Sabzi",
            quantity: "5 Packets",
            expiry: "2 Hours",
            location: "Sector 21, Gandhinagar, Gujarat",
            donorName: "Anjali Home Kitchen",
            status: "Available",
            collector: ""
        }
    ]);

    // --- 2. FETCH REAL DATA FROM SERVER ---
    useEffect(() => {
        axios.get('http://localhost:3001/all-food')
            .then((response) => {
                // Combine Demo Data + Real Data from Database
                // We use 'reverse()' so your NEWEST post shows at the top
                const realData = response.data.reverse();
                
                setFoodList((prevDemoData) => {
                     // Filter out duplicates if any, or just combine
                     return [...realData, ...prevDemoData];
                });
            })
            .catch((error) => {
                console.log("Server not connected yet, showing demo data only.");
            });
    }, []);

    const handleCollect = (id) => {
        const collectorName = prompt("Enter your name to collect this food:");
        if (!collectorName) return;

        const updatedList = foodList.map(item => {
            if (item._id === id) {
                return { ...item, status: "Collected", collector: collectorName };
            }
            return item;
        });
        
        setFoodList(updatedList);
        alert(`Thank you ${collectorName}! Food collected.`);
    };

    return (
        <div className="feed-container">
            <h2> 🍛 Available Food </h2>
            <div className="card-grid">
                {foodList.map((food, index) => {
                    
                    // --- 3. THE UNIVERSAL LOCATION FIX ---
                    // This checks ALL possible names for the address
                    const displayLocation = food.pickupLocation || food.location || food.address || "Location Not Shared";

                    return (
                        <div 
                            key={food._id || index} 
                            className="food-card"
                            style={{ 
                                opacity: food.status === "Collected" ? 0.6 : 1,
                                backgroundColor: food.status === "Collected" ? '#f0f0f0' : 'white',
                                borderLeft: food.status === "Collected" ? '8px solid grey' : '8px solid #FF9933'
                            }}
                        >
                            <h3>{food.foodName}</h3>
                            
                            <p style={{ color: '#cb202d', fontWeight: 'bold' }}>
                                🕒 Expires in: {food.expiry || "Not Specified"}
                            </p>
                            
                            <p><strong>Quantity:</strong> {food.quantity}</p>
                            
                            {/* --- CLICKABLE GOOGLE MAPS LINK --- */}
                            <p><strong>Location:</strong> 
                                <a 
                                    href={`https://www.google.com/maps?q=${encodeURIComponent(displayLocation)}`}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{ 
                                        color: '#138808', 
                                        fontWeight: 'bold', 
                                        marginLeft: '5px',
                                        textDecoration: 'none',
                                        cursor: 'pointer',
                                        borderBottom: '1px dashed #138808'
                                    }}
                                >
                                    📍 {displayLocation} ↗
                                </a>
                            </p>
                            
                            <p style={{ color: '#000080', fontSize: '15px' }}>
                                <strong>👤 Donor:</strong> {food.donorName}
                            </p>
                            
                            {food.status === "Collected" ? (
                                <p style={{color: 'green', fontWeight: 'bold', border: '1px solid green', padding: '5px', textAlign: 'center', borderRadius: '5px'}}>
                                    ✅ Collected by {food.collector}
                                </p>
                            ) : (
                                <button className="collect-btn" onClick={() => handleCollect(food._id)}>
                                    Claim / Collect
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default FoodFeed;    