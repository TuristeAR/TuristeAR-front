import React from 'react';

interface Image {
  id: number;
  src: string;
}

interface ImageGalleryProps {
  images: Image[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const imageCount = images.length;

  return (
    <div
      className={`grid ${
        imageCount > 1 ? 'grid-cols-[2fr_1fr]' : 'grid-cols-1'
      } gap-1  m-auto `}
    >
      {/* Primera columna más ancha */}
      {imageCount > 0 && (
        <div className="flex justify-center items-center h-full">
          <img
            className="h-full max-w-full"
            src={images[0].src}
            alt={`Gallery image ${images[0].id}`}
          />
        </div>
      )}

      {/* Segunda columna con dos imágenes o condicionalmente menos */}
      {imageCount > 1 && (
        <div className="flex flex-col gap-1">
          <div>
            <img
              className="h-auto full"
              src={images[1].src}
              alt={`Gallery image ${images[1].id}`}
            />
          </div>
          {imageCount > 2 ? (
            <div className="relative">
              <img
                className="h-auto max-w-full"
                src={images[2].src}
                alt={`Gallery image ${images[2].id}`}
              />
              {imageCount > 3 && (
                <div className="absolute my-auto inset-0 flex justify-center items-center bg-black bg-opacity-30">
                  <span className="text-gray text-6xl font-bold">
                    +{imageCount - 3}
                  </span>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
