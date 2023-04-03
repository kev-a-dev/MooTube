import React, {useState, useEffect} from 'react'
import './Watch.css';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

export default function Watch() {

  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [videoDetail, setVideoDetail] = useState([]);
  const [comments, setComments] = useState([]);

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
  function handleToggleOpen() {
    document.body.querySelector('.description').classList.toggle('open')
  }
  
  // VIDEO DETAILS
  useEffect(() => {

    const options = {
      method: 'GET',
      url: 'https://youtube-v38.p.rapidapi.com/video/details/',
      params: {id: id, hl: 'en', gl: 'US'},
      headers: {
        'X-RapidAPI-Key': '583627f704msh19c07864199cf13p1b7dadjsnc2e1d0cc8354',
        'X-RapidAPI-Host': 'youtube-v38.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      setVideoDetail(response.data);
    })

  }, [id]);  

  // VIDEO COMMENTS
  useEffect(() => {

    const options = {
      method: 'GET',
      url: 'https://youtube-v38.p.rapidapi.com/video/comments/',
      params: {id: id, hl: 'en', gl: 'US'},
      headers: {
        'X-RapidAPI-Key': '583627f704msh19c07864199cf13p1b7dadjsnc2e1d0cc8354',
        'X-RapidAPI-Host': 'youtube-v38.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      setComments(response.data.comments);
    })

  }, [id]);  

  console.log(comments)

  // VIDEO SUGGESTIONS
  useEffect(() => {

    const options = {
      method: 'GET',
      url: 'https://youtube-v38.p.rapidapi.com/video/related-contents/',
      params: {id: id, hl: 'en', gl: 'US'},
      headers: {
        'X-RapidAPI-Key': '583627f704msh19c07864199cf13p1b7dadjsnc2e1d0cc8354',
        'X-RapidAPI-Host': 'youtube-v38.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      setVideos(response.data.contents);
    })

  }, [id]);
  
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
                {videoDetail.author &&(
                <>
                <h3 className="title">{videoDetail.title}</h3>

                <div className="avatar-channel-wrapper">
                  <div className="avatar-wrapper">
                    <img src={videoDetail.author.avatar[2].url} alt="" className='avatar'/>
                    <div className="channel-sub-wrapper">
                      <h3 className="channel">{videoDetail.author.title}</h3>
                      <h3 className="subscribers">{videoDetail.author.stats.subscribersText}</h3>
                    </div>
                  </div>
                    
                  <div className="view-date-wrapper">
                    <div className="views">{formatNumber(videoDetail.stats.views)}</div>
                    <div className="date">{videoDetail.publishedDate}</div>
                  </div>
                  
                </div>
                
                {/* DESCRIPTION */}
                <div 
                  className="description-container"
                  onClick={handleToggleOpen}
                >
                  {videoDetail.description &&
                    <h5 className="description">{videoDetail.description}</h5>
                  }
                </div>
                </>
                )}

                {/* COMMENTS */}
                <div className="comments-container">
                  {comments.map((comment, index) => (
                    comment &&
                    <div className="comment" key={index}>
                      <div className="img-wrapper">
                        <img src={comment.author.avatar[0].url} alt="" className="avatar" />
                      </div>
                      <div className="title-date-wrapper">
                        <h4 className="title">{comment.author.title}</h4>
                        <h4 className="date">{comment.publishedTimeText}</h4>
                      </div>
                      <h4 className="content">{comment.author.content}</h4>
                      {/* <h4 className="likes">{comment.author.stats.votes}</h4> */}
                    </div>
                  ))}
                </div>

              </div>
              
              {/* VIDEO SUGGESTIONS */}
              <div className="videos-container">
                {videos.map((video, index) => (
                  <Link to={`/Watch/${video.video.videoId}`} 
                    className='link' 
                    key={index}
                  >
                    <div className='video'>
                      <img src={video.video.thumbnails[1].url} alt="" className="video-img" />
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
        </section>
    </div>
  )
}
