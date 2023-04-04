import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {AppProvider} from './components/AppContext';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import Watch from './components/Watch';
import SearchResults from './components/SearchResults';

function App() {
  return (
    <BrowserRouter basename='/'>
      <AppProvider>
        <Navbar/>
        <Routes>
          <Route path='/MooTube' element={<Feed/>}/>
          <Route path='/Watch/:id' element={<Watch/>}/>
          <Route path='/SearchResults' element={<SearchResults/>}/>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
