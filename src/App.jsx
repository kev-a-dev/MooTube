import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Feed from './components/Feed';
import Watch from './components/Watch';
import SearchResults from './components/SearchResults';

function App() {
  return (
    <BrowserRouter basename='/'>
      <Navbar/>
      <Routes>
        <Route path='/MooTube' element={<Feed/>}/>
        <Route path='/Watch/:id' element={<Watch/>}/>
        <Route path='/SearchResults' element={<SearchResults/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
