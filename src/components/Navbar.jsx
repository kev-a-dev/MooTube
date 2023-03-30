import React from 'react'
import './Navbar.css';

import { Link } from 'react-router-dom';

import cow from '../assets/cow.png'

export default function Navbar() {
  return (
    <section id="navbar">
        <div className="container">

            <div className="title-container">
                <i className="fa-solid fa-bars"></i>
              <Link to='/MooTube' className='link'>
                <img src={cow} alt="" />
                <h1 className="mootube">MooTube</h1>
              </Link>
            </div>

            <div className="searchbar-container">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input 
                  type="text" 
                  className="searchbar" 
                  placeholder='Search' 
                  onKeyDown={(event) => {
                    if (event.key === "Enter"){
                      window.location.href = '/SearchResults'
                    }
                  }}
                />
            </div>

            <h1 className="user">G</h1>

        </div>
    </section>
  )
}
