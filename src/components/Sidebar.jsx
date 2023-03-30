import React from 'react'
import './Sidebar.css';

import { categories } from '../utils/data';

export default function Sidebar({setCategory}) {

  const handleSetCategory = (event) => {
    document.querySelector('.category').classList.toggle('active');
    setCategory(event.target.textContent);
    
  }

  return (
    <section id="sidebar">
      <div className="container">
        {categories.map((category, index) => (
          <div 
            className="category" 
            key={index}
            onClick={handleSetCategory}  
          >
            <img src={category.icon} alt="" className="icon" />
            <span className="name">{category.name}</span>
          </div>
        ))}

      </div>
    </section>
  )
}
