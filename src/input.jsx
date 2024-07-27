import { useState,useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import inputBackGround from "./img/input.png";

function InputPicture(){
    const[selectedFile,setSelectedFile]=useState(null);
    const [formDataURL,setFormDataURL] = useState(null);
    
    const pictureFileRef=useRef()

    const navigate = useNavigate();


    const handlePicture = async (e) =>{
      e.preventDefault();
      if (selectedFile) {
        const formData = new FormData();
        formData.append('picture', selectedFile);
        try {
          const response = await fetch('http://127.0.0.1:5000/images', {
            method: 'POST',
            body: formData
          });
          const data = await response.json();
          console.log(data);
          navigate(`/output/${data.filename}`);
        } catch (error) {
          console.error('Error uploading the file', error);
        }
      } else {
        console.log('No file selected');
      }
    }

    const handleFileInputChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormDataURL(reader.result);
          setSelectedFile(file);
        };
        reader.readAsDataURL(file);
      }

    }
    const handleGoOutputMusic = () => {
      navigate('/output'); // ボタンをクリックしたときに /page2 へナビゲート
    };
    return (
        <>
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
     <form onSubmit={handlePicture} encType='multipart/form-data'>
      <input 
      type="file"  
      accept='image/*' 
      ref={pictureFileRef}
      onChange={handleFileInputChange}
      ></input>
      <button onClick={handleGoOutputMusic} type='submit' disabled={!selectedFile}>写真を追加</button>
      </form>

      <div
      style={{
        width: "600px",
        height: "400px",
        border: "2px dashed #ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginBottom: "20px",
        backgroundImage: formDataURL ? `url(${formDataURL})` : "none"}}>
      </div>

    </div>
    </>
  );
}

export default InputPicture;

