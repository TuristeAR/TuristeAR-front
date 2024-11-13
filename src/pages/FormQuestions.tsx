import React, { useEffect, useRef, useState } from 'react';
import { Header } from '../components/Header/Header';
import { MapaArg } from '../components/Destinations/MapaArg';
import { ProgressBar } from '../components/Questions/ProgressBar';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { es } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { get, getWithoutCredentials, post } from '../utilities/http.util';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Baby,
  Banknote,
  Binoculars,
  Book,
  Gem,
  HandCoins,
  Handshake,
  Heart,
  Mountain,
  PartyPopper,
  PersonStanding,
  TreePine,
  Trophy,
  Utensils,
} from 'lucide-react';
import { DialogWindow } from '../components/Questions/DialogWindow';
import Lottie from 'lottie-react';
import logoAnimado from '../assets/logoAnimado.json';
import EventCarousel from '../components/FormQuestions/EventCarousel';
import formatFromDateAndToDate from '../utilities/formatEventDate';
import { EventCard } from '../components/FormQuestions/EventCard';
import { getJsonUrl } from '../utilities/getJsonUrl';

interface FormData {
  provinces: Province[];
  localities: Locality[];
  events: number[];
  fromDate: string;
  toDate: string;
  priceLevel: string[];
  types: string[];
  company: number | null;
}

interface Province {
  id: number;
  name: string;
  georefId: string;
}

export interface Locality {
  name: string;
  province: Province;
}

const questions = [
  {
    question: 'Destino',
    type: 'map',
  },
  {
    question: 'Fecha del viaje y Duración del viaje',
    type: 'calendar',
  },
  {
    question: '¿Qué nivel de comodidad se ajusta a tu presupuesto?',
    options: [
      {
        src: <HandCoins width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
        alt: 'Económico',
        data: ['PRICE_LEVEL_FREE', 'PRICE_LEVEL_INEXPENSIVE'],
      },
      {
        src: <Banknote width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
        alt: 'Moderado',
        data: ['PRICE_LEVEL_MODERATE'],
      },
      {
        src: <Gem width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
        alt: 'Lujoso',
        data: ['PRICE_LEVEL_EXPENSIVE', 'PRICE_LEVEL_VERY_EXPENSIVE'],
      },
    ],
    type: 'icon',
    name: 'priceLevel',
    multipleSelection: false,
  },
  {
    question: '¿Qué tipo de actividades te gusta hacer?',
    options: [
      {
        src: <Binoculars width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
        alt: 'Atracción turística',
        data: 'tourist_attraction,landmark,scenic_viewpoint,natural_feature,historical_landmark',
      },
      {
        src: <Utensils width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
        alt: 'Comida',
        data: 'restaurant,cafe,coffee_shop,bakery,food,food_court',
      },
      {
        src: <Book width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
        alt: 'Cultura',
        data: 'library,museum,political,art_gallery,cultural_center,theater,city_hall,church,place_of_worship,embassy',
      },
      {
        src: <Trophy width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
        alt: 'Deporte',
        data: 'sports_complex,stadium,climbing_area,skate_park,ice_skating_rink,ski_resort,surf_spot',
      },
      {
        src: <PartyPopper width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
        alt: 'Fiesta',
        data: 'bar,night_club,music_venue,dance_club,cocktail_bar,event_venue,beer_hall,pub,karaoke',
      },
      {
        src: <Mountain width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
        alt: 'Montaña',
        data: 'hiking_area,mountain,campground,scenic_point,trailhead,national_forest,wilderness_area,climbing_area',
      },
      {
        src: <TreePine width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
        alt: 'Naturaleza',
        data: 'campground,national_park,park,lake,beach,forest,waterfall,botanical_garden,nature_reserve,wildlife_reserve',
      },
    ],
    type: 'icon',
    name: 'activities',
    multipleSelection: true,
  },
  {
    question: '¿Con quién vas a emprender tu nueva aventura?',
    options: [
      {
        src: <PersonStanding width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
        alt: 'Sólo',
        data: 1,
      },
      {
        src: <Heart width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
        alt: 'En pareja',
        data: 2,
      },
      {
        src: <Handshake width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
        alt: 'Amigos',
        data: 3,
      },
      {
        src: <Baby width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
        alt: 'Familia',
        data: 4,
      },
    ],
    type: 'icon',
    name: 'company',
    multipleSelection: false,
  },
];

