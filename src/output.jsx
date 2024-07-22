import { useState,useRef } from 'react'
import React from "react"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Link } from 'react-router-dom'


function OutputMusic(){
    const[musics,setMusic]=useState([{id:1,name:"music1"},]);
    
    const musicNameRef=useRef()

    const handleMusic=()=>{
        const musicName=musicNameRef.current.value;
        setMusic((prevMusics)=>{
            return [...prevMusics, {id:"1", name: musicname}];
        });
        musicNameRef.current.value=null;
    }
    return (
        <>
     <h1>Output Music</h1>
      <input type="text" ref={musicNameRef}></input>
      <button onClick={handleMusic}>音楽が流れる</button>
      <ul>
        {musics.map((music) => (
          <li key={music.id}>{music.name}</li>
        ))}
      </ul>
 
        </>
    )
}

export default OutputMusic;