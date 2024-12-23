import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header/Header';
import { MapaArg } from '../components/Destinations/MapaArg';
import { ProgressBar } from '../components/Questions/ProgressBar';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { es } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { get, getWithoutCredentials, post } from '../utilities/http.util';

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
import { getJsonUrl } from '../utilities/getJsonUrl';
import Loading from '../components/FormQuestions/Loading';
import ProvisionalItinerary from '../components/FormQuestions/ProvisionalItinerary';
import { useLocalities } from '../utilities/useLocalities';

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

const FormQuestions = () => {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [pendingItinerary, setPendingItinerary] = useState(false);
  const [resumedItinerary, setResumedItinerary] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [dialogWindowOpen, setDialogWindowOpen] = useState(false);
  const [selectedProvinces, setSelectedProvinces] = useState<Province[]>([]);
  const [localities, setLocalities] = useState<any[]>([]);

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
  const [types, setTypes] = useState<any[]>([]);
  const [priceLevels, setPriceLevels] = useState<any[]>([]);

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

  const {
    searchLocality,
    setSearchLocality,
    selectedLocalities,
    handleLocalitySelection,
  } = useLocalities(setFormData, formData);

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
    return await get(`${process.env.VITE_API_URL}/events/${provinceId}`, {
      'Content-Type': 'application/json',
    });
  };

  const fetchTypes = async () => {
    try {
      const response = await get(`${process.env.VITE_API_URL}/type`, {
        'Content-Type': 'application/json',
      });

      setTypes(
        response.data.map((type: any) => ({
          description: type.description,
          data: type.data.join(','),
        })),
      );
    } catch (error) {
      console.error('Error fetching types:', error);
    }
  };

  const fetchPriceLevels = async () => {
    try {
      const response = await get(`${process.env.VITE_API_URL}/price-level`, {
        'Content-Type': 'application/json',
      });

      setPriceLevels(
        response.data.map((priceLevel: any) => ({
          description: priceLevel.description,
          data: priceLevel.data,
        })),
      );
    } catch (error) {
      console.error('Error fetching price levels:', error);
    }
  };

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
          alt: priceLevels[0]?.description,
          data: priceLevels[0]?.data,
        },
        {
          src: <Banknote width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
          alt: priceLevels[1]?.description,
          data: priceLevels[1]?.data,
        },
        {
          src: <Gem width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
          alt: priceLevels[2]?.description,
          data: priceLevels[2]?.data,
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
          alt: types[0]?.description,
          data: types[0]?.data,
        },
        {
          src: <Utensils width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
          alt: types[1]?.description,
          data: types[1]?.data,
        },
        {
          src: <Book width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
          alt: types[2]?.description,
          data: types[2]?.data,
        },
        {
          src: <Trophy width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
          alt: types[3]?.description,
          data: types[3]?.data,
        },
        {
          src: <PartyPopper width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
          alt: types[4]?.description,
          data: types[4]?.data,
        },
        {
          src: <Mountain width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
          alt: types[5]?.description,
          data: types[5]?.data,
        },
        {
          src: <TreePine width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
          alt: types[6]?.description,
          data: types[6]?.data,
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

  const handleEventSelect = (id: number, locality: Locality) => {
  setSelectedEvents((prevSelectedEvents) => {
    const isSelected = prevSelectedEvents.includes(id);

    const updatedSelectedEvents = isSelected
      ? prevSelectedEvents.filter((eventId) => eventId !== id)
      : [...prevSelectedEvents, id];

    handleLocalitySelection(locality);

    setFormData((prevFormData) => ({
      ...prevFormData,
      events: updatedSelectedEvents,
    }));

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
        `${process.env.VITE_API_URL}/formQuestion`,
        {
          'Content-Type': 'application/json',
        },
        formData,
      );

      if (response.statusCode === 201) {
        const itineraryId = response.itineraryId;
        navigate(`/itinerario/calendario/${itineraryId}`);
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
        const response = await get(`${process.env.VITE_API_URL}/province`, {
          'Content-Type': 'application/json',
        });

        setProvinces(response.data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();

    fetchTypes();

    fetchPriceLevels();

    const fetchSession = async () => {
      const response = await get(`${process.env.VITE_API_URL}/session`, {
        'Content-Type': 'application/json',
      });

      if (response.statusCode === 200) {
        setIsUserLoggedIn(true);
      }
    };

    fetchSession();
  }, []);

  return (
    <>
      <Header />
      <DialogWindow isOpen={dialogWindowOpen} onClose={handleCloseDialogWindow} />
      {loading ? (
        <Loading
          fetchEvents={fetchEvents}
          selectedProvinces={selectedProvinces}
          localities={localities}
          selectedEvents={selectedEvents}
          handleEventSelect={handleEventSelect}
        />
      ) : (
        <section
          className={`min-h-[90vh] flex items-center justify-center ${dialogWindowOpen ? 'opacity-10' : 'bg-gray-100'} text-black`}
        >
          <div className="container mx-auto flex flex-col md:flex-row justify-center z-30 relative">
            {pendingItinerary ? (
              <ProvisionalItinerary
                formData={formData}
                resumedItinerary={resumedItinerary}
                selectedProvinces={selectedProvinces}
                renderPriceLevel={renderPriceLevel}
                questions={questions}
                submitFormData={submitFormData}
                setPendingItinerary={setPendingItinerary}
                setResumedItinerary={setResumedItinerary}
              />
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
