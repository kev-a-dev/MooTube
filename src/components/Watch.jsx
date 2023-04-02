import React, {useState, useEffect} from 'react'
import './Watch.css';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

export default function Watch() {

  const { id } = useParams();
  const [videos, setVideos] = useState([])

  // VIDEO SUGGESTIONS
  useEffect(() => {

    const options = {
      method: 'GET',
      url: 'https://youtube-v31.p.rapidapi.com/search',
      params: {
        relatedToVideoId: id,
        part: 'id,snippet',
        type: 'video',
        maxResults: '25'
      },
      headers: {
        'X-RapidAPI-Key': '583627f704msh19c07864199cf13p1b7dadjsnc2e1d0cc8354',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      setVideos(response.data.items);
    })

  }, [id]);
  console.log(videos)
  
  useEffect(() => {
    
  }, [id]);
  
  return (
    <div>
        <section id="watch">
            <div className="container">
              <div className="react-player-wrapper">
                <ReactPlayer
                  className='react-player'
                  width='100%'
                  height='100%'
                  url={`https://www.youtube.com/watch?v=${id}`}
                  controls={true}
                />
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
        </section>
    </div>
  )
}
