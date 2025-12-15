import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FoodFeed() {
    const [foodList, setFoodList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/all-food')
            .then(res => setFoodList(res.data.reverse()))
            .catch(err => console.log(err));
    }, []);

    const handleCollect = (id) => {
        const collectorName = prompt("Enter your name to collect this food:");
        if (!collectorName) return;

        axios.put(`http://localhost:3001/collect-food/${id}`, { collector: collectorName })
            .then(() => {
                alert(`Thank you ${collectorName}! Food collected.`);
                window.location.reload();
            })
            .catch(err => alert("Error connecting to server"));
    };

    return (
        <div className="feed-container">
            <h2>🍲 Food Feed</h2>
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
                        
                        {/* --- NEW EXPIRY DISPLAY --- */}
                        <p style={{ color: '#cb202d', fontWeight: 'bold' }}>
                            🕒 Expires in: {food.expiry || "Not Specified"}
                        </p>
                        {/* -------------------------- */}
                        
                        <p><strong>Quantity:</strong> {food.quantity}</p>
                        <p><strong>Location:</strong> 
                            <a 
                                href={`http://maps.google.com/?q=${encodeURIComponent(food.location)}`} 
                                target="_blank" 
                                rel="noreferrer"
                                style={{ color: '#138808', fontWeight: 'bold', marginLeft: '5px' }}
                            >
                                📍 {food.location}
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
                ))}
            </div>
        </div>
    );
}

export default FoodFeed;    