import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Feed from './components/Feed';

function App() {
  return (
    <BrowserRouter basename='/'>
      <Navbar/>
      <Routes>
        <Route path='/MooTube' element={<Feed/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
