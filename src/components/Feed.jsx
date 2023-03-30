import React, { useState, useEffect } from 'react';
import './Feed.css';
import axios from 'axios';

import Sidebar from './Sidebar'

export default function Feed() {

  const [category, setCategory] = useState('cat')
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
      console.log(response)
    });
    
  }, []);
  
  // console.log(videos)

  return (
    <section id="feed">
      <div className="feed-container">
        <Sidebar/>

        <div className="feed-wrapper">
          <div className="category-wrapper">
            <h1 className="category">Category</h1>
            <h1 className="video-title">Videos</h1>
          </div>

          <div className="videos-container">
            {videos.map((video, index) => (
              <div key={index} className='video'>
                <img src={video.snippet.thumbnails.high.url} alt="" className="video-img" />
                <h3 className="title">{video.snippet.title.slice(0,60)}</h3>
                <h3 className="channel">{video.snippet.channelTitle}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