const FormQuestions = () => {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [pendingItinerary, setPendingItinerary] = useState(false);
  const [resumedItinerary, setResumedItinerary] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [dialogWindowOpen, setDialogWindowOpen] = useState(false);
  const [selectedProvinces, setSelectedProvinces] = useState<Province[]>([]);
  const [localities, setLocalities] = useState<any[]>([]);
  const [selectedLocalities, setSelectedLocalities] = useState<Locality[]>([]);
  const [searchLocality, setSearchLocality] = useState('');
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    provinces: [],
    localities: [],
    events: [],
    fromDate: '',
    toDate: '',
    priceLevel: [],
    types: [],
    company: null,
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingLocalities, setLoadingLocalities] = useState(false);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<number[]>([]);

  const handleCloseDialogWindow = () => {
    setDialogWindowOpen(false);
  };

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const handleLocalitySelection = (locality: Locality) => {
    setSelectedLocalities((prev) => {
      const updatedLocalities = prev.some((loc) => loc.name === locality.name)
        ? prev.filter((loc) => loc.name !== locality.name)
        : [...prev, locality];

      setFormData((prevFormData) => ({
        ...prevFormData,
        localities: updatedLocalities,
      }));

      return updatedLocalities;
    });
  };

  const handleDateSelect = (rangesByKey: any) => {
    const selection = rangesByKey.selection;
    const { startDate, endDate } = selection;

    setState([
      {
        startDate: startDate || new Date(),
        endDate: endDate || new Date(),
        key: 'selection',
      },
    ]);

    setFormData((prev) => ({
      ...prev,
      fromDate: startDate?.toISOString() || '',
      toDate: endDate?.toISOString() || '',
    }));
  };

  const handleProvinceClick = (id: number) => {
    setLoadingLocalities(true);
    setLoadingEvents(true);

    const province = provinces.find((p) => p.id === id);

    setSelectedProvinces((prev) => {
      const isSelected = prev.some((prov) => prov.id === id);
      const updatedProvinces = isSelected
        ? prev.filter((prov) => prov.id !== id)
        : [...prev, province];

      setFormData((prevFormData) => ({
        ...prevFormData,
        provinces: updatedProvinces,
      }));

      return updatedProvinces;
    });

    const url = getJsonUrl(province.id);

    getWithoutCredentials(url, {
      'Content-Type': 'application/json',
    }).then((r) => {
      setLocalities((prevLocalities) => {
        const newLocalities = r
          .filter((locality) => !prevLocalities.some((loc) => loc.name === locality.nombre))
          .map((locality) => ({
            name: locality.nombre,
            province: locality.provincia,
          }));

        return [...prevLocalities, ...newLocalities];
      });

      fetchEvents(province.id).then((events) => {
        setEvents((prevEvents) => {
          const newEvents = events.data.filter(
            (event) => !prevEvents.some((ev) => ev.id === event.id),
          );
          return [...prevEvents, ...newEvents];
        });
        setLoadingLocalities(false);
        setLoadingEvents(false);
      });
    });
  };

  const fetchEvents = async (provinceId: number) => {
    return await get(`https://api-turistear.koyeb.app/events/${provinceId}`, {
      'Content-Type': 'application/json',
    });
  };

  const handleEventSelect = (id: number, locality: Locality) => {
    setSelectedEvents((prevSelectedEvents) => {
      const isSelected = prevSelectedEvents.includes(id);

      const updatedSelectedEvents = isSelected
        ? prevSelectedEvents.filter((eventId) => eventId !== id)
        : [...prevSelectedEvents, id];

      setFormData((prevFormData) => ({
        ...prevFormData,
        events: updatedSelectedEvents,
      }));

      handleLocalitySelection(locality);

      return updatedSelectedEvents;
    });
  };

  const handleSingleSelection = (name: keyof FormData, value: number) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultipleSelection = (option: string) => {
    setFormData((prev) => {
      const alreadySelected = prev.types.includes(option);
      let updatedActivities: any[];

      if (alreadySelected) {
        updatedActivities = prev.types.filter((activity) => activity !== option);
      } else {
        updatedActivities = [...prev.types, option];
      }

      return { ...prev, types: updatedActivities };
    });
  };

  const handleNextQuestion = async () => {
    switch (currentQuestion) {
      case 0:
        if (selectedProvinces.length === 0 && formData.provinces.length === 0) {
          setErrorMessage('Tenés que seleccionar al menos una provincia para visitar');
          return;
        }

        if (selectedLocalities.length === 0 && formData.localities.length === 0) {
          setErrorMessage('Tenés que seleccionar al menos un lugar para visitar');
          return;
        }

        setErrorMessage('');

        break;
      case 1:
        const fromDate = new Date(formData.fromDate);

        const toDate = new Date(formData.toDate);

        if (!formData.fromDate && !formData.toDate) {
          setErrorMessage('Tenés que seleccionar una fecha de inicio y de fin para tu viaje');
          return;
        }

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        if (fromDate < today || toDate < today) {
          setErrorMessage('Las fechas no pueden ser anteriores a hoy');
          return;
        }

        const selectedEventsDetails = events.filter((event) => formData.events.includes(event.id));

        const isDateWithinEventRange = selectedEventsDetails.every((event) => {
          const eventFromDate = new Date(event.fromDate);

          const eventToDate = new Date(event.toDate);

          return fromDate <= eventFromDate && toDate >= eventToDate;
        });

        if (!isDateWithinEventRange) {
          setErrorMessage(
            'Las fechas del viaje deben estar dentro del rango de fechas de los eventos seleccionados',
          );
          return;
        }

        setErrorMessage('');

        break;
      case 2:
        if (formData.priceLevel.length === 0) {
          setErrorMessage('Tenés que seleccionar una opción');
          return;
        }

        setErrorMessage('');

        break;
      case 3:
        if (formData.types.length === 0) {
          setErrorMessage('Tenés que seleccionar al menos una opción');
          return;
        }

        setErrorMessage('');

        break;
      case 4:
        if (!formData.company) {
          setErrorMessage('Tenés que seleccionar una opción');
          return;
        }

        setErrorMessage('');

        break;
      default:
        break;
    }

    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      if (!isUserLoggedIn) {
        saveFormDataToLocalStorage(formData);
        setDialogWindowOpen(true);
      } else {
        await submitFormData();
      }
    }
  };

  const submitFormData = async () => {
    setLoading(true);

    formData.fromDate = state[0].startDate.toISOString();

    formData.toDate = state[0].endDate.toISOString();

    formData.localities = selectedLocalities.sort(
      (a, b) => Number(a.province.id) - Number(b.province.id),
    );

    try {
      const response = await post(
        'https://api-turistear.koyeb.app/formQuestion',
        {
          'Content-Type': 'application/json',
        },
        formData,
      );

      if (response.statusCode === 201) {
        const itineraryId = response.itineraryId;
        navigate(`/itineraryCalendar/${itineraryId}`);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveFormDataToLocalStorage = (data: FormData) => {
    localStorage.setItem('formData', JSON.stringify(data));
    localStorage.setItem('selectedProvinces', JSON.stringify(selectedProvinces));
  };

  const getFormDataFromLocalStorage = (): FormData | null => {
    const data = localStorage.getItem('formData');
    return data ? JSON.parse(data) : null;
  };

  const getSelectedProvincesFromLocalStorage = (): Province[] | null => {
    const data = localStorage.getItem('selectedProvinces');
    return data ? JSON.parse(data) : null;
  };

  const renderPriceLevel = () => {
    const priceLevelMap = {
      PRICE_LEVEL_FREE: 0,
      PRICE_LEVEL_INEXPENSIVE: 0,
      PRICE_LEVEL_MODERATE: 1,
      PRICE_LEVEL_EXPENSIVE: 2,
      PRICE_LEVEL_VERY_EXPENSIVE: 2,
    };

    const index = priceLevelMap[formData.priceLevel[0]];
    const option = questions[2].options[index];

    return (
      <div className="w-40 h-40 flex flex-col items-center justify-center gap-y-2 mx-2 border border-gray">
        {option.src}
        {option.alt}
      </div>
    );
  };

  useEffect(() => {
    const savedFormData = getFormDataFromLocalStorage();

    if (savedFormData) {
      const savedProvinces = getSelectedProvincesFromLocalStorage();
      setFormData(savedFormData);
      setSelectedProvinces(savedProvinces);
      setPendingItinerary(true);
      localStorage.removeItem('formData');
      localStorage.removeItem('selectedProvince');
    }

    const fetchProvinces = async () => {
      try {
        const response = await get('https://api-turistear.koyeb.app/province', {
          'Content-Type': 'application/json',
        });

        setProvinces(response.data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();

    const fetchSession = async () => {
      const response = await get('https://api-turistear.koyeb.app/session', {
        'Content-Type': 'application/json',
      });

      if (response.statusCode === 200) {
        setIsUserLoggedIn(true);
      }
    };

    fetchSession();
  }, []);

  const [carouselEvents, setCarouselEvents] = useState<any[]>([]);

  useEffect(() => {
    if (selectedProvinces.length > 0) {
      fetchEvents(selectedProvinces[0].id).then((data) => {
        setCarouselEvents(data.data);
      });
    }
  }, [selectedProvinces]);

  const swiperRef = useRef(null);

  return (
    <>
      <Header />
      <DialogWindow isOpen={dialogWindowOpen} onClose={handleCloseDialogWindow} />
      {loading ? (
        <div className="w-[90%] md:w-full mx-auto min-h-[90vh] flex flex-col items-center justify-center">
          <div className="h-full flex flex-col md:flex-row justify-center items-center gap-x-4 my-4">
            <h2 className="text-4xl text-center text-primary-4 mx-auto mb-6 md:mb-0">
              Estamos armando el viaje ideal para vos...
            </h2>
            <Lottie className="w-[6rem] md:w-[4rem] mx-auto" animationData={logoAnimado} />
          </div>

          <Swiper
            ref={swiperRef}
            className="w-full max-w-[90%] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[650px] xl:max-w-[850px]"
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            slidesPerView={1}
            slidesPerGroup={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
          >
            {carouselEvents.map((event) => (
              <SwiperSlide key={event.id}>
                <EventCard
                  fromDate={event.fromDate}
                  toDate={event.toDate}
                  name={event.name}
                  locality={localities.find((loc) => loc.name === event.locality)}
                  description={event.description}
                  image={event.image}
                  id={event.id}
                  isSelected={selectedEvents.includes(event.id)}
                  onSelect={handleEventSelect}
                  isLoading={true}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <section
          className={`min-h-[90vh] flex items-center justify-center ${dialogWindowOpen ? 'opacity-10' : 'bg-gray-100'} text-black`}
        >
          <div className="container mx-auto flex flex-col md:flex-row justify-center z-30 relative">
            {pendingItinerary ? (
              <div className="mx-auto">
                {resumedItinerary ? (
                  <>
                    <h2 className="mb-4 md:mb-16 text-center text-2xl sm:text-5xl font-semibold text-primary-4">
                      Resumen de tu viaje
                    </h2>
                    <div className="flex flex-col">
                      {selectedProvinces && (
                        <span className="text-center text-xl my-1">
                          Provincias:{' '}
                          <strong>
                            {selectedProvinces.map((province, index) => (
                              <strong key={province.id}>
                                {province.name}
                                {index < selectedProvinces.length - 2
                                  ? ', '
                                  : index === selectedProvinces.length - 2
                                    ? ' y '
                                    : ''}
                              </strong>
                            ))}
                          </strong>
                        </span>
                      )}
                      <span className="text-center text-xl my-1">
                        Lugares a visitar:{' '}
                        {formData.localities.map((locality, index) => (
                          <strong key={locality.name}>
                            {locality.name}
                            {index < formData.localities.length - 1 && ', '}
                          </strong>
                        ))}
                      </span>
                      <span className="text-center text-xl my-1">
                        Fecha de inicio:{' '}
                        <strong>{new Date(formData.fromDate).toLocaleDateString('es-ES')}</strong>
                      </span>
                      <span className="text-center text-xl my-1">
                        Fecha de finalización:{' '}
                        <strong>{new Date(formData.toDate).toLocaleDateString('es-ES')}</strong>
                      </span>
                      <span className="text-center text-xl my-1">
                        Duración:{' '}
                        <strong>
                          {Math.ceil(
                            (new Date(formData.toDate).getTime() -
                              new Date(formData.fromDate).getTime()) /
                              (1000 * 60 * 60 * 24),
                          )}{' '}
                          días
                        </strong>
                      </span>
                      <div className="flex flex-wrap justify-center gap-5 my-2">
                        {renderPriceLevel()}
                        {formData.types.map((type) => {
                          const option = questions[3].options.find(
                            (option) => option.data.toString() === type,
                          );
                          return (
                            <div
                              key={type}
                              className="w-40 h-40 flex flex-col items-center justify-center gap-y-2 mx-2 border border-gray"
                            >
                              {option?.src}
                              {option?.alt}
                            </div>
                          );
                        })}
                        <div
                          key="company"
                          className="w-40 h-40 flex flex-col items-center justify-center gap-y-2 mx-2 p-2 border border-gray"
                        >
                          {
                            questions[4].options.find((option) => option.data === formData.company)
                              ?.src
                          }
                          {
                            questions[4].options.find((option) => option.data === formData.company)
                              ?.alt
                          }
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex justify-center my-2">
                      <button type="button" className="btn-question" onClick={submitFormData}>
                        Finalizar
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="mb-4 md:mb-16 text-center text-2xl sm:text-5xl font-semibold text-primary-4">
                      ¡Tenés un viaje pendiente!
                    </h2>
                    <p className="my-4 text-xl text-center sm:text-2xl">
                      Parece que tenés un viaje por realizar... ¿Querés continuar con el viaje
                      anterior o comenzar uno nuevo?
                    </p>
                    <div className="flex flex-col items-center justify-center md:flex-row gap-x-4 mt-4 md:mt-16">
                      <button
                        type="button"
                        className="btn-question mb-3 md:mb-0 w-72 md:w-96 text-sm md:text-md"
                        onClick={() => setPendingItinerary(false)}
                      >
                        Comenzar un nuevo viaje
                      </button>
                      <button
                        type="button"
                        className="btn-question mt-3 md:mt-0 w-72 md:w-96 text-sm md:text-md"
                        onClick={() => setResumedItinerary(true)}
                      >
                        Continuar con el viaje anterior
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <form className="flex flex-col w-full max-w-full items-center justify-center bg-white p-4 gap-y-6 md:gap-y-4 min-h-[500px]">
                <ProgressBar currentStep={currentStep} />
                {questions[currentQuestion].type === 'map' ? (
                  <div className="flex flex-col gap-y-4 justify-center items-center w-full">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-primary-4 mb-6 lg:w-[900px] lg:text-center">
                      Armemos tu próxima aventura a
                      {selectedProvinces.length > 0
                        ? selectedProvinces.map((province, index) => (
                            <span key={province.id} className="text-primary-2">
                              {' '}
                              {province.name}
                              {index < selectedProvinces.length - 2
                                ? ', '
                                : index === selectedProvinces.length - 2
                                  ? ' y '
                                  : ''}
                            </span>
                          ))
                        : '...'}
                    </h2>
                    <div className="w-full flex flex-col md:flex-row justify-start">
                      <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:justify-end md:items-end">
                        <MapaArg onProvinceClick={handleProvinceClick} multipleSelection={true} />
                      </div>
                      <div className="w-full md:w-1/2 flex flex-col items-center gap-x-4">
                        {localities.length > 0 ? (
                          <div className="w-96 md:w-[420px]">
                            <span className="block text-lg font-medium leading-6 text-gray-900 my-2">
                              ¿Qué lugares querés visitar?
                            </span>
                            <div className="flex flex-col items-start">
                              <input
                                type="text"
                                placeholder="Buscar localidad..."
                                className="w-72 h-10 border border-gray-300 rounded-md px-2 mb-2"
                                value={searchLocality}
                                onChange={(e) => setSearchLocality(e.target.value)}
                                autoComplete="off"
                              />
                              {searchLocality && (
                                <div className="z-20 w-72">
                                  {localities.length > 0 && (
                                    <ul className="bg-slate-50 overflow-y-auto w-72 max-h-[200px] mb-4">
                                      {[
                                        ...new Map(
                                          localities.map((item) => [item.name, item]),
                                        ).values(),
                                      ]
                                        .filter((locality) =>
                                          locality.name
                                            .toLowerCase()
                                            .includes(searchLocality.toLowerCase()),
                                        )
                                        .map((locality) => (
                                          <li
                                            key={locality.name}
                                            onClick={() => {
                                              handleLocalitySelection(locality);
                                              setSearchLocality('');
                                            }}
                                            className="mx-1 p-1 cursor-pointer hover:bg-orange hover:text-white"
                                          >
                                            {locality.name}
                                          </li>
                                        ))}
                                    </ul>
                                  )}
                                </div>
                              )}
                              <select
                                className="w-72 h-10 border border-gray rounded-md px-2"
                                onChange={(e) => {
                                  const selectedLocality = localities.find(
                                    (locality) => locality.name === e.target.value,
                                  );
                                  if (selectedLocality) {
                                    handleLocalitySelection(selectedLocality);
                                  }
                                  e.target.value = '';
                                }}
                              >
                                <option value="">Seleccioná una localidad</option>
                                {localities.map((locality, index) => (
                                  <option key={index} value={locality.name}>
                                    {locality.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="flex flex-wrap my-4 gap-2">
                              {selectedLocalities.map((locality) => (
                                <div
                                  key={locality.name}
                                  className="w-fit px-3 py-1 bg-primary-2 text-white rounded flex items-center justify-between"
                                >
                                  {locality.name}
                                  <button
                                    type="button"
                                    className="ml-2 text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center"
                                    onClick={() => handleLocalitySelection(locality)}
                                  >
                                    x
                                  </button>
                                </div>
                              ))}
                            </div>
                            <hr className="text-primary-2 w-full my-6" />
                            <div className="w-full">
                              <span className="italic text-lg text-gray-500">
                                Te recomendamos los siguientes eventos de la provincia que vas a
                                visitar
                              </span>
                              {loadingEvents ? (
                                <Lottie animationData={logoAnimado} />
                              ) : (
                                events.length > 0 && (
                                  <div className="flex items-center mt-4">
                                    <EventCarousel
                                      localities={localities}
                                      events={events}
                                      selectedEvents={selectedEvents}
                                      onEventSelect={handleEventSelect}
                                    />
                                  </div>
                                )
                              )}
                            </div>
                            <button
                              type="button"
                              className="btn-question w-full my-4"
                              onClick={handleNextQuestion}
                            >
                              Continuar
                            </button>
                          </div>
                        ) : (
                          <div className="w-72">
                            {loadingLocalities ? (
                              <Lottie animationData={logoAnimado} />
                            ) : (
                              <span className="text-lg font-medium leading-6 text-gray-900 my-2">
                                Seleccioná una provincia para ver las localidades
                              </span>
                            )}
                          </div>
                        )}
                        {errorMessage && (
                          <div className="error-message" role="alert">
                            {errorMessage}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : questions[currentQuestion].type === 'calendar' ? (
                  <div className="flex flex-col gap-y-4 justify-center items-center w-full">
                    <h2 className="w-full md:w-[700px] text-center text-2xl sm:text-3xl font-semibold text-primary-4 mb-6">
                      Definí la fecha para tu viaje a{' '}
                      {selectedProvinces.map((province, index) => (
                        <span key={province.id} className="text-primary-2">
                          {province.name}
                          {index < selectedProvinces.length - 2
                            ? ', '
                            : index === selectedProvinces.length - 2
                              ? ' y '
                              : ''}
                        </span>
                      ))}
                    </h2>
                    <div className="w-full max-w-[800px] flex flex-col md:flex-row md:justify-between">
                      <div className="flex flex-col items-start w-full md:w-2/5">
                        <h3 className="text-primary-4 font-bold text-xl text-center">
                          Elegiste estos eventos:
                        </h3>
                        <div className="flex flex-col my-2">
                          {events
                            .filter((event) => selectedEvents.includes(event.id))
                            .map((event, index) => (
                              <div key={index}>
                                <div className="my-2 w-fit px-3 py-1 bg-primary-2 text-white rounded relative">
                                  <span className="mr-6">{event.name}</span>
                                  <button
                                    type="button"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 font-bold"
                                    onClick={() => handleEventSelect(event.id, event.locality)}
                                  >
                                    X
                                  </button>
                                </div>
                                <span className="text-md italic px-1">
                                  {formatFromDateAndToDate(event.fromDate, event.toDate)}
                                </span>
                              </div>
                            ))}
                        </div>
                        <hr className="text-primary-2 w-full my-4" />
                        <span className="my-2">
                          ℹ️ Tené en cuenta que la fecha de inicio y fin del viaje tiene que
                          ajustarse a la duración de los eventos seleccionados.
                        </span>
                      </div>
                      <div className="w-full md:w-1/2 text-center">
                        <DateRangePicker
                          editableDateInputs={true}
                          onChange={handleDateSelect}
                          moveRangeOnFirstSelection={false}
                          ranges={state}
                          locale={es}
                          retainEndDateOnFirstSelection={false}
                          staticRanges={[]}
                          inputRanges={[]}
                        />
                        <div>
                          <span>
                            {state[0].endDate && state[0].startDate && (
                              <p className="text-xl mb-4">
                                Tu viaje va a durar
                                <strong>
                                  {' '}
                                  {state[0].endDate && state[0].startDate
                                    ? Math.ceil(
                                        (state[0].endDate.getTime() -
                                          state[0].startDate.getTime()) /
                                          (1000 * 60 * 60 * 24) +
                                          1,
                                      )
                                    : 0}{' '}
                                  días
                                </strong>
                              </p>
                            )}
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-x-4">
                          <button
                            type="button"
                            className="btn-question w-48 text-[14px]"
                            onClick={handleNextQuestion}
                          >
                            Continuar
                          </button>
                          {errorMessage && (
                            <div className="error-message" role="alert">
                              {errorMessage}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : questions[currentQuestion].type === 'icon' ? (
                  <div className="flex flex-col items-center gap-4">
                    <h3 className="text-primary-4 font-bold text-xl text-center">
                      {questions[currentQuestion].question}
                    </h3>
                    <div className="flex flex-wrap justify-center gap-5">
                      {questions[currentQuestion].options?.map((option: any, index: number) => (
                        <div key={index}>
                          <div
                            className={`w-40 h-40 flex flex-col justify-center gap-y-2 p-4 border border-gray cursor-pointer hover:bg-primary hover:bg-opacity-50 transition duration-300 ${
                              questions[currentQuestion].multipleSelection
                                ? formData.types.includes(option.data as string)
                                  ? 'bg-primary bg-opacity-80'
                                  : ''
                                : formData[questions[currentQuestion].name as keyof FormData] ===
                                    option.data
                                  ? 'bg-primary bg-opacity-80'
                                  : ''
                            }`}
                            onClick={() =>
                              questions[currentQuestion].multipleSelection
                                ? handleMultipleSelection(option.data as string)
                                : handleSingleSelection(
                                    questions[currentQuestion].name as keyof FormData,
                                    option.data as number,
                                  )
                            }
                          >
                            <input
                              type={
                                questions[currentQuestion].multipleSelection ? 'checkbox' : 'radio'
                              }
                              id={`option-${index}`}
                              checked={
                                questions[currentQuestion].multipleSelection
                                  ? formData.types.includes(option.data as string)
                                  : formData[questions[currentQuestion].name as keyof FormData] ===
                                    option.data
                              }
                              onChange={() =>
                                questions[currentQuestion].multipleSelection
                                  ? handleMultipleSelection(option.data as string)
                                  : handleSingleSelection(
                                      questions[currentQuestion].name as keyof FormData,
                                      option.data as number,
                                    )
                              }
                              className="hidden"
                            />
                            <div className="mx-auto">{option.src}</div>
                          </div>
                          <div className="w-40 p-2 border border-gray text-center">
                            {option.alt}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col items-center gap-x-4">
                      <button type="button" className="btn-question" onClick={handleNextQuestion}>
                        {currentQuestion < questions.length - 1
                          ? 'Siguiente pregunta'
                          : 'Finalizar'}
                      </button>
                      {errorMessage && (
                        <div className="error-message" role="alert">
                          {errorMessage}
                        </div>
                      )}
                    </div>
                  </div>
                ) : null}
              </form>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default FormQuestions;
