
import React from 'react';

import './App.css'
import { Route, Routes} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import InputPicture from "./input.jsx"
import OutputMusic from "./output.jsx"
import Home from "./Home"
function App() {

  const navigate = useNavigate();

  const handleGoInputPicture = () => {
    navigate('/input'); // ボタンをクリックしたときに /page2 へナビゲート
  };

  const handleGoHome = () => {
    navigate('/'); // ボタンをクリックしたときに /page2 へナビゲート
  };

  const handleGoOutputMusic = () => {
    navigate('/output'); // ボタンをクリックしたときに /page2 へナビゲート
  };

  return (
    


      <Routes>
      <Route path="/" element={<Home 
        handleGoInputPicture={handleGoInputPicture} 
        handleGoOutputMusic={handleGoOutputMusic} 
      />} />
        
      <Route path="/output/:filename" element={<OutputMusic 
        handleGoHome={handleGoHome} 
        handleGoInputPicture={handleGoInputPicture} 
      />} />
      <Route path="/input" element={<InputPicture
       handleGoOutputMusic={handleGoOutputMusic} 
      />} />
      </Routes>

  )
}

export default App

{/*
  <Router>
<Routes>
<Route path="/" element={<InputPicture />} /> 
</Routes>
</Router>
*/}
