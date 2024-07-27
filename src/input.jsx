import { useState,useRef } from 'react'
import { useNavigate } from 'react-router-dom';

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
          navigate('/output');
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
    return (
        <>
     <h1>Input Picture</h1>
     <form onSubmit={handlePicture} encType='multipart/form-data'>
      <input 
      type="file"  
      accept='image/*' 
      ref={pictureFileRef}
      onChange={handleFileInputChange}
      ></input>
      <button type='submit'>写真を追加</button>
      </form>

      <div
      style={{
        width: "100%",
        height: "180px",
        border: "2px dashed #000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: formDataURL ? `url(${formDataURL})` : "none"}}>
        previewの表示
      </div>
        </>
    )
}

export default InputPicture;