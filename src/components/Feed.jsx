import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Feed.css';
import axios from 'axios';

import Sidebar from './Sidebar'

export default function Feed() {

  const [category, setCategory] = useState('Trending')
  const [videos, setVideos] = useState([])

  function formatNumber(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B views';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M views';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K views';
    }
    return num + ' views';
  }
  
  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://youtube-v38.p.rapidapi.com/search/',
      params: {q: category, hl: 'en', gl: 'US'},
      headers: {
        'X-RapidAPI-Key': '583627f704msh19c07864199cf13p1b7dadjsnc2e1d0cc8354',
        'X-RapidAPI-Host': 'youtube-v38.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      setVideos(response.data.contents);
    })
    
  }, [category]);

  return (
    <section id="feed">
      <div className="feed-container">
        <Sidebar category={category} setCategory={setCategory}/>

        <div className="feed-wrapper">
          <div className="category-wrapper">
            <h1 className="category">{category}</h1>
            <h1 className="video-title">Videos</h1>
          </div>

          <div className="videos-container">
            {videos.map((video, index) => (
              <Link to={{ pathname: `/Watch/${video.video.videoId}`, 
                    state: { publishedTimeText: video.video.publishedTimeText } }} 
                    className='link' 
                    key={index}
              >
                <div className='video'>
                  <img src={video.video.thumbnails[0].url} alt="" className="video-img" />
                  <div className="video-info-wrapper">
                    <img src={video.video.author.avatar[0].url} alt="" className='avatar'/>
                    <div className="title-channel-stats-wrapper">
                      <h3 className="title">{video.video.title.slice(0,60)}</h3>
                      <h3 className="channel">{video.video.author.title}</h3>
                      <div className="stats-wrapper">
                        <h3 className="views">{formatNumber(video.video.stats.views)}</h3>
                        <h3 className="date">{video.video.publishedTimeText}</h3>
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
