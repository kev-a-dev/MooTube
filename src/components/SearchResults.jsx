import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

import './SearchResults.css';


export default function SearchResults() {

  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://youtube-v31.p.rapidapi.com/search',
      params: {
        q: query,
        part: 'snippet,id',
        regionCode: 'US',
        maxResults: '25',
        order: 'date'
      },
      headers: {
        'X-RapidAPI-Key': '583627f704msh19c07864199cf13p1b7dadjsnc2e1d0cc8354',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      setVideos(response.data.items);
    })
  }, [query])

  return (
    <section id="searchresults">
      <div className="container">
        <h1 className="title">{query}</h1>

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
    </section>
  )
}
