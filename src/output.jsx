import { useState, useRef, useEffect } from 'react';
import React from 'react';
import outputBackGround from "./img/output.png";
import { useParams } from 'react-router-dom';
import './App.css';

const OutputMusic = ({ handleGoHome, handleGoInputPicture }) => {
  const { filename } = useParams();
  const [emotion, setEmotion] = useState(null);
  const [bgm, setBgm] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchEmotion = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/classify/${filename}`);
        const data = await response.json();
        if (response.ok) {
          setEmotion(data.emotion);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchEmotion();
  }, [filename]);

  useEffect(() => {
    const fetchBgm = async () => {
      if (emotion) {
        try {
          const response = await fetch(`http://127.0.0.1:5000/bgm/${emotion}`);
          const data = await response.json();
          if (response.ok) {
            setBgm(`http://127.0.0.1:5000/static/sounds/${data.bgm}`);
          } else {
            console.error(data.error);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchBgm();
  }, [emotion]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
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
      <button 
        className={`play-button ${isPlaying ? 'playing' : 'paused'}`} 
        onClick={togglePlayPause}
      >
        <i className={`fas ${isPlaying ? 'fa-circle-stop' : 'fa-circle'} play-button-background`}></i>
        <i className={`fas ${isPlaying ? 'fa-stop' : 'fa-play'} play-button-overlay`}></i>
      </button>
      <div className="button-container">
        <button onClick={handleGoInputPicture}>もう一度</button>
        <button onClick={handleGoHome}>終わる</button>
      </div>
      {bgm && <audio ref={audioRef} src={bgm} />}
      {emotion ? <p>Detected Emotion: {emotion}</p> : <p>Loading...</p>}
    </div>
  );
}

export default OutputMusic;
