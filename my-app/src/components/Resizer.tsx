import React, {useState} from 'react';

type ZoomProps = {
    zoom: number;
    setZoom: (zoom: number) => void;
}

const Resizer = ({zoom,setZoom}:ZoomProps):React.ReactElement => {
    return (
        <div className="controls">
            <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e) => setZoom(Number(e.target.value))}
                className="zoom-range"
            />
        </div>
    );
};

export default Resizer;