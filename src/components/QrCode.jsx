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
    useEffect(()=>{
        if(clicked){setTimeout(() => {
            setClicked(false);
        }, 1000);}
      },[clicked])
    return <div style={{display:'flex', position: 'relative', flexDirection: 'column', height: '100vh', justifyContent: 'end', alignItems: 'center', textAlign: 'center', zIndex: '5', paddingTop: '100px'}}>
    <img alt='pix' width={'150px'} src="images/qrcode.png"/>
    <h3>QR code para Arrecadação de Fundos para o Casamento.</h3>
    <br />
        <button className="buttonCopy" onClick={()=>{copiarTexto(code); setClicked(true)}}>Clique Aqui para Copiar o Código.</button>
        {clicked && <span style={{position:'absolute', bottom: '-20px'}}>Código Copiado</span>}
    </div>
}