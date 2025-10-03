import React, {useState} from 'react';
import Cropper from "react-easy-crop";
import './App.css';
import Resizer from "./components/Resizer";

function App() {
    const [crop, setCrop] = useState({x: 0, y: 0})
    const [zoom, setZoom] = useState(1)
    const onCropComplete = (
        croppedArea:
        {
        x: number; // смещение рамки по X (%)
        y: number; // смещение рамки по Y (%)
        width: number; // ширина рамки (%)
        height: number; // высота рамки (%)
        },
        croppedAreaPixels: {
            x: number; // смещение по X в px
            y: number; // смещение по Y в px
            width: number; // ширина области в px
            height: number; // высота области в px
        }
    ) => {
        console.log(croppedArea, croppedAreaPixels)
    }


    return (
        <div className="App">
            <div className="App">
                <div className="crop-container">
                    <Cropper
                        image="https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"
                        crop={crop}
                        zoom={zoom}
                        aspect={4 / 3}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />
                </div>
                <Resizer zoom={zoom} setZoom={setZoom} />
            </div>
        </div>
    );
}

export default App;