import React, { useEffect, useState } from "react";
import { storage } from "./firebase";
import { listAll, getDownloadURL, ref } from "firebase/storage";
import "./styles.css"; // certifique-se que aqui tenha o CSS de grid

export const GalleryPhotos = ({images}) => {
  const [showModal, setShowModal] = useState(false);
  const [slideMode, setSlideMode] = useState(false);
  const [photoIndex, setPhotoIndex] = useState();

  useEffect(()=>{
    console.log(`slidemode: ${slideMode}, url: ${images[photoIndex]}`)
    if(slideMode){
      setTimeout(() => {
        setPhotoIndex(pI => (pI+1)%images.length);
      }, 3000);
    }
  },[photoIndex, images, slideMode])

  useEffect(()=>{
    if(!showModal)setSlideMode(false);
  }, [showModal])

  return <>
    {images && <>
      {showModal && <div className="modalbackground">
          <button className="close-btn" onClick={()=>{setShowModal(false)}}>Fechar</button>
          <button className="slidemode-btn" onClick={()=>{setSlideMode(!slideMode)}}>{`${slideMode ? 'Desativar' : 'Ativar'}`} modo Slide</button>
        <div className="modal">
          <img src={images[photoIndex]} alt="modaled"/>
        </div>
      </div>}
      <div className="gallery-grid">
        {images.map((url, index) => {
          console.log(url)
          return <div key={index} className="image-container">
            <img src={url} onClick={()=>{setShowModal(true); setPhotoIndex(index)}} alt={`Imagem ${index}`} />
          </div>
        })}
      </div>
    </>}
        </>
};
