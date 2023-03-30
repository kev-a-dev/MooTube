import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Feed from './components/Feed';
import VideoPage from './components/VideoPage';

function App() {
  return (
    <BrowserRouter basename='/'>
      <Navbar/>
      <Routes>
        <Route path='/MooTube' element={<Feed/>}/>
        <Route path='/VideoPage' element={<VideoPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
