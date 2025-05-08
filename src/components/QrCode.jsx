import { useEffect, useState } from "react";

const copiarTexto = async (texto) => {
    try {
      await navigator.clipboard.writeText(texto);
      console.log('Texto copiado!');
    } catch (err) {
      console.error('Erro ao copiar texto: ', err);
    }
  };

  

export const QrCode = () => {
    const code = '00020126330014BR.GOV.BCB.PIX0111118727966805204000053039865802BR5924Beatriz Vitoria Ferreira6009SAO PAULO62140510vtz3l6j4gu6304C3E0';
    const [clicked, setClicked] = useState(false);
    const [changeImg, setChangeImg] = useState(0);
    const [isExtra, setIsExtra] = useState(false);
    useEffect(()=>{
      setTimeout(() => {
        setChangeImg(img => (img+1)%6);
        console.log(changeImg);
      }, 2000);
    },[changeImg])
    
    useEffect(()=>{
        if(clicked){setTimeout(() => {
            setClicked(false);
        }, 1000);}
      },[clicked])
    return <div className='beforebody' >

    <div className={'body'}>
    
    
    <div style={{
      display:'flex',
      width: '100%',
      position: 'relative',
      flexDirection: 'column',
      height: '100vh',
      justifyContent: 'end',
      alignItems: 'center',
      textAlign: 'center',
      zIndex: '5',
      paddingTop: '100px'}}>
    <div className="imageWrapper">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <img
              key={i}
              alt=""
              src={`images/biia${i}.jpg`}
              className={`imgReal ${changeImg === i ? 'active' : ''}`}
            />
          ))}
        </div>

    {/* <img alt="" className="imaged" src="images/bg.png"/> */}
    
    <br />
    <div style={{width: '300px'}}>
    <h3>
      Presenteie com PIX
      </h3>
    <p>
    Se quiser nos presentear com algo especial, preparamos um QR Code exclusivo para PIX.
    Qualquer valor será recebido com muito carinho e gratidão.
    </p>

    </div>
    <br />
    <div style={{marginBottom: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

    <img onClick={()=>{
      if(!isExtra)copiarTexto(code); setClicked(true);
      setIsExtra(!isExtra);
      
    }} alt='pix' className={`qrcode ${isExtra ? 'extraWidth' : ''}`} src={`images/qrcode.png`}/>
        <br/>
        <p>clique no qr code para copiar e expandir</p>
        <br />
        {clicked && <p style={{position: 'absolute', bottom: '45px'}}>
            Link Copiado!
        </p>}

    </div>
      </div>
      
      </div>
      </div> 
}