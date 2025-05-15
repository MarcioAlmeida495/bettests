import React, { useEffect, useMemo, useState } from "react";
import "./styles.css";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "./firebase"; // ajuste o caminho se necessário
const excluirImagemPorUrl = async (url) => {
  try {
    // Extrai o caminho do arquivo da URL pública
    const caminho = decodeURIComponent(
      url.split("/o/")[1].split("?")[0]
    );

    // Cria a referência no Firebase Storage
    const imagemRef = ref(storage, caminho);

    // Deleta o arquivo
    await deleteObject(imagemRef);

    // Retorna sucesso
    return true;
  } catch (error) {
    console.error("Erro ao excluir imagem:", error);
    return false;
  }
};

const loadNumberOfImages = (images, number) => {
  var arrayOfImages = [];
  for(var i=0; i<number && i<images.length; i++){
    arrayOfImages.push(images[i]);
  }

  return arrayOfImages;
}
export const GalleryPhotos = ({ imagesUrls, admin }) => {
  const [showModal, setShowModal] = useState(false);
  const [slideMode, setSlideMode] = useState(false);
  const [photoIndex, setPhotoIndex] = useState();
  const [images, setImages] = useState([]);
  const [loadNumber, setLoadNumber] = useState(16);
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
    
    return loadNumberOfImages(images, loadNumber).map((url, index) => (
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
          <button onClick={()=>{excluirImagemPorUrl(url).then(setImages(images.filter((image) => url !== image)))}}></button>
        </>}
      </div>
    ));
  }, [images, admin, loadNumber]);

  return (
    <>
    
      {images && (
        <>
          {showModal && (
            <div className="modalbackground">
                <div className="divbutton">
                  <div className="leftbutton" onClick={()=>{setPhotoIndex(photoIndex-1)}}></div>
                  <div className="rightbutton" onClick={()=>{setPhotoIndex(photoIndex+1)}}></div>
                </div>
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
          <div onScroll={(e) => {
            const element = e.target;
            console.log("scrollTop:", element.scrollTop);
            console.log("scrollHeight:", element.scrollHeight);
            console.log("clientHeight:", element.clientHeight);

            if (element.scrollTop + element.clientHeight >= element.scrollHeight - 5) {
              if(loadNumber < images.length)setLoadNumber(loadNumber + 16);
            }
          }} className="gallery-grid">{galleryGrid}</div>
        </>
      )}
    </>
  );
};
