import React from 'react';

interface ImageGalleryProps {
  images: string[];
  height?: number;
  openLightbox?: (index: number) => void;
  indexImg?: number;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  height,
  openLightbox,
  indexImg,
}) => {
  const imageCount = images.length;
  if (!images || images.length === 0) {
    return null;
  }
  const dynamicHeightClass40 = height ? 'h-[200px]' : '';
  const dynamicHeightClass30 = height ? 'h-[200px]' : '';
  const dynamicHeightClass70 = height ? 'h-[400px]' : '';

  return (
    <div
      className={`h-[300px] grid ${dynamicHeightClass70} overflow-hidden ${
        imageCount === 2 ? 'grid-cols-2' : imageCount > 2 ? 'grid-cols-[2fr_1fr]' : 'grid-cols-1'
      } gap-1 mx-auto`}
    >
      {/* Primera columna más ancha */}
      {imageCount > 0 && (
        <div
          className="justify-center items-center h-full overflow-hidden"
          onClick={() => openLightbox(indexImg)}
        >
          <img className="h-full w-full object-cover cursor-pointer " src={images[0]} />
        </div>
      )}

      {/* Segunda columna con dos imágenes o condicionalmente menos */}
      {imageCount > 1 && (
        <div
          className={`flex flex-col gap-1 ${imageCount == 2 ? ' justify-center items-center w-full overflow-hidden h-full' : 'aaa'}`}
        >
          <div
            className={`overflow-hidden w-full ${imageCount == 2 ? ' h-[500px] ' : ''}`}
            onClick={() => openLightbox(indexImg)}
          >
            <img
              className={`w-full cursor-pointer ${imageCount === 2 ? 'object-cover h-full' : `${!(dynamicHeightClass40 == '') ? dynamicHeightClass40 : 'r h-[150px] '}  object-cover river`}`}
              src={images[1]}
            />
          </div>
          {imageCount > 2 && (
            <div className="relative overflow-hidden" onClick={() => openLightbox(indexImg)}>
              <img
                className={`w-full  ${!(dynamicHeightClass40 == '') ? dynamicHeightClass40 : 'r h-[150px] '} object-cover`}
                src={images[2]}
              />
              {imageCount > 3 && (
                <div
                  className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30"
                  onClick={() => openLightbox(indexImg)}
                >
                  <span className="text-[#ffff] text-6xl font-bold">+{imageCount - 3}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
