import React, { useRef, useState } from 'react'
import './App.css'
import './hat.png'
const App = () => {
  const counterRef = useRef()
  const canvasRef = useRef()
  const [localUrl, setLocalUrl] = useState(null)
  const handleClick = () => {
    try {
      const file = counterRef.current.files[0]
      const localUrl = URL.createObjectURL(file)
      setLocalUrl(localUrl);
      const ctx = canvasRef.current.getContext('2d')
      const img1 = new Image()
      img1.src = localUrl;
      img1.setAttribute("crossOrigin", 'Anonymous')
      img1.onload = () => {
        ctx.drawImage(img1, 0, 0, 160, 160)
        const img2 = new Image()
        img2.setAttribute("crossOrigin", 'Anonymous')
        img2.src = "https://s3.bmp.ovh/imgs/2021/10/45eb7d8b67d8f1e6.png"
        img2.onload = () => {
          ctx.drawImage(img2, 0, 0, 160, 160)
        }
      }
    } catch (error) {
      console.log(error);
    }

  }
  const download = () => {
    const href = canvasRef.current.toDataURL()
    const a = document.createElement('a')
    a.download = 'download'
    a.href = href
    a.dispatchEvent(new MouseEvent('click'))
  }
  return (
    <div>
      <div className="content" >
        <div className="header" ></div>
        <div className="box" >
          {/* {
            localUrl? 
            // eslint-disable-next-line jsx-a11y/alt-text
            <div><img src={localUrl} /> <img className="bck" src="http://www.qingyin8.com/gq2/img/hat0.png" /></div>: null
          } */}
          <canvas ref={canvasRef} ></canvas>
        </div>
        <div className="download" >
          <input ref={counterRef} accept="image/**" onChange={handleClick} type="file" />
          {
            localUrl ?
              <button onClick={download} >下载</button> : null
          }
        </div>

      </div>
    </div>
  )
}

export default App
