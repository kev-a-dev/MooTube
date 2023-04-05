import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

import './SearchResults.css';


export default function SearchResults(props) {
  const {setDisableBar} = props;
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const [videos, setVideos] = useState([]);

  // FORMAT DATE
  function formatPublishDate(publishDate) {
    const datePublished = new Date(publishDate);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - datePublished);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    if (diffDays === 1) {
      return '1 day ago';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 14) {
      return '1 week ago';
    } else if (diffDays < 30) {
      const weeksAgo = Math.floor(diffDays / 7);
      return `${weeksAgo} weeks ago`;
    } else if (diffDays < 365) {
      const monthsAgo = Math.floor(diffDays / 30);
      return `${monthsAgo} months ago`;
    } else {
      const yearsAgo = Math.floor(diffDays / 365);
      return `${yearsAgo} years ago`;
    }
  }

  // DISABLE SIDEBAR BUTTON
  useEffect(() => {
    setDisableBar(true);
    return () => setDisableBar(false);
  }, [setDisableBar]);

  // FETCH SEARCH
  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://youtube-v31.p.rapidapi.com/search',
      params: {
        q: query,
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
  }, [query])

  return (
    <section id="search-results">
      <div className="container">
        <h1 className="query">Search results for <span>{query}</span></h1>

        <div className="videos-container">
            {videos.map((video, index) => (
              video && 
                <div className='video' key={index}>
                  <Link to={ `/Watch/${video.id.videoId}`} className='link' key={index}>
                    <img src={video.snippet.thumbnails.high.url} alt="" className="video-img" />

                    <div className="video-info-wrapper">

                      <div className="title-channel-stats-wrapper">
                        <div className="title-channel-wrapper">
                          <h3 className="title">{video.snippet.title.slice(0,60)}</h3>
                          <h3 className="channel">{video.snippet.channelTitle}</h3>
                        </div>
                        <h3 className="description">{video.snippet.description}</h3>
                        <div className="stats-wrapper">
                          <h3 className="date">{formatPublishDate(video.snippet.publishTime)}</h3>
                        </div>
                      </div>

                    </div>
                  </Link>
                </div>
            ))}
          </div>

      </div>
    </section>
  )
}
