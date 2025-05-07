import React, { useEffect, useState } from "react";
import { storage } from "./firebase";
import { listAll, getDownloadURL, ref } from "firebase/storage";
import "./styles.css"; // certifique-se que aqui tenha o CSS de grid

export const GalleryPhotos = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const folderRef = ref(storage, "images/");
        const res = await listAll(folderRef);
        const urls = await Promise.all(
          res.items.slice(0, 20).map((item) => getDownloadURL(item))
        );
        setImages(urls);
      } catch (error) {
        console.error("Erro ao carregar imagens:", error);
      }
    };

    loadImages();
  }, []);

  return (
    <div>
      <h2>Galeria de Fotos</h2>
      <div className="gallery-grid">
        {images.map((url, index) => (
          <div key={index} className="image-container">
            <img src={url} alt={`Imagem ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};
