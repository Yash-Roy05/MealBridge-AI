import React from 'react';
import PostFood from './components/PostFood';
import FoodFeed from './components/FoodFeed';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="navbar">
        {/* INDIAN FLAG ADDED HERE */}
        <img 
          src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" 
          alt="Indian Flag" 
          style={{ width: '80px', marginBottom: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.3)' }} 
        />
        <h1>♻️ ShareMeal India</h1>
        <p style={{ margin: '0', fontSize: '14px', fontStyle: 'italic' }}>
          Made with ❤️ for India
        </p>
      </header>
      
      <div className="main-content">
        <div className="left-section">
          <PostFood />
        </div>
        <div className="right-section">
          <FoodFeed />
        </div>
      </div>
    </div>
  );
}

export default App;