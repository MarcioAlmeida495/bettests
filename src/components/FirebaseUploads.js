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
import { ImageFolder, password } from '../globalVariables';

export async function getImageURLs() {
  const listRef = ref(storage, ImageFolder);
  const result = await listAll(listRef);
  
  const urlPromises = result.items.map((itemRef) => getDownloadURL(itemRef));
  const urls = await Promise.all(urlPromises);

  return urls; // Array de URLs
}

export const FirebaseUploads = () => {
  const [pass, setPass] = useState('');
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
    LoadImages();
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
    const uniqueId = crypto.randomUUID(); // ou qualquer gerador único
    const filename = `${Date.now()}_${uniqueId}.jpg`;
    const storageRef = ref(storage, `${ImageFolder}${filename}`);
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
          LoadImages();
        });
      }
    );
  };
  
  const LoadImages = async () => {
    const urls = await getImageURLs();
    console.log('-->>',urls)
    const imagesRef = ref(storage, ImageFolder);
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
    <div className='photos'>
        <button onClick={()=>{
          document.getElementsByClassName('admindiv')[0].classList.toggle('expandedadmindiv')
        }} style={{position: 'absolute', top: 0, right: 0, zIndex: 901}}></button>
      <div className='admindiv'>
        <input style={
          {
            margin: '10px',
            padding: '5px',
            color: 'black'
          }
        } type='password' onChange={(e)=>{setPass(e.target.value); console.log(e.target.value)}} value={pass}/>
      </div>
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

      <button onClick={LoadImages}>Atualizar</button>

      <GalleryPhotos imagesUrls={images} admin={pass === password}/>
      
      {/* <div className="gallery">
        {images.map((url, i) => (
          <img key={i} src={url} alt={`img-${i}`} className="img-preview" />
        ))}
      </div> */}
    </div>
  );
}

