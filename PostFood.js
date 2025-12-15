import React, { useState } from 'react';
import axios from 'axios';

function PostFood() {
    const indiaData = {
        "Gujarat": ["Surat", "Ahmedabad", "Vadodara", "Rajkot"],
        "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
        "Karnataka": ["Bangalore", "Mysore"],
        "Delhi": ["New Delhi", "South Delhi"]
        // (You can keep your full list here)
    };

    const [formData, setFormData] = useState({
        donorName: '',
        foodName: '',
        quantity: '',
        phone: '',
        expiry: ''
    });

    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [detailedAddress, setDetailedAddress] = useState("");
    const [isThinking, setIsThinking] = useState(false); // To show "Gemini is thinking..."

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // --- THE GEMINI AI SIMULATION ---
    const askGemini = (e) => {
        e.preventDefault();
        
        if (!formData.foodName) {
            alert("Please enter a Food Item first!");
            return;
        }

        setIsThinking(true); // Start loading animation

        // Simulate Gemini API Delay (1.5 seconds)
        setTimeout(() => {
            let predictedExpiry = "4 Hours"; // Default
            const food = formData.foodName.toLowerCase();

            // Simple logic to mimic AI intelligence
            if (food.includes("rice") || food.includes("biryani")) predictedExpiry = "5 Hours";
            if (food.includes("bread") || food.includes("roti")) predictedExpiry = "24 Hours";
            if (food.includes("curry") || food.includes("dal")) predictedExpiry = "4 Hours";
            if (food.includes("cake") || food.includes("sweet")) predictedExpiry = "2 Days";
            
            setFormData({ ...formData, expiry: predictedExpiry });
            setIsThinking(false); // Stop loading
        }, 1500);
    };
    // --------------------------------

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullLocation = `${detailedAddress}, ${selectedCity}, ${selectedState}`;
        const finalData = { ...formData, location: fullLocation };
        
        axios.post('http://localhost:3001/add-food', finalData)
            .then(() => {
                alert("Food Posted Successfully! 🍎");
                window.location.reload(); 
            })
            .catch(err => alert("Error posting food."));
    };

    return (
        <div className="form-container">
            <h2>🍎 Donate Food <span style={{fontSize:'12px', color:'#138808', border:'1px solid #138808', padding:'2px 5px', borderRadius:'10px'}}>Powered by Gemini</span></h2>
            <form onSubmit={handleSubmit}>
                <input name="donorName" placeholder="Your Name / Restaurant" onChange={handleChange} required />
                
                {/* Food Name Input */}
                <input 
                    name="foodName" 
                    placeholder="Food Item (e.g., Rice, Curry)" 
                    onChange={handleChange} 
                    value={formData.foodName}
                    required 
                />
                
                <input name="quantity" placeholder="Quantity (e.g., 5 kg)" onChange={handleChange} required />
                
                {/* --- GEMINI SMART EXPIRY SECTION --- */}
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input 
                        name="expiry" 
                        placeholder="🕒 Expires in..." 
                        value={formData.expiry}
                        onChange={handleChange} 
                        required 
                        style={{ flex: 1 }}
                    />
                    <button 
                        onClick={askGemini}
                        style={{
                            width: 'auto', 
                            padding: '10px', 
                            marginTop: '0', 
                            marginBottom: '0',
                            background: 'linear-gradient(45deg, #4285F4, #9B72CB)', // Gemini Colors
                            fontSize: '12px'
                        }}
                    >
                        {isThinking ? "🤖 Thinking..." : "✨ Ask Gemini"}
                    </button>
                </div>
                {/* ----------------------------------- */}

                <div style={{ marginBottom: '15px' }}>
                    <select value={selectedState} onChange={(e) => { setSelectedState(e.target.value); setSelectedCity(""); }} required style={{ width: '100%', padding: '10px' }}>
                        <option value="">-- Select State --</option>
                        {Object.keys(indiaData).map((state) => <option key={state} value={state}>{state}</option>)}
                    </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} required disabled={!selectedState} style={{ width: '100%', padding: '10px' }}>
                        <option value="">-- Select City --</option>
                        {selectedState && indiaData[selectedState].map((city) => <option key={city} value={city}>{city}</option>)}
                    </select>
                </div>

                <input name="address" placeholder="Specific Address" onChange={(e) => setDetailedAddress(e.target.value)} required />
                <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
                
                <button type="submit">Post Donation</button>
            </form>
        </div>
    );
}

export default PostFood;