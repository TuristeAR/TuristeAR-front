import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import logoAnimado from '../../assets/logoAnimado.json';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

type Category = {
  id: number,
  name: string,
};

type Province = {
  id: number,
  name: string,
  categories: Category[]
};

type Place = {
  id: number,
  name: string,
  googleId: string,
  place: Province
};

type Activity = {
  id: number,
  name: string,
  place: Place
  images: string[]
};

type Itinerary = {
  id: number,
  name: string,
  activities: Activity[]
};

export const CreatePublications = () => {

  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    description: '',
    images: null as File | null,
    itineraryId: undefined
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await fetch('https://api-turistear.koyeb.app/user-itineraries', {
          method: 'GET',
          credentials: 'include',
        });

        if (!categoriesResponse.ok) throw new Error('Error al obtener categorías');

        const categoriesData = await categoriesResponse.json();
        setItineraries(categoriesData.data);
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
    setActivities(itineraries.find(itinerary => itinerary.id == Number(name == 'itineraryId' ? value : null)).activities)
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
    setError(null);

    if (!formData.description) {
      setError("Ingrese una descripción!");
      return;
    }

    if (formData.itineraryId === undefined) {
      setError("Seleccione una categoría!");
      return;
    }

    setIsLoading(true);
    try {
      const imageUrl = formData.images ? await uploadImage(formData.images) : "";

      const response = await fetch('https://api-turistear.koyeb.app/createPublication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description : formData.description,
          images: imageUrl,
          itineraryId: formData.itineraryId
        }),
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Error en la solicitud');
      setError('');
      window.location.reload();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const [selectedActivities, setSelectedActivities] = useState([]);

  const handleSelection = (activityId) => {
    setSelectedActivities((prevSelected) =>
      prevSelected.includes(activityId)
        ? prevSelected.filter((id) => id !== activityId)
        : [...prevSelected, activityId]
    );
  };

  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50 border border-gray-50 rounded-lg">
          <h2 className="text-4xl text-center text-primary-4 mx-auto mb-6 md:mb-8">
            Creando publicación...
          </h2>
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
              <div className="bg-white rounded-2xl py-6 px-10 flex flex-col justify-evenly relative max-w-[70%] max-h-[75%]">
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
                  <div className={'flex flex-col gap-4'}>
                    <div className={'flex flex-row gap-x-4 items-end'}>
                      <div className={'flex flex-col gap-x-2'}>
                        <label className="text-lg font-semibold">Itinerario</label>
                        <select
                          className={'border border-[#999999] pl-2 rounded-xl'}
                          name={'itineraryId'}
                          value={formData.itineraryId}
                          onChange={handleChange}
                        >
                          <option value={'0'}>Seleccionar</option>
                          {itineraries?.map((itinerary) => (
                            <option value={itinerary.id} key={itinerary.id}>
                              {itinerary.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <p className={'text-[#999999] text-sm'}>*Solo puede utilizar actividades con imágenes</p>
                    </div>
                    <div className={'flex flex-row gap-x-4 items-center'}>
                      <div className={'flex flex-col w-[40%]'}>
                          <label className="text-lg font-semibold">Descripción</label>
                          <textarea
                            className={
                              'border border-[#999999] pl-2 rounded-xl min-h-48'
                            }
                            placeholder={'Ingrese la descripción'}
                            name={'description'}
                            value={formData.description}
                            onChange={handleChange}
                          ></textarea>
                        </div>
                      <div className="flex flex-col w-[60%]">
                          <label className="text-lg font-semibold">Actividades</label>
                          <div className="rounded-2xl shadow-lg">
                            <Carousel
                              showThumbs={false}
                              showStatus={false}
                              infiniteLoop
                              autoPlay
                              interval={3000}
                              showArrows={true}
                              showIndicators={false}
                              swipeable={true}
                              centerMode={false}
                              selectedItem={0}
                              centerSlidePercentage={50}
                              className="rounded-2xl"
                            >
                              {activities.length > 0 &&
                                activities.filter(activity => activity.images.length > 0).map((activity) => (
                                  <div
                                    key={activity.id}
                                    className={`flex items-center cursor-pointer transition-transform transform ${
                                      selectedActivities.includes(activity.id)
                                        ? 'rounded-2xl bg-[#c0daeb]'
                                        : 'hover:bg-[#d9d9d9] hover:rounded-2xl'
                                    }`}
                                    onClick={() => handleSelection(activity.id)}
                                  >
                                    <Carousel
                                      showThumbs={false}
                                      showStatus={false}
                                      showArrows={false}
                                      showIndicators={false}
                                      infiniteLoop
                                      autoPlay
                                      interval={2000}
                                      className={'w-full rounded-l-2xl'}
                                    >
                                      {activity.images.map((image, imgIndex) => (
                                        <img
                                          key={imgIndex}
                                          src={image}
                                          alt={`Imagen ${imgIndex + 1}`}
                                          className="rounded-l-2xl w-full h-48 object-cover"
                                        />
                                      ))}
                                    </Carousel>

                                    <div
                                      className={`w-full text-center py-2 px-6 rounded-l-2xl`}
                                    >
                                      <h3 className="text-lg font-semibold">{activity.name.slice(0,-10)}</h3>
                                    </div>
                                  </div>
                                ))}
                            </Carousel>
                          </div>
                        </div>
                    </div>
                  </div>
                  <div className={`flex ${error ? 'justify-between' : 'justify-end'} mt-6 gap-4`}>
                    {error && <div className="text-[#999999] text-sm text-center mt-4">{error}</div>}
                    <button type={'submit'} className={'btn-blue'}>
                      Crear publicación
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
