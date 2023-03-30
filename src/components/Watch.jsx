import React from 'react'
import './Watch.css';

import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

export default function Watch() {

  const { id } = useParams();
  
  return (
    <div>
        <section id="videopage">
            <div className="container">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${id}`}
                  controls={true}
                />
            </div>
        </section>
    </div>
  )
}
