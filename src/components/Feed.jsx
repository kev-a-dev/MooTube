import React, { useState, useEffect, useContext } from 'react';
import AppContext from './AppContext';
import { Link } from 'react-router-dom';

import './Feed.css';
import axios from 'axios';
import Sidebar from './Sidebar'


export default function Feed() {
  const { isSidebarOpen } = useContext(AppContext);
  const [category, setCategory] = useState('Trending');
  const [videos, setVideos] = useState([]);

  // FORMAT TIME
  function formatTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);
  
    if (diffSeconds < 60) {
      return `${diffSeconds} seconds ago`;
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffWeeks < 4) {
      return `${diffWeeks} weeks ago`;
    } else if (diffMonths < 12) {
      return `${diffMonths} months ago`;
    } else {
      return `${diffYears} years ago`;
    }
  }

  // FETCH VIDEO CATEGORY
  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://youtube-v31.p.rapidapi.com/search',
      params: {
        q: category,
        part: 'snippet,id',
        regionCode: 'US',
        maxResults: '50',
        order: 'relevance'
      },
      headers: {
        'X-RapidAPI-Key': '583627f704msh19c07864199cf13p1b7dadjsnc2e1d0cc8354',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      setVideos(response.data.items);
    })
  }, [category]);

  return (
    <section id="feed">
      <div className="feed-container">
        {isSidebarOpen &&<Sidebar category={category} setCategory={setCategory}/>}

        <div className="feed-wrapper">
          <div className="category-wrapper">
            <h1 className="category">{category}</h1>
            <h1 className="video-title">Videos</h1>
          </div>

          <div className="videos-container">
            {videos.map((video, index) => (
              video && 
              <Link to={ `/Watch/${video.id.videoId}`}
                    className='link' 
                    key={index}
              >
                <div className='video'>
                  <img src={video.snippet.thumbnails.high.url} alt="" className="video-img" />
                  <div className="video-info-wrapper">
                    {/* <img src={video.video.author.avatar[0].url} alt="" className='avatar'/> */}
                    <div className="title-channel-stats-wrapper">
                      <h3 className="title">{video.snippet.title.slice(0,60)}</h3>
                      <h3 className="channel">{video.snippet.channelTitle}</h3>
                      <div className="stats-wrapper">
                        {/* <h3 className="views">{formatNumber(video.video.stats.views)}</h3> */}
                        <h3 className="date">{formatTime(video.snippet.publishTime)}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
