import React, { useEffect, useState } from "react";
import { storage } from "./firebase";
import { listAll, getDownloadURL, ref } from "firebase/storage";
import "./styles.css"; // certifique-se que aqui tenha o CSS de grid

export const GalleryPhotos = ({images}) => {
  const [modalInfo, setModalInfo] = useState(null);
  return <>
    {images && <div>
      {modalInfo && <div className="modalbackground">
        <div className="modal">
          <img src={modalInfo} alt="modaled"/>
          <button className="close-btn" onClick={()=>{setModalInfo(null)}}>Fechar</button>
        </div>
      </div>}
      <div className="gallery-grid">
        {images.map((url, index) => {
          console.log(url)
          return <div key={index} className="image-container">
            <img src={url} onClick={()=>{setModalInfo(url)}} alt={`Imagem ${index}`} />
          </div>
        })}
      </div>
    </div>}
        </>
};
