import React, {useState} from 'react'
import './Sidebar.css';

import { categories } from '../utils/data';

export default function Sidebar({setCategory}) {
  const [active, setActive] = useState(null);

  const handleSetCategory = (event) => {
    const category = event.target.textContent;
    setCategory(category);
    setActive(category);
  }

  return (
    <section id="sidebar">
      <div className="container">
        {categories.map((category, index) => (
          <div 
            className={`category ${category.name === active ? 'active' : ''}`} 
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
