export const uploadImage = async (image: File): Promise<any> => {
  const formData = new FormData();
  formData.append('image', image);

  const url = window.location.href.includes(process.env.VITE_API_URL) ? process.env.VITE_IMGUR_API_URL + '/3/image' : 'http://localhost:3001/uploadImage' ;
  const body : any = window.location.href.includes(process.env.VITE_API_URL) ? {
    method: 'POST',
    headers: {
      Authorization: `Client-ID ${process.env.VITE_IMGUR_CLIENT_ID}`,
    },
    body: formData,
  } :  {
    method: 'POST',
    body: formData,
    credentials: 'include',
  };

  try {
    const response = await fetch(url, body);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error de respuesta:', errorData);
      throw new Error(errorData.data.error || 'Error al cargar la imagen');
    }
    const result = await response.json();
    return window.location.href.includes(process.env.VITE_API_URL) ? result.data.link :  result.link;
  } catch (error) {
    console.error('Error en la carga de la imagen:', error);
    throw error;
  }
};
