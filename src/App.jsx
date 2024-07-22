import { useState } from 'react'
import React from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter , Route, Routes, Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import InputPicture from "./input.jsx"
import OutputMusic from "./output.jsx"
import Routess from './Routes.jsx'
import Home from "./Home"
function App() {
  const [count, setCount] = useState(0)

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
    <>
      <div>
      <Link to="/input">InputPicture</Link>
      <button onClick={handleGoHome}>Go to Home</button>
      <button onClick={handleGoInputPicture}>Go to Input</button>
      <button onClick={handleGoOutputMusic}>Go to Output</button>
      </div>

      <Routes>
      <Route path={"/"} element={<Home />}/>
        <Route path="/input" element={InputPicture()} />
        <Route path="/output" element={OutputMusic()} />
      </Routes>

    </>
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
