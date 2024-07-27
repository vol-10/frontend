import { useState, useRef } from 'react';
import React from 'react';
import inputBackGround from "./img/input.png";

const InputPicture = ({ handleGoOutputMusic }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const pictureFileRef = useRef();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ 
      backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${inputBackGround})`,
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
    
      <h1>Input Picture</h1>

      <button onClick={handleGoOutputMusic} disabled={!selectedFile}>写真を追加</button>
      <div className={`image-preview-container ${selectedFile ? 'image-selected' : ''}`}>
        {selectedFile ? (
          <img src={selectedFile} alt="Preview" className="image-preview" />
        ) : (
          <p></p>
        )}
      </div>
      <input 
        type="file" 
        accept="image/*" 
        ref={pictureFileRef}
        onChange={handleFileInputChange}
      />
    </div>
  );
};

export default InputPicture;