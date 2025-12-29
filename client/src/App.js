import React, { useState } from 'react';
import PostFood from './components/PostFood';
import FoodFeed from './components/FoodFeed';
import './App.css';

function App() {
  // --- STATE TO TRACK IF FORM IS OPEN OR CLOSED ---
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="App">
      <header className="navbar">
        {/* --- HD STATIC FLAG (Stable) --- */}
        <img 
          src="https://flagcdn.com/w320/in.png" 
          alt="Indian Flag" 
          className="header-logo"
        />
        
        <div className="header-text">
          <h1>♻️ ShareMeal India</h1>
          <p> Made with ❤️ for India</p>
        </div>
      </header>
      
      <div className="main-content">
        
        {/* --- LEFT SECTION --- */}
        <div className="left-section">
          
          {/* 1. THE TOGGLE CARD (Have Leftover Food?) */}
          {!isFormOpen ? (
            <div className="donate-cta-card">
                <h2 style={{color: '#138808', margin:'0 0 10px 0'}}>Have Leftover Food?</h2>
                <p style={{color: '#555', marginBottom: '20px', fontSize:'14px'}}>
                  Don't throw it away. Someone is hungry nearby.
                </p>
                
                <button 
                    onClick={() => setIsFormOpen(true)}
                    className="donate-trigger-btn"
                >
                    ➕ Donate Now
                </button>
            </div>
          ) : (
            // 2. THE FORM (When Button is Clicked)
            <div style={{ position: 'relative' }}>
                {/* Close Button - Positioned via CSS */}
                <button 
                    onClick={() => setIsFormOpen(false)}
                    className="close-btn"
                >
                    ✕ Close
                </button>
                <PostFood />
            </div>
          )}
          
        </div>

        {/* --- RIGHT SECTION: Food Feed --- */}
        <div className="right-section">
          <FoodFeed />
        </div>
      </div>
    </div>
  );
}

export default App;