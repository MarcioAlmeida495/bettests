import React, { useEffect, useRef, useState } from "react";

export const UploadPreview = ({getSelectedImage = () => {}, reset}) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const refInput = useRef(null);
  useEffect(()=>{
        getSelectedImage(file)
    },[file, getSelectedImage]);

  useEffect(()=>{setPreview(null); setFile(null)},[reset]);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Aqui ele lê como base64
      };
      reader.readAsDataURL(selectedFile); // Lê o arquivo como URL
    }
  };

  return (
    <div style={{position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {!file && <img className="img-select" onClick={()=>refInput.current.click()} src="camera.png"  alt='test' />}
      <input type="file" ref={refInput} accept="image/*" style={{display: 'none'}} onChange={handleFileChange} />
      {preview && (
        <div style={{width: 250, height:250, position: 'relative'}}>
          <button onClick={(e)=>{
            e.preventDefault();
            setFile(null);
            setPreview(null)
          }} style={{position: 'absolute', top: 0, right: 0}}>x</button>
          <img src={preview} alt="Pré-visualização" style={{ width:  '100%', height:  '150px', objectFit: "cover" }} />
        </div>
      )}
    </div>
  );
};
