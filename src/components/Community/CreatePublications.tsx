import { useEffect, useState } from 'react';

export const CreatePublications = ()   => {
  type Category={
    id : number,
    description: string
  }
  const [categories , setCategories] = useState<Category[] | null>([]);

  const [isOpen, setIsOpen] = useState<boolean | null>(false);

  const [formData, setFormData] = useState({
    description: '',
    images:[],
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

        if (!categoriesResponse.ok) {
          return;
        }

        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
        setError('');

      } catch (error) {
        setError('Error en la comunicación con el servidor');
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createPublications = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.description === ''){
      setError("Ingrese una descripción!");
    }

    if(formData.categoryId==undefined){
      setError("Seleccione una categoría!");
    }

    try {
      const response = await fetch(`https://api-turistear.koyeb.app/createPublication`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
      setError('')
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <div onClick={()=>{setIsOpen(true)}} className="fixed bottom-4 right-4 bg-[#49a2ec] rounded-full flex flex-col justify-evenly">
        <img src={'/assets/createPublications.svg'} className={'w-[70px] m-6'} alt={'Crear post'} />
      </div>
      <div
        className={
          'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ' +
          `z-50 border border-gray-50 rounded-lg ${!isOpen ? 'hidden' : 'block'}`
        }
      >
        <div className="bg-white rounded-2xl p-10  flex flex-col justify-evenly relative">
          <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900" onClick={()=>{setIsOpen(false)}}>
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
                  <select className={'border border-[#999999] pl-2 rounded-xl'}
                          name={'categoryId'}
                          value={formData.categoryId}
                          onChange={handleChange}>
                    <option value={'0'}>Seleccionar</option>
                    {categories.map(category => (
                      <option value={category.id} key={category.id}>{category.description}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className={'flex justify-center mt-8'}>
              <button type={'submit'} className={'btn-blue'}>Crear publicación
              </button>
            </div>
          </form>
          {error && <div className="text-danger text-center mt-4">{error}</div>}
        </div>
      </div>
    </>
  );
};