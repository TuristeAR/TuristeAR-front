import { is } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { UseFetchSession } from '../../utilities/useFetchSession';
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
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const {
    vista,
    categorySelected,
    setCategorySelected,
    handleClick,
    activeItem,
    isOpen,
    setIsOpen,
  } = props;
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const location = useLocation();
  const showCategories =
    !location.pathname.includes('/forum/') &&
    !location.pathname.includes('/publication/') &&
    !location.pathname.includes('/profile/') &&
    !location.pathname.includes('/notifications');

  useEffect(() => {
    const fetchData = async () => {
      try {
          const categoriesResponse = await fetch(`https://api-turistear.koyeb.app/categories`, {
            method: 'GET',
            credentials: 'include',
          });

          if (!categoriesResponse.ok) {
            console.log('Error al obtener publicaciones:', await categoriesResponse.json());
          } else {
            const categoriesData = await categoriesResponse.json();
            setCategories(categoriesData);
          }
      } catch (error) {

      }
    };

    fetchData();
  }, []);

  // @ts-ignore
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute block md:hidden top-18 -left-2 z-50  p-2"
      >
        {isOpen ? <X size={26} /> : <Menu size={28} />}
      </button>
      <div
        className={`relative md:static z-40 bg-white md:w-[330px] ${
          isOpen || window.innerWidth >= 768 ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div
          className={`flex-col  w-[100%] p-6 gap-6 border-r h-full border-[#999999] min-h-[88.8vh]  transition-transform duration-300 `}
        >
          <div className="flex flex-col gap-4 text-l font-semibold">
            <Link
              to={'/publications'}
              className={`flex flex-row items-center gap-2 hover:bg-[#d9d9d9] rounded-xl py-2 px-4 shadow-md transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-lg ${vista == 'publications' ? 'bg-[#c0daeb]' : ''}`}
            >
              <img src="/assets/home.svg" alt="Publicaciones" className="w-[25px]" />
              <p>Publicaciones</p>
            </Link>
            <Link
              to={'/forums'}
              className={`flex flex-row items-center gap-2  hover:bg-[#d9d9d9] rounded-xl  py-2 px-4 shadow-md transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-lg ${vista == 'forum' ? 'bg-[#c0daeb]' : ''}`}
            >
              <img src="/assets/message.svg" alt="Foro y preguntas" className="w-[25px]" />
              <p>Foro y preguntas</p>
            </Link>
          </div>
          {showCategories && (
            <>
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
                    className="border border-[#999999] rounded p-2 focus:outline-none"
                    placeholder="Buscar"
                    autoComplete="off"
                  />
                </form>
                <div className="overflow-y-scroll h-[230px] md:h-full scrollbar-hidden">
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
                    .sort((a, b) => a.description.localeCompare(b.description))
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
                              <p className="">
                                {category.description === 'Ciudad Autónoma de Buenos Aires'
                                  ? 'CABA'
                                  : category.description}
                              </p>
                            </div>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
