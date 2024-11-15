export const uploadImage = async (image: File) => {
  const formData = new FormData();
  formData.append('image', image);

  const url = `${process.env.VITE_IMGUR_API_URL}/3/image`;
  const options = {
    method: 'POST',
    headers: {
      Authorization: `Client-ID ${process.env.VITE_IMGUR_CLIENT_ID}`,
    },
    body: formData,
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error de respuesta:', errorData);
      throw new Error(errorData.data.error || 'Error al cargar la imagen');
    }
    const result = await response.json();
    console.log('Imagen subida:', result);
    return result.data.link;
  } catch (error) {
    console.error('Error en la carga de la imagen:', error);
    throw error;
  }
};
