import { useState } from 'react'
import './App.css'

function App() {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("https://www.youtube.com/");
  const [qrSize, setQrSize] = useState("150");
  async function generateQR() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}*${qrSize}&data=${encodeURIComponent(qrData)}`;
      setImg(url);
    } catch (error) {
      console.error("Error generating QR Code", error);
    } finally {
      setLoading(false);
    }
  }

  function donwloadQR(){
    fetch(img).then((resposne) => resposne.blob()).then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error) => {
      console.error("Error downloading QR code", error);
    })
  }

  return (
    <div className="app-container">
      <h1>QR Code Generator</h1>
      {loading && <p>Please wait...</p>}
      {img && <img src={img} className="qr-code-image" />}
      <div>
        <label htmlFor="dataInput" className="input-label">Data for QR Code:
        </label>
        <input type="text" id="dataInput" value={qrData} placeholder="Enter data for QR Code" onChange={(e)=>setQrData(e.target.value)} />
        <label htmlFor="sizeInput" className="input-label">Image Size (e.g., 100):
        </label>
        <input type="text" id="sizeInput" value={qrSize} placeholder="Enter Image Size" onChange={(e)=>setQrSize(e.target.value)}/>
        <button className="generate-button" disabled={loading} onClick={generateQR}>Generate QR Code</button>
        <button className="download-button" onClick={donwloadQR}>Download QR Code</button>
      </div>
      <p className="footer">
        Designed By <a href="#">Karthi</a>
      </p>
    </div>
  )
}

export default App
