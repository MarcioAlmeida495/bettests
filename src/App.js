import { useState } from 'react';
import './App.css';
import { QrCode } from './components/QrCode';
import { UploadPhotos } from './components/UploadPhotos';

function App() {
  const [clicked, setClicked] = useState(false);
  return <>
  <button style={{position: 'fixed', zIndex: '111'}} onClick={()=>{setClicked(!clicked)}}>{clicked ? 'Home' : 'Fotos'}</button>
  { <QrCode />}
    <UploadPhotos className={`upphotos ${clicked ? 'expanded' : ''}`}/>
  </> 
    
}

export default App;
