import background from "./img/sample.png";
import logo from './img/logo.png'


const Home = ({handleGoInputPicture, handleGoOutputMusic}) => {
    return (
      <div style={{ 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${background})`,
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
       <img src={logo} alt="Logo" style={{ height: '300px', marginBottom: '20px' }} /> {/* ロゴ画像を追加 */}
      <button className="buttonNeumorphism"  onClick={handleGoInputPicture}>Start</button>
      </div>
    );
  };
  
  export default Home;