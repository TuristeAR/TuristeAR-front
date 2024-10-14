import { CommunityFilters } from './CommunityFilters';
import { useEffect, useState } from 'react';
const infoCategories = [
  {
    title: 'Filtrar por categoría',
    categories: [
      { imgPerson: '/assets/person.svg', user: 'General' },
      { imgPerson: '/assets/person.svg', user: 'Buenos Aires' },
      { imgPerson: '/assets/person.svg', user: 'Salta' },
      { imgPerson: '/assets/person.svg', user: 'Córdoba' },
      { imgPerson: '/assets/person.svg', user: 'Santa Fe' },
      { imgPerson: '/assets/person.svg', user: 'San Luis' },
    ],
    link: 'categories',
  },
];



export const LeftCommunity = (props:{vista : string}) => {
  const {vista}=props;
  type User={
    id: number;
    username: string,
    name: string,
    profilePicture: string,
    description: string,
    birthdate: string,
    coverPicture: string,
    location: string
  }
  type Category={
    id: number,
    description: string,
    image: string,
  }

  const [user, setUser] = useState<User | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const sessionResponse = await fetch('https://api-turistear.koyeb.app/session', {
          method: 'GET',
          credentials: 'include',
        });

        if (!sessionResponse.ok) {
          setIsAuthenticated(false);
          window.location.href = '/login';
          return;
        }

        const sessionData = await sessionResponse.json();
        setUser(sessionData.user);
        setIsAuthenticated(true);
        setError('');

        try {
          const categoriesResponse = await fetch(
            `https://api-turistear.koyeb.app/categories`,
            {
              method: 'GET',
              credentials: 'include',
            }
          );

          if (!categoriesResponse.ok) {
            console.log('Error al obtener publicaciones:', await categoriesResponse.json());
          } else {
            const categoriesData = await categoriesResponse.json();
            setCategories(categoriesData);
          }
        } catch (err) {
          setError(err)
          console.log('Error al obtener las publicaciones:', err);
        }
      } catch (error) {
        setError('Error en la comunicación con el servidor');
        setIsAuthenticated(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col lg:w-[20%] w-[100%] lg:block hidden p-6 gap-6 border-r border-[#999999]">
        <div className="flex flex-col gap-4 text-l font-semibold">
          <div className={`flex flex-row items-center gap-2 hover:bg-[#d9d9d9] rounded-xl py-2 px-4 ${(vista=='publications') ? 'bg-[#c0daeb]' : ''}`}>
            <img src="/assets/home.svg" alt="Publicaciones" className="w-[25px]" />
            <a href="/publications">Publicaciones</a>
          </div>
          <div className={`flex flex-row items-center gap-2 hover:bg-[#d9d9d9] rounded-xl  py-2 px-4 ${(vista=='forum') ? 'bg-[#c0daeb]' : ''}`}>
            <img src="/assets/message.svg" alt="Foro y preguntas" className="w-[25px]" />
            <a href="/forum">Foro y preguntas</a>
          </div>
          <div className={`flex flex-row items-center gap-2 hover:bg-[#d9d9d9] rounded-xl  py-2 px-4 ${(vista=='jobs') ? 'bg-[#c0daeb]' : ''}`}>
            <img src="/assets/personBlue.svg" alt="Ofertas de trabajo" className="w-[25px]" />
            <a href="/jobs">Ofertas de trabajo</a>
          </div>
        </div>
        <hr className="border border-[#999999] my-4"></hr>
        <div className="flex flex-col gap-y-4">
          <h2 className="text-xl font-bold">Categorías</h2>
          <form className="flex flex-col gap-4">
            <input type="text" className="border border-[#999999] pl-2" placeholder="Buscar" />
          </form>
          {categories?.slice(0, 6).map((category, index) => (
            <CommunityFilters
              key={index}
              description={category.description}
              image={category.image}
            />
          ))}
          <div className="border-b border-[#999999] p-2 pr-0 hover:bg-[#d9d9d9] rounded-t-xl">
            <a href={"/"}>Descubrir más</a>
          </div>
        </div>
      </div>
    </>
  );
};
