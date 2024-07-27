import { useState, useRef, useEffect } from 'react';
import React from 'react';
import outputBackGround from "./img/output.png";
import { useParams } from 'react-router-dom';

const OutputMusic=({ handleGoHome, handleGoInputPicture }) =>{
  const { filename } = useParams();
  const [emotion, setEmotion] = useState(null);
  const [musics, setMusic] = useState([{ id: 1, name: 'music1' }]);
  const musicNameRef = useRef();

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
  const handleMusic = () => {
    const musicName = musicNameRef.current.value;
    if (musicName.trim() === '') return; // 空の入力を防ぐ
    setMusic((prevMusics) => {
      return [...prevMusics, { id: prevMusics.length + 1, name: musicName }];
    });
    musicNameRef.current.value = null;
  };

  return (
    <div style={{ 
      backgroundImage: `url(${outputBackGround})`,
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
      <input type="text" ref={musicNameRef}></input>
      <button onClick={handleMusic}>音楽が流れる</button>
      <button onClick={handleGoHome}>Go to Home</button>
      <button onClick={handleGoInputPicture}>Go to Input</button>
      <ul>
        {musics.map((music) => (
          <li key={music.id}>{music.name}</li>
        ))}
      </ul>
      {emotion ? <p>Detected Emotion: {emotion}</p> : <p>Loading...</p>}
    </div>
  );
}

export default OutputMusic;