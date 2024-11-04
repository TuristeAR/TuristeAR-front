import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
  image: string;
};

export const LeftCommunity = (props: {
  vista: string;
  categorySelected: number | null;
  setCategorySelected: (id: number) => void;
  activeItem: string;
  handleClick: (section: string) => void;
}) => {
  const { vista, categorySelected, setCategorySelected, handleClick, activeItem } = props;
  const [user, setUser] = useState<User | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(true);
  const [error, setError] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionResponse = await fetch('http://localhost:3001/session', {
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
          const categoriesResponse = await fetch(`http://localhost:3001/categories`, {
            method: 'GET',
            credentials: 'include',
          });

          if (!categoriesResponse.ok) {
            console.log('Error al obtener publicaciones:', await categoriesResponse.json());
          } else {
            const categoriesData = await categoriesResponse.json();
            setCategories(categoriesData);
          }
        } catch (err) {
          setError(err);
          console.log('Error al obtener las publicaciones:', err);
        }
      } catch (error) {
        setError('Error en la comunicación con el servidor');
        setIsAuthenticated(false);
      }
    };

    fetchData();
  }, []);

  // @ts-ignore
  return (
    <>
      <div className="flex flex-col lg:w-[20%] w-[100%] lg:block hidden p-6 gap-6 border-r border-[#999999] min-h-[88.8vh]">
        <div className="flex flex-col gap-4 text-l font-semibold">
          <Link to={'/publications'}
            className={`flex flex-row items-center gap-2 hover:bg-[#d9d9d9] rounded-xl py-2 px-4 shadow-md transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-lg ${vista == 'publications' ? 'bg-[#c0daeb]' : ''}`}
          >
            <img src="/assets/home.svg" alt="Publicaciones" className="w-[25px]" />
            <p>Publicaciones</p>
          </Link>
          <Link to={'/forums'}
            className={`flex flex-row items-center gap-2  hover:bg-[#d9d9d9] rounded-xl  py-2 px-4 shadow-md transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-lg ${vista == 'forum' ? 'bg-[#c0daeb]' : ''}`}
          >
            <img src="/assets/message.svg" alt="Foro y preguntas" className="w-[25px]" />
            <p>Foro y preguntas</p>
          </Link>
          <Link to={'/jobs'}
            className={`flex flex-row items-center gap-2 hover:bg-[#d9d9d9] rounded-xl  py-2 px-4 shadow-md transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-lg ${vista == 'jobs' ? 'bg-[#c0daeb]' : ''}`}
          >
            <img src="/assets/personBlue.svg" alt="Ofertas de trabajo" className="w-[25px]" />
            <p>Ofertas de trabajo</p>
          </Link>
        </div>
        <hr className="border border-[#999999] my-4"></hr>
        <div className="flex flex-col gap-y-4">
          <h2 className="text-xl font-bold">Categorías</h2>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              onInput={(e) =>
                setDescription(
                  //@ts-ignore
                  e.target.value,
                )
              }
              className="border border-[#999999] pl-2"
              placeholder="Buscar"
              autoComplete="off"
            />
          </form>
          <div className="overflow-y-scroll h-[230px] scrollbar-hidden">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => {
                    setCategorySelected(null);
                    handleClick(activeItem == 'itineraries' ? 'posts' : activeItem);
                  }}
                  className={`flex gap-2 items-center hover:bg-[#d9d9d9] rounded-xl w-[100%] py-2 px-4 ${null == categorySelected ? 'bg-[#c0daeb]' : ''}`}
                >
                  <div className="flex items-center">
                    <p className="">General</p>
                  </div>
                </button>
              </div>
            </div>
            {categories
              ?.filter((c) => {
                return (
                  description == null ||
                  c.description.toLowerCase().includes(description.toLowerCase())
                );
              })
              .slice(0, 24)
              .map((category, index) => (
                <div className="space-y-4" key={index}>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => {
                        setCategorySelected(category.id);
                        handleClick(activeItem == 'itineraries' ? 'posts' : activeItem);
                      }}
                      className={`flex gap-2 items-center hover:bg-[#d9d9d9] rounded-xl w-[100%] py-2 px-4 ${category.id == categorySelected ? 'bg-[#c0daeb]' : ''}`}
                    >
                      <div className="flex items-center">
                        <p className="">{category.description}</p>
                      </div>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
