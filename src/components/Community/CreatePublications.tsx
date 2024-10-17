import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import logoAnimado from '../../assets/logoAnimado.json';

export const CreatePublications = () => {
  type Category = {
    id: number,
    description: string
  };

  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    description: '',
    imagesUploaded: null as File | null,
    categoryId: undefined
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await fetch('https://api-turistear.koyeb.app/categories', {
          method: 'GET',
          credentials: 'include',
        });

        if (!categoriesResponse.ok) throw new Error('Error al obtener categorías');

        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
      } catch (error) {
        setError('Error en la comunicación con el servidor');
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    // @ts-ignore
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData(prevData => ({
        ...prevData,
        images: files ? files[0] : null,
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const uploadImage = async (image: File) => {
    const formData = new FormData();
    formData.append('image', image);

    const url = 'https://api.imgur.com/3/image';
    const options = {
      method: 'POST',
      headers: {
        Authorization: 'Client-ID 523c9b5cf859dce',
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

  const createPublications = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reinicia errores

    if (!formData.description) {
      setError("Ingrese una descripción!");
      return;
    }

    if (formData.categoryId === undefined) {
      setError("Seleccione una categoría!");
      return;
    }

    if (!formData.imagesUploaded) {
      setError("Seleccione una imagen!");
      return;
    }

    setIsLoading(true);
    try {
      const imageUrl = await uploadImage(formData.imagesUploaded);
      const response = await fetch('https://api-turistear.koyeb.app/createPublication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          images: imageUrl
        }),
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Error en la solicitud');
      setError('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50 border border-gray-50 rounded-lg">
          <h2 className="text-4xl text-center text-primary-4 mx-auto mb-6 md:mb-8">Creando publicación...</h2>
          <Lottie className="w-[16rem] md:w-[18rem] mx-auto" animationData={logoAnimado} />
        </div>
      ) : (
        <>
          <div
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 bg-[#49a2ec] rounded-full flex flex-col justify-evenly"
          >
            <img
              src={'/assets/createPublications.svg'}
              className={'w-[70px] m-6'}
              alt={'Crear post'}
            />
          </div>
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 border border-gray-50 rounded-lg">
              <div className="bg-white rounded-2xl p-10 flex flex-col justify-evenly relative">
                <button
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <h2 className="text-2xl text-center font-bold mb-4">Crear publicación</h2>
                <form onSubmit={createPublications}>
                  <div className={'flex flex-col gap-6'}>
                    <div className={'flex flex-col'}>
                      <label className="text-lg font-semibold">Descripción</label>
                      <textarea
                        className={'border border-[#999999] pl-2 rounded-xl min-w-[500px] min-h-[100px]'}
                        placeholder={'Ingrese la descripción'}
                        name={'description'}
                        value={formData.description}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className={'grid grid-cols-2 gap-x-6'}>
                      <div className={'flex flex-col'}>
                        <label className="text-lg font-semibold">Categoría</label>
                        <select
                          className={'border border-[#999999] pl-2 rounded-xl'}
                          name={'categoryId'}
                          value={formData.categoryId}
                          onChange={handleChange}
                        >
                          <option value={'0'}>Seleccionar</option>
                          {categories.map((category) => (
                            <option value={category.id} key={category.id}>
                              {category.description}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className={'flex flex-col'}>
                        <label className="text-lg font-semibold">Imágenes</label>
                        <input
                          name={'images'}
                          onChange={handleChange}
                          type={'file'}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={'flex justify-center mt-8'}>
                    <button type={'submit'} className={'btn-blue'}>
                      Crear publicación
                    </button>
                  </div>
                </form>
                {error && <div className="text-danger text-center mt-4">{error}</div>}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
