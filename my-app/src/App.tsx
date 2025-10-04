import React, {useState} from 'react';
import Cropper from "react-easy-crop";
import './App.css';
import Resizer from "./components/Resizer";
import {getCroppedImg} from "./getCroppedImg";
import DownloadImage from "./components/DownloadImage";

function App() {
    const [crop, setCrop] = useState({x: 0, y: 0})
    const [zoom, setZoom] = useState(1)
    const [imageSrc,setImageSrc] = useState<string|null>("https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000")
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<{x:number,y:number,width:number,height:number}|null>(null);

    const onCropComplete = (_: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };


    const [croppedImage,setCroppedImage] = useState<string|null>(null)
    const showCroppedImage = async () => {
        if (!imageSrc || !croppedAreaPixels) return;
        try{
            const croppedUrl = await getCroppedImg(imageSrc,croppedAreaPixels!)
            setCroppedImage(croppedUrl)
        }
        catch(err){
            console.error(err)
        }
    }

    const handleFileChange = (event:React.ChangeEvent<HTMLInputElement>):void => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = ():void =>{
                setImageSrc(reader.result as string)
            }
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className="App">
            <div className="crop-container">
                {
                    imageSrc && <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={4 / 3}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />
                }

            </div>
            <div className="setting-container">
                <Resizer zoom={zoom} setZoom={setZoom}/>
                <button onClick={showCroppedImage}>Применить обрезку</button>
                {croppedImage && <DownloadImage url={croppedImage} fileName="cropped.png" />}
                <label className="file-label">
                    Загрузить фото
                    <input
                        type="file"
                        className="file-input"
                        accept="image/*"
                        onChange={handleFileChange}
                        hidden
                    />
                </label>
            </div>
        </div>
    );
}

export default App;