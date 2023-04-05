import React, { useState, useContext } from 'react'
import './Navbar.css';
import cow from '../assets/cow.png'
import AppContext from './AppContext';
import { Link, useNavigate } from 'react-router-dom';


export default function Navbar(props) {
  const {disableBar} = props;
  const {isSidebarOpen, setIsSidebarOpen} = useContext(AppContext)
  const [query, setQuery] = useState('')
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      navigate(`/SearchResults?q=${query}`);
    }
  }

  const handleCloseSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <section id="navbar">
        <div className="container">

            <div className="title-container">
                {disableBar === false ? <i className="fa-solid fa-bars"
                   onClick={handleCloseSidebar}
                ></i>: null}
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
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={handleKeyDown}
                />
            </div>

            <h1 className="user" title='This is just for show' >G</h1>

        </div>
    </section>
  )
}
