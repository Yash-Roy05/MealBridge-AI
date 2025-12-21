import React, { useState } from 'react';

function FoodFeed() {
    // --- HACKATHON DEMO DATA ---
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
        },
        {
            _id: "103",
            foodName: "Leftover Breads",
            quantity: "2 kg",
            expiry: "1 Day",
            location: "Andheri West, Mumbai, Maharashtra",
            donorName: "City Bakery",
            status: "Collected",
            collector: "Robin Hood Army"
        }
    ]);

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
            <h2> Available Food </h2>
            <div className="card-grid">
                {foodList.map((food) => (
                    <div 
                        key={food._id} 
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
                        
                        {/* --- NEW CLICKABLE LOCATION FEATURE --- */}
                        <p><strong>Location:</strong> 
                            <a 
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(food.location)}`}
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ 
                                    color: '#138808', 
                                    fontWeight: 'bold', 
                                    marginLeft: '5px',
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                    borderBottom: '1px dashed #138808',
                                    transition: 'background 0.3s'
                                }}
                                title="View on Google Maps"
                                onMouseOver={(e) => {
                                    e.target.style.backgroundColor = '#e8f5e9';
                                    e.target.style.borderBottom = '1px solid #138808';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.borderBottom = '1px dashed #138808';
                                }}
                            >
                                📍 {food.location} ↗
                            </a>
                        </p>
                        {/* -------------------------------------- */}

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
                ))}
            </div>
        </div>
    );
}

export default FoodFeed;
