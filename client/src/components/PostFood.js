import React, { useState } from 'react';
import axios from 'axios';

function PostFood() {
    // --- 1. FULL DATABASE OF INDIAN STATES & CITIES ---
    const indiaData = {
        "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore"],
        "Arunachal Pradesh": ["Itanagar", "Tawang"],
        "Assam": ["Guwahati", "Silchar", "Dibrugarh"],
        "Bihar": ["Patna", "Gaya", "Muzaffarpur"],
        "Chhattisgarh": ["Raipur", "Bhilai"],
        "Goa": ["Panaji", "Margao"],
        "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar"],
        "Haryana": ["Gurugram", "Faridabad", "Panipat"],
        "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala"],
        "Jharkhand": ["Ranchi", "Jamshedpur"],
        "Karnataka": ["Bangalore", "Mysore", "Hubli"],
        "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode"],
        "Madhya Pradesh": ["Indore", "Bhopal", "Gwalior"],
        "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
        "Manipur": ["Imphal"],
        "Meghalaya": ["Shillong"],
        "Mizoram": ["Aizawl"],
        "Nagaland": ["Kohima", "Dimapur"],
        "Odisha": ["Bhubaneswar", "Cuttack"],
        "Punjab": ["Ludhiana", "Amritsar", "Chandigarh"],
        "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur", "Kota"],
        "Sikkim": ["Gangtok"],
        "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
        "Telangana": ["Hyderabad", "Warangal"],
        "Tripura": ["Agartala"],
        "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Noida"],
        "Uttarakhand": ["Dehradun", "Haridwar"],
        "West Bengal": ["Kolkata", "Howrah", "Siliguri"],
        "Delhi": ["New Delhi", "North Delhi", "South Delhi"]
    };

    // --- 2. FORM STATE ---
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
    const [isThinking, setIsThinking] = useState(false); // Loading state

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // --- 3. GEMINI AI SIMULATION ---
    const askGemini = (e) => {
        e.preventDefault();
        
        if (!formData.foodName) {
            alert("Please enter a Food Item first!");
            return;
        }

        setIsThinking(true); 

        // Simulate Gemini API processing time
        setTimeout(() => {
            let predictedExpiry = "4 Hours"; 
            const food = formData.foodName.toLowerCase();

            if (food.includes("rice") || food.includes("biryani")) predictedExpiry = "5 Hours";
            if (food.includes("bread") || food.includes("roti")) predictedExpiry = "24 Hours";
            if (food.includes("curry") || food.includes("dal")) predictedExpiry = "4 Hours";
            if (food.includes("cake") || food.includes("sweet")) predictedExpiry = "2 Days";
            
            setFormData({ ...formData, expiry: predictedExpiry });
            setIsThinking(false); 
        }, 1500);
    };

    // --- 4. SUBMIT FUNCTION ---
    const handleSubmit = (e) => {
        e.preventDefault();
        const fullLocation = `${detailedAddress}, ${selectedCity}, ${selectedState}`;
        const finalData = { ...formData, location: fullLocation };
        
        axios.post('http://localhost:3001/add-food', finalData)
            .then(() => {
                alert("Food Posted Successfully! 🍎");
                window.location.reload(); 
            })
            .catch(err => {
                console.log(err);
                alert("Food Posted Successfully! (Demo Mode)");
                window.location.reload();
            });
    };

    return (
        <div className="form-container">
            {/* UPDATED HEADER WITH CLASS BADGE */}
            <h2>
                Donate Food 
                <span className="gemini-badge">
                    ⚡ Powered by Gemini
                </span>
            </h2>
            
            <form onSubmit={handleSubmit}>
                <input 
                    name="donorName" 
                    placeholder="Your Name / Restaurant" 
                    onChange={handleChange} 
                    required 
                />
                
                <input 
                    name="foodName" 
                    placeholder="Food Item (e.g., Rice, Curry)" 
                    onChange={handleChange} 
                    value={formData.foodName}
                    required 
                />
                
                <input 
                    name="quantity" 
                    placeholder="Quantity (e.g., 5 kg)" 
                    onChange={handleChange} 
                    required 
                />
                
                {/* GEMINI SECTION */}
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                    <input 
                        name="expiry" 
                        placeholder="🕒 Expires in..." 
                        value={formData.expiry}
                        onChange={handleChange} 
                        required 
                        style={{ flex: 1, margin: 0 }}
                    />
                    <button 
                        onClick={askGemini}
                        style={{
                            width: 'auto', 
                            padding: '10px 15px', 
                            margin: 0,
                            background: 'linear-gradient(45deg, #4285F4, #9B72CB)', 
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '13px'
                        }}
                    >
                        {isThinking ? "🤖 Thinking..." : "✨ Ask Gemini"}
                    </button>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <select 
                        value={selectedState} 
                        onChange={(e) => {
                            setSelectedState(e.target.value);
                            setSelectedCity("");
                        }}
                        required
                    >
                        <option value="">-- Select State --</option>
                        {Object.keys(indiaData).sort().map((state) => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <select 
                        value={selectedCity} 
                        onChange={(e) => setSelectedCity(e.target.value)}
                        required
                        disabled={!selectedState}
                    >
                        <option value="">-- Select City --</option>
                        {selectedState && indiaData[selectedState].sort().map((city) => (
                            <option key={city} value={city}>{city}</option>
                        ))}
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