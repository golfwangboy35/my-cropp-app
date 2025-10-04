import React from 'react';

interface DownloadImageProps {
    url: string;
    fileName?: string; // необязательное имя файла
}

const DownloadImage = ({url,fileName}:DownloadImageProps):React.ReactElement => {
    return (
        <div>
            <label className="download-label">
                <a href={url} download={fileName}>
                    Скачать изображение
                </a>
            </label>
        </div>
    );
};

export default DownloadImage;