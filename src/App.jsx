import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Feed from './components/Feed';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Feed/>}/>
    </Routes>
    </>
  );
}

export default App;
