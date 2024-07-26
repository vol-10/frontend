import { useState,useRef } from 'react'
import React from "react"
import OutputMusic from "./output.jsx"
import { useNavigate } from 'react-router-dom';
import {  Route, Routes} from 'react-router-dom';

function InputPicture(){
    const[selectedFile,setSelectedFile]=useState(null);
    
    const pictureFileRef=useRef()

    const navigate = useNavigate();

    const handleGoOutputMusic = () => {
      navigate('/output'); // ボタンをクリックしたときに /page2 へナビゲート
    };

    const handlePicture=()=>{

        handleGoOutputMusic()
    }

    const handleFileInputChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedFile(reader.result);
        };
        reader.readAsDataURL(file);
      }


    }
    return (
        <>
     <h1>Input Picture</h1>
      <input 
      type="file"  
      accept='image/*' 
      ref={pictureFileRef}
      onChange={handleFileInputChange}
      ></input>
      <button onClick={handlePicture}>写真を追加</button>

      <img src={selectedFile} alt="Preview" style={{ maxWidth: '100%' }} />
      <Routes>
        <Route path="/output" element={OutputMusic()} />
      </Routes>
        </>
    )
}

export default InputPicture;