import { useState } from 'react';
import './App.css';
import { QrCode } from './components/QrCode';
import { UploadPhotos } from './components/UploadPhotos';

function App() {
  const [clicked, setClicked] = useState(false);
  return <div className='background'>

  <div style={{maxWidth: 600, width: '100%',position: 'relative'}}>
  
  <button className={`homefoto ${clicked ? '' : 'changepos'}`} onClick={()=>{setClicked(!clicked)}}>{clicked ? 'Home' : 'Fotos'}</button>
  { <QrCode />}
    <UploadPhotos className={`upphotos ${clicked ? 'expanded' : ''}`}/>
  </div> 
  </div> 
    
}

export default App;
