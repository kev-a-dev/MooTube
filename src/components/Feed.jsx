import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Feed.css';
import axios from 'axios';

import Sidebar from './Sidebar'

export default function Feed() {

  const [category, setCategory] = useState('Cow')
  const [videos, setVideos] = useState([])
  
  useEffect(() => {
    
    const options = {
      method: 'GET',
      url: 'https://youtube-v31.p.rapidapi.com/search',
      params: {
        q: category,
        part: 'snippet,id',
        regionCode: 'US',
        maxResults: '50',
        order: 'date'
      },
      headers: {
        'X-RapidAPI-Key': '583627f704msh19c07864199cf13p1b7dadjsnc2e1d0cc8354',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      setVideos(response.data.items)
    });
    
  }, [category]);

  console.log(videos)

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
              <Link to={`/Watch/${video.id.videoId}`} 
                className='link' 
                key={index}
              >
                <div className='video'>
                  <img src={video.snippet.thumbnails.high.url} alt="" className="video-img" />
                  <h3 className="title">{video.snippet.title.slice(0,60)}</h3>
                  <h3 className="channel">{video.snippet.channelTitle}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
