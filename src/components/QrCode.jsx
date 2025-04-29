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
    return <div style={{display:'flex', position: 'relative', flexDirection: 'column', height: '100vh', justifyContent: 'end', alignItems: 'center', textAlign: 'center', zIndex: '5', padding: '40px', paddingTop: '100px', paddingBottom: '50px'}}>
    <div className="imageWrapper">
      <img alt='' src={`images/biia${changeImg}.jpg`} className="imgReal" />
    </div>

    {/* <img alt="" className="imaged" src="images/bg.png"/> */}
    <img alt='pix' width={'100px'} src={`images/qrcode.png`}/>
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
        <button className="buttonCopy" onClick={()=>{copiarTexto(code); setClicked(true)}}>Clique Aqui para Copiar o Código.</button>
        {clicked && <span style={{position:'absolute', bottom: '-20px'}}>Código Copiado</span>}
    </div>
}