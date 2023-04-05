import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {AppProvider} from './components/AppContext';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import Watch from './components/Watch';
import SearchResults from './components/SearchResults';

function App() {
  const [disableBar, setDisableBar] = useState(false);

  return (
    <BrowserRouter basename='/'>
      <AppProvider>
        <Navbar disableBar={disableBar}/>
        <Routes>
          <Route path='/MooTube' element={<Feed/>}/>
          <Route path='/Watch/:id' element={<Watch setDisableBar={setDisableBar}/> }/>
          <Route path='/SearchResults' element={<SearchResults setDisableBar={setDisableBar}/>}/>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
