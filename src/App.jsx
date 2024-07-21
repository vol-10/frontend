import { useState } from 'react'
import React from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import InputPicture from "./input.jsx"
import Routess from './Routes.jsx'

function App() {
  const [count, setCount] = useState(0)

  const navigate = useNavigate();

  const handleGoInputPicture = () => {
    navigate('/input'); // ボタンをクリックしたときに /page2 へナビゲート
  };
  return (
    <>
      <div>
        hello worbv
        

      <h1>Input Picture Component</h1>
      <Link to="/input">InputPicture</Link>
      <button onClick={handleGoInputPicture}>Go to Page 2</button>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <Routes>
        <Route path="/input" component={InputPicture} />
        <Route path="/" component={App} exact />
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
