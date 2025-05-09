import React, { useEffect, useMemo, useState } from "react";
import "./styles.css";

export const GalleryPhotos = ({ imagesUrls, admin }) => {
  const [showModal, setShowModal] = useState(false);
  const [slideMode, setSlideMode] = useState(false);
  const [photoIndex, setPhotoIndex] = useState();
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (slideMode) {
      const timer = setTimeout(() => {
        setPhotoIndex(pI => (pI + 1) % images.length);
      }, 3000);
      return () => clearTimeout(timer); // limpa timeout se slideMode mudar
    }
  }, [photoIndex, images, slideMode]);

  useEffect(()=>{
    if(imagesUrls)setImages(imagesUrls.slice().reverse());
  },[imagesUrls])

  useEffect(() => {
    if (!showModal) setSlideMode(false);
  }, [showModal]);

  // Memoriza a renderização da grade
  const galleryGrid = useMemo(() => {
    if (!images) return null;
    return images.map((url, index) => (
      <div key={index} className="image-container">
        <img
          src={url}
          onClick={() => {
            setShowModal(true);
            setPhotoIndex(index);
          }}
          alt={`Imagem ${index}`}
        />
        {console.log(typeof admin)}
        {admin === true && <>
        {console.log(`${admin} logo entrou`)}
          <button></button>
        </>}
      </div>
    ));
  }, [images, admin]);

  return (
    <>
      {images && (
        <>
          {showModal && (
            <div className="modalbackground">
              <button className="close-btn" onClick={() => setShowModal(false)}>
                Fechar
              </button>
              <button
                className="slidemode-btn"
                onClick={() => setSlideMode(!slideMode)}
              >
                {slideMode ? "Desativar" : "Ativar"} modo Slide
              </button>
              <div className="modal">
                <img src={images[photoIndex]} alt="modaled" />
              </div>
            </div>
          )}
          <div className="gallery-grid">{galleryGrid}</div>
        </>
      )}
    </>
  );
};
