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

export async function getImageURLs() {
  const listRef = ref(storage, 'images/');
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

    const storageRef = ref(storage, `images/${file.name}`);
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
    getImageURLs();
    const imagesRef = ref(storage, 'images/');
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
      <form onSubmit={handleSubmit} style={{height: 300, width: '100%'}}>
        
        <UploadPreview reset={`${progress === 100 ? true : false}`} getSelectedImage={(file)=>{setFileSelected(file)}}/>
        {fileSelected && !progress && <button  onClick={()=>{setClicked(true)}} type="submit">Enviar</button>}
      </form>
      <div className='progress'>

      {progress===100 && <span>Foto Enviada</span>}
      {clicked && <progress value={progress} max={100} />}
      </div>
      {imgURL && (
        <div>
          <h4>Imagem enviada:</h4>
          <img src={imgURL} alt="Upload" className="img-preview" />
        </div>
      )}

      <button onClick={loadImages}>Atualizar</button>

      <div className="gallery">
        {images.map((url, i) => (
          <img key={i} src={url} alt={`img-${i}`} className="img-preview" />
        ))}
      </div>
    </>
  );
}

