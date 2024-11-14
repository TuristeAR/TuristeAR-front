import { useState } from 'react';

const ExpenseFileUpload = ({ onImagesSelect, imageEditUrls, onImageUrls }) => {
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState(imageEditUrls);
  const [filesUpload, setFilesUpload] = useState([]);

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const imageFiles = Array.from(files).map((file) => URL.createObjectURL(file as File));
    setImages((prevImages) => [...prevImages, ...imageFiles]);
    setFilesUpload((prevFiles) => [...prevFiles, ...files]);

    onImagesSelect([...filesUpload, ...files]);
    onImageUrls(imageUrls)
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const imageFiles = Array.from(files).map((file) => URL.createObjectURL(file as File));

    setImages((prevImages) => [...prevImages, ...imageFiles]);
    setFilesUpload((prevFiles) => [...prevFiles, ...files]);

    onImagesSelect([...filesUpload, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setFilesUpload((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };
  const handleRemoveImageUrl = (index) => {
    setImageUrls((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      onImageUrls(updatedImages); 
      return updatedImages;
    });
  };
  return (
    <div className="my-2 border-2 border-primary border-dashed rounded">
      <div
        className="flex items-center flex-col justify-center w-full"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full cursor-pointer bg-slate hover:bg-gray-50"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Hace clic para subir las imágenes</span> o arrastrá y
              solta
            </p>
            <p className="text-xs text-gray-500">SVG, PNG o JPG</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            multiple
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 p-1 mt-4">
        {imageUrls && imageUrls.map((image, index) => (
          <div key={index} className="relative">
            <img src={image} alt={`uploaded-${index}`} className="h-auto max-w-full rounded-lg" />
            <button
              onClick={(e) => {
                e.preventDefault(); 
                handleRemoveImageUrl(index)}}
              className="absolute top-1 right-1 bg-black text-white rounded-full px-2 py-1 text-xs"
            >
              X
            </button>
          </div>
        ))}

        {images.length > 0 &&
          images.map((image, index) => (
            <div key={index} className="relative">
              <img src={image} alt={`uploaded-${index}`} className="h-auto max-w-full rounded-lg" />
              <button
              
              onClick={(e) => {
                e.preventDefault(); 
                handleRemoveImage(index);
              }}
                className="absolute top-1 right-1 bg-black text-white rounded-full px-2 py-1 text-xs"
              >
                X
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ExpenseFileUpload;