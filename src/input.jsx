import { useState,useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import inputBackGround from "./img/input.png";

function InputPicture(){
    const[selectedFile,setSelectedFile]=useState(null);
    const [formDataURL,setFormDataURL] = useState(null);
    const [videoStream, setVideoStream] = useState(null);
    const [cameraActive, setCameraActive] = useState(false);

    const pictureFileRef=useRef();
    const videoRef = useRef();
    const canvasRef = useRef();
    const navigate = useNavigate();



    useEffect(() => {
      if (cameraActive) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            setVideoStream(stream);
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              videoRef.current.play();
            }
          })
          .catch(error => {
            console.error('Error accessing camera', error);
          });
      } else {
        if (videoStream) {
          videoStream.getTracks().forEach(track => track.stop());
        }
      }
    }, [cameraActive]);

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
      navigate('/output/:filename'); // ボタンをクリックしたときに /page2 へナビゲート
    };

    const handleStartCamera = () => {
      setCameraActive(true);
    };
  
    const handleStopCamera = () => {
      setCameraActive(false);
    };


    const handleCapturePhoto = () => {
      if (videoRef.current && canvasRef.current) {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageDataURL = canvas.toDataURL('image/png');
        setFormDataURL(imageDataURL);
        setSelectedFile(dataURLtoFile(imageDataURL, 'captured-image.png'));
        handleStopCamera();
      }
    };

    const dataURLtoFile = (dataurl, filename) => {
      const arr = dataurl.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
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
      <button type='submit' disabled={!selectedFile}>写真を追加</button>
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
            position: 'relative',
            overflow: 'hidden',
            display: cameraActive ? 'none' : 'flex', // カメラがアクティブなときに非表示
          }}>
          {formDataURL && !cameraActive && (
            <img src={formDataURL} alt="Selected" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          )}
        </div>
        {cameraActive ? (
          <>
            <video ref={videoRef} style={{ width: "600px", height: "400px" }}></video>
            <button onClick={handleCapturePhoto}>写真を撮る</button>
            <button onClick={handleStopCamera}>カメラを停止</button>
          </>
        ) : (
          <button onClick={handleStartCamera}>カメラを開始</button>
        )}

        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
    </>
  );
}

export default InputPicture;

