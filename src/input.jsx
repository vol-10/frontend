import { useState,useRef } from 'react'
import React from "react"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Link } from 'react-router-dom'


function InputPicture(){
    const[pictures,setPictures]=useState([{id:1,name:"picture1"},]);
    
    const pictureNameRef=useRef()

    const handlePicture=()=>{
        const pictureName=pictureNameRef.current.value;
        setPictures((prevPictures)=>{
            return [...prevPictures, {id:"1", name: pictureName}];
        });
        pictureNameRef.current.value=null;
    }
    return (
        <>
     <h1>Input Picture</h1>
      <input type="file" ref={pictureNameRef}></input>
      <button onClick={handlePicture}>写真を追加</button>
      <ul>
        {pictures.map((picture) => (
          <li key={picture.id}>{picture.name}</li>
        ))}
      </ul>
 
        </>
    )
}

export default InputPicture;