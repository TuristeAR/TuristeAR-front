import React from 'react';

interface Image {
  id: number;
  src: string;
}

interface ImageGalleryProps {
  images: Image[];
  height?: number; // Nuevo prop para controlar la altura en 'vh'
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, height }) => {
  const imageCount = images.length;

  const dynamicHeightClass40 = height ? 'h-[40vh]' : '';
  const dynamicHeightClass30 = height ? 'h-[30vh]' : '';
  const dynamicHeightClass70 = height ? 'h-[70vh]' : '';

  return (
    <div
      className={`grid ${dynamicHeightClass70} overflow-hidden ${
        imageCount > 1 ? 'grid-cols-[2fr_1fr]' : 'grid-cols-1'
      } gap-1 m-auto`}
    >
      {/* Primera columna más ancha */}
      {imageCount > 0 && (
        <div className="flex justify-center items-center h-full overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={images[0].src}
            alt={`Gallery image ${images[0].id}`}
          />
        </div>
      )}

      {/* Segunda columna con dos imágenes o condicionalmente menos */}
      {imageCount > 1 && (
        <div className="flex flex-col gap-1">
          <div className="overflow-hidden">
            <img
              className={`w-full ${dynamicHeightClass40} object-cover`}
              src={images[1].src}
              alt={`Gallery image ${images[1].id}`}
            />
          </div>
          {imageCount > 2 && (
            <div className="relative overflow-hidden">
              <img
                className={`w-full ${dynamicHeightClass30} object-cover`}
                src={images[2].src}
                alt={`Gallery image ${images[2].id}`}
              />
              {imageCount > 3 && (
                <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30">
                  <span className="text-gray text-6xl font-bold">
                    +{imageCount - 3}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
