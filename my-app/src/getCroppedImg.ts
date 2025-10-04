export const getCroppedImg = async (imageSrc: string, pixelCrop: {x:number,y:number,width:number,height:number}) => {
    return new Promise<string>((resolve, reject) => {
        const image = new Image();
        image.src = imageSrc;
        image.crossOrigin = 'anonymous'; // если изображение с другого домена
        image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = pixelCrop.width;
            canvas.height = pixelCrop.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) return reject('No context');

            ctx.drawImage(
                image,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                pixelCrop.width,
                pixelCrop.height
            );

            canvas.toBlob((blob) => {
                if (!blob) return reject('Blob error');
                resolve(URL.createObjectURL(blob)); // получаем URL для скачивания
            }, 'image/png');
        };
        image.onerror = err => reject(err);
    });
};
