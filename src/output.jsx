import { useState, useRef } from 'react';
import React from 'react';
import outputBackGround from "./img/output.png";
import './App.css'
const OutputMusic=({ handleGoHome, handleGoInputPicture }) =>{
  const [musics, setMusic] = useState([{ id: 1, name: 'music1' }]);
  const [isPlaying, setIsPlaying] = useState(false); // アイコンの状態を管理するためのステート
  const musicNameRef = useRef();

  const handleMusic = () => {
    const musicName = musicNameRef.current.value;
    if (musicName.trim() === '') return; // 空の入力を防ぐ
    setMusic((prevMusics) => {
      return [...prevMusics, { id: prevMusics.length + 1, name: musicName }];
    });
    musicNameRef.current.value = null;
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div style={{ 
      backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${outputBackGround})`,
      height: '100vh',
      width: '100vw',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      color: '#fff',
      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
    }}>

      <h1>Output Music</h1>
      <br/>
      <br/>
      <br/>      <br/>
      <br/>
      <br/>
      <button 
        className={`play-button ${isPlaying ? 'playing' : 'paused'}`} 
        onClick={togglePlayPause}
      >
        {/* 背景アイコン */}
        <i className={`fas ${isPlaying ? 'fa-circle-stop' : 'fa-circle'} play-button-background`}></i>
        {/* 前景アイコン */}
        <i className={`fas ${isPlaying ? 'fa-stop' : 'fa-play'} play-button-overlay`}></i>
      </button>

      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>      <br/>
      <br/>
      <br/>

      <div className="button-container">
      <button onClick={handleGoInputPicture}>もう一度</button>
        <button onClick={handleGoHome}>終わる</button>

      </div>
      <ul>

      </ul>
    </div>
  );
}

export default OutputMusic;