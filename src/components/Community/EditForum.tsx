import { Edit2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import logoAnimado from '../../assets/logoAnimado.json';

type User = {
  id: number;
  name: string;
  profilePicture: string;
  description: string;
  birthdate: string;
  coverPicture: string;
  location: string;
};

type Category = {
  id: number;
  description: string;
};

type Forum = {
  id: number;
  name: string;
  description: string;
  category: Category | null;
  user: User;
};

export const EditForum = (props: {forum : Forum})=>{
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const forum = props.forum as Forum | null;
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: forum.name,
    description: forum.description,
    categoryId: forum.category.id,
  });

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

  const editForum = async (e : React.FormEvent)=> {
    e.preventDefault();
    setError(null);

    if (!formData.name) {
      setError('Ingrese un nombre!');
      return;
    }

    if (!formData.description) {
      setError('Ingrese una descripción!');
      return;
    }

    if (formData.categoryId === undefined) {
      setError('Seleccione una categoría!');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://api-turistear.koyeb.app/editForum', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          categoryId: formData.categoryId,
          forumId: forum.id
        }),
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Error en la solicitud');
      setError('');
      window.location.reload();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsOpen(false);
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50 border border-gray-50 rounded-lg">
          <h2 className="text-4xl text-center text-primary-4 mx-auto mb-6 md:mb-8">
            Actualizando foro...
          </h2>
          <Lottie className="w-[16rem] md:w-[18rem] mx-auto" animationData={logoAnimado} />
        </div>
      ) : (
        <>
          <button
            onClick={() => setIsOpen(true)}
            id={'crearForum'}
          >
            <Edit2Icon size={20} color="#49A2EC" />
          </button>
          {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 lg:z-50 z-[80] border border-gray-50 rounded-lg">
              <div className="bg-white rounded-2xl lg:p-10 p-4 flex flex-col justify-evenly relative lg:min-w-[50%] min-w-[90%]">
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
                <h2 className="lg:text-2xl text-xl text-center font-bold mb-4">Crear foro</h2>
                <form onSubmit={editForum}>
                  <div className={'flex flex-col gap-6'}>
                    <div className={'grid lg:grid-cols-2 gap-x-6'}>
                      <div className={'flex flex-col'}>
                        <label className="text-lg font-semibold">Nombre</label>
                        <input
                          name={'name'}
                          onChange={handleChange}
                          type={'text'}
                          value={formData.name}
                          className={'border border-[#999999] rounded-xl pl-2'}
                          placeholder={'Ingrese el nombre'}
                          autoComplete="off"
                        />
                      </div>
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
                    </div>

                    <div className={'flex flex-col'}>
                      <label className="text-lg font-semibold">Descripción</label>
                      <textarea
                        className={
                          'border border-[#999999] pl-2 rounded-xl lg:min-w-[500px] min-h-[100px]'
                        }
                        placeholder={'Ingrese la descripción'}
                        name={'description'}
                        value={formData.description}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className={'flex justify-center mt-8'}>
                    <button type={'submit'} className={'btn-blue'}>
                      Actualizar foro
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
}