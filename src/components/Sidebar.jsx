import React from 'react'
import './Sidebar.css';

import { categories } from '../utils/data';

export default function Sidebar() {
  return (
    <section id="sidebar">
      <div className="container">
        {categories.map((category, index) => (
          <div className="category" key={index}>
            <img src={category.icon} alt="" className="icon" />
            <span className="name">{category.name}</span>
          </div>
        ))}

      </div>
    </section>
  )
}
