import { useEffect, useState } from 'react';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll
} from 'firebase/storage';
import { storage } from './firebase';
import './App.css';
import { UploadPreview } from './SelectImage';
import { GalleryPhotos } from './GalleryPhotos';

export async function getImageURLs() {
  const listRef = ref(storage, 'betphotos/');
  const result = await listAll(listRef);
  
  const urlPromises = result.items.map((itemRef) => getDownloadURL(itemRef));
  const urls = await Promise.all(urlPromises);

  return urls; // Array de URLs
}

export const FirebaseUploads = () => {
  const [progress, setProgress] = useState(0);
  const [imgURL, setImgURL] = useState('');
  const [images, setImages] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [fileSelected, setFileSelected] = useState(null);
  useEffect(()=>{
    if(imgURL)setTimeout(() => {
      setImgURL('');
    }, 3000);
  },[imgURL])

  useEffect(()=>{
    loadImages();
  },[])

  useEffect(()=>{
    console.log(progress);
    if(progress === 100){
      setTimeout(() => {
        setClicked(false);
        setProgress(0);
      }, 3000);
    }
  }, [progress])
  const handleSubmit = (event) => {
    event.preventDefault();
    const file = event.target[0]?.files[0];
    if (!file) return;

    const storageRef = ref(storage, `betphotos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(prog);
      },
      (error) => alert(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          // setImgURL(url);
          loadImages();
        });
      }
    );
  };
  
  const loadImages = async () => {
    const urls = await getImageURLs();
    console.log('-->>',urls)
    const imagesRef = ref(storage, 'betphotos/');
    try {
      console.log('clicked')
      console.log(imagesRef)
      const res = await listAll(imagesRef);
      console.log(res);
      const urls = await Promise.all(
        res.items.map((itemRef) => getDownloadURL(itemRef))
      );
      setImages(urls);
    } catch (err) {
      alert("Erro ao carregar imagens: " + err.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{height: 200, width: '150px'}}>
        
        <UploadPreview reset={`${progress === 100 ? true : false}`} getSelectedImage={(file)=>{setFileSelected(file)}}/>
        {fileSelected && !progress && <button  onClick={()=>{setClicked(true)}} type="submit">Enviar</button>}
      </form>
      <div className='progress'>
        {clicked && <progress value={progress} max={100} />}
        {progress===100 && <span>Foto Enviada</span>}
      </div>
      {imgURL && (
        <div>
          <h4>Imagem enviada:</h4>
          <img src={imgURL} alt="Upload" className="img-preview" />
        </div>
      )}

      <button onClick={loadImages}>Atualizar</button>

      <GalleryPhotos images={images}/>
      
      {/* <div className="gallery">
        {images.map((url, i) => (
          <img key={i} src={url} alt={`img-${i}`} className="img-preview" />
        ))}
      </div> */}
    </>
  );
}

