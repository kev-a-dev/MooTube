import React, {useState, useEffect} from 'react'
import './Watch.css';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import moo from '../assets/moo.png';

export default function Watch() {

  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [videoDetail, setVideoDetail] = useState([]);
  const [comments, setComments] = useState(null);

  // FORMAT PUBLISH DATE
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
  
  // FORMAT NUMBERS
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

  // TOGGLE DESCRIPTION
  function handleToggleOpen(event) {
    document.body.querySelector('.description').classList.toggle('open')
    
    if (event.target.innerHTML === 'Show less'){
      event.target.innerHTML = 'Show more';
    } else if (event.target.innerHTML === 'Show more') {
      event.target.innerHTML = 'Show less';
    }
  }
  
  // FETCH VIDEO DETAILS
  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://youtube-v31.p.rapidapi.com/videos',
      params: {part: 'contentDetails,snippet,statistics', id: id},
      headers: {
        'X-RapidAPI-Key': '583627f704msh19c07864199cf13p1b7dadjsnc2e1d0cc8354',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      setVideoDetail(response.data.items[0]);
    })
    
  }, [id]);
  
  // FETCH VIDEO COMMENTS
  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://youtube-v31.p.rapidapi.com/commentThreads',
      params: {part: 'snippet', videoId: id, maxResults: 50},
      headers: {
        'X-RapidAPI-Key': '583627f704msh19c07864199cf13p1b7dadjsnc2e1d0cc8354',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      setComments(response.data.items);
    })
    
  }, [id]);
  
  //  FETCH VIDEO SUGGESTIONS
  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://youtube-v31.p.rapidapi.com/search',
      params: {
        relatedToVideoId: id,
        part: 'id,snippet',
        type: 'video',
        maxResults: '50'
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

  if (comments === null) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
        <section id="watch">
            <div className="container">
              {/* VIDEO */}
              <div className="react-player-container">
                <ReactPlayer
                  className='react-player'
                  width='100%'
                  height='100%'
                  url={`https://www.youtube.com/watch?v=${id}`}
                  controls={true}
                  />
                {/* INFO */}
                
                {videoDetail.snippet && (
                <>
                <h3 className="title">{videoDetail.snippet.title}</h3>

                <div className="avatar-channel-wrapper">
                  <div className="avatar-wrapper">
                    <img src={videoDetail.snippet.thumbnails.default.url} alt="" className='avatar'/>
                    <div className="channel-sub-wrapper">
                      <h3 className="channel">{videoDetail.snippet.channelTitle}</h3>
                      {/* <h3 className="subscribers">{videoDetail.author.stats.subscribersText}</h3> */}
                    </div>
                  </div>
                    
                  <div className="view-date-wrapper">
                    <div className="views">{formatNumber(videoDetail.statistics.viewCount)}</div>
                    <div className="date">{formatPublishDate(videoDetail.snippet.publishedAt)}</div>
                  </div>
                  
                </div>
                
                {/* DESCRIPTION */}
                <div className="description-container">
                  {videoDetail &&
                    <>
                      <h5 className="description">{videoDetail.snippet.description}</h5>
                      <span 
                        className="des-toggle"
                        onClick={handleToggleOpen}>
                        Show more
                      </span>
                    </>
                  }
                </div>
                </>
                )}

                {/* COMMENTS */}
                <div className="comments-container">
                  <h3 className="recent">Recent Comments</h3>

                  {comments.map((comment, index) => (
                    comment.snippet &&
                    <div className="comment" key={index}>
                      <div className="img-wrapper">
                        <img src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" className="avatar" />
                      </div>

                      <div className="title-date-content-wrapper">
                        <div className="title-date-wrapper">
                          <h4 className="title">{comment.snippet.topLevelComment.snippet.authorDisplayName}</h4>
                          <h4 className="date">{formatPublishDate(comment.snippet.topLevelComment.snippet.publishedAt)}</h4>
                        </div>
                        <h4 className="content">{comment.snippet.topLevelComment.snippet.textDisplay}</h4>

                        <h4 className="votes">
                          <i className="fa-regular fa-heart"></i>
                          {comment.snippet.topLevelComment.snippet.likeCount}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
              
              {/* VIDEO SUGGESTIONS */}
              <div className="videos-container">
                {videos.map((video, index) => (
                  
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
                            <h3 className="date">{formatPublishDate(video.snippet.publishTime)}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>

            </div>
        </section>
    </div>
  )
}
