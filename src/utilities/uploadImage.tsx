export const uploadImage = async (image: File): Promise<any> => {
  const formData = new FormData();
  formData.append('image', image);

  try {
    const response = await fetch(`${process.env.VITE_API_URL}/uploadImage`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error de respuesta:', errorData);
      throw new Error(errorData.data.error || 'Error al cargar la imagen');
    }
    const result = await response.json();
    return result.link;
  } catch (error) {
    console.error('Error en la carga de la imagen:', error);
    throw error;
  }
};
