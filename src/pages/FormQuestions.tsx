import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header/Header';
import { MapaArg } from '../components/Destinations/MapaArg';
import { ProgressBar } from '../components/Questions/ProgressBar';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { es } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import { get, post } from '../utilities/http.util';
import {
  Baby,
  Banknote,
  Binoculars,
  Book,
  CloudSun,
  Flame,
  Gem,
  HandCoins,
  Handshake,
  Heart,
  Mountain,
  PartyPopper,
  PersonStanding,
  Snowflake,
  Sun,
  TreePine,
  Trophy,
  Utensils,
} from 'lucide-react';
import { DialogWindow } from '../components/Questions/DialogWindow';
import Lottie from 'lottie-react';
import logoAnimado from '../assets/logoAnimado.json';

interface FormData {
  provinceId?: number | null;
  fromDate: string;
  toDate: string;
  economy: number | null;
  types: string[];
  weather: number | null;
  company: number | null;
}

interface Province {
  id: number;
  name: string;
}

const questions = [
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
        data: 1,
      },
      {
        src: <Banknote width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
        alt: 'Moderado',
        data: 2,
      },
      {
        src: <Gem width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
        alt: 'Lujoso',
        data: 3,
      },
    ],
    type: 'icon',
    name: 'economy',
    multipleSelection: false,
  },
  {
    question: '¿Qué tipo de clima preferís?',
    options: [
      {
        src: <Flame width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
        alt: 'Árido',
        data: 1,
      },
      {
        src: <Snowflake width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
        alt: 'Frío',
        data: 2,
      },
      {
        src: <CloudSun width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
        alt: 'Templado',
        data: 3,
      },
      {
        src: <Sun width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
        alt: 'Cálido',
        data: 4,
      },
    ],
    type: 'icon',
    name: 'weather',
    multipleSelection: false,
  },
  {
    question: '¿Qué tipo de actividades te gusta hacer?',
    options: [
      {
        src: <Binoculars width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
        alt: 'Atracción turística',
        data: 'tourist_attraction',
      },
      {
        src: <Utensils width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
        alt: 'Comida',
        data: 'food,restaurant,cafe,coffee_shop',
      },
      {
        src: <Book width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
        alt: 'Cultura',
        data: 'library,museum,political',
      },
      {
        src: <Trophy width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
        alt: 'Deporte',
        data: 'sports_complex,stadium',
      },
      {
        src: <PartyPopper width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
        alt: 'Fiesta',
        data: 'bar,night_club',
      },
      {
        src: <Mountain width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
        alt: 'Montaña',
        data: 'hiking_area',
      },
      {
        src: <TreePine width={80} height={80} color={'#0F254CE6'} strokeWidth={1} />,
        alt: 'Naturaleza',
        data: 'campground,national_park,park',
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
  const [selectedProvince, setSelectedProvince] = useState<Province>();
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    provinceId: null,
    fromDate: '',
    toDate: '',
    economy: null,
    types: [],
    weather: null,
    company: null,
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

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
    const province = provinces.find((p) => p.id === id);
    setSelectedProvince(province);
    formData.provinceId = province.id;
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

        setErrorMessage('');

        break;
      case 1:
        if (!formData.economy) {
          setErrorMessage('Tenés que seleccionar una opción');
          return;
        }

        setErrorMessage('');

        break;
      case 2:
        if (!formData.weather) {
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
        submitFormData();
      }
    }
  };

  const submitFormData = async () => {
    setLoading(true); // Inicia el estado de carga

    formData.fromDate = state[0].startDate.toISOString();
    formData.toDate = state[0].endDate.toISOString();

    try {
      const response = await post(
        'https://api-turistear.koyeb.app/formQuestion',
        {
          'Content-Type': 'application/json',
        },
        formData,
      );

      if (response.statusCode === 201) {
        const itineraryId = response.data.id;
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
    localStorage.setItem('selectedProvince', JSON.stringify(selectedProvince));
  };

  const getFormDataFromLocalStorage = (): FormData | null => {
    const data = localStorage.getItem('formData');
    return data ? JSON.parse(data) : null;
  };

  const getSelectedProvinceFromLocalStorage = (): Province | null => {
    const data = localStorage.getItem('selectedProvince');
    return data ? JSON.parse(data) : null;
  };

  useEffect(() => {
    const savedFormData = getFormDataFromLocalStorage();

    if (savedFormData) {
      const savedProvince = getSelectedProvinceFromLocalStorage();
      setFormData(savedFormData);
      setSelectedProvince(savedProvince);
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

  return (
    <>
      <Header />
      <DialogWindow isOpen={dialogWindowOpen} onClose={handleCloseDialogWindow} />
      {loading ? (
        <div className="w-[90%] md:w-full mx-auto min-h-[90vh] flex flex-col items-center justify-center">
          <h2 className="text-4xl text-center text-primary-4 mx-auto mb-6 md:mb-8">
            Estamos armando el viaje ideal para vos...
          </h2>
          <Lottie className="w-[16rem] md:w-[18rem] mx-auto" animationData={logoAnimado} />
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
                      {selectedProvince && (
                        <span className="text-center text-xl my-1">
                          Provincia:{' '}
                          <strong>
                            {provinces.find((p) => p.id === selectedProvince.id)?.name}
                          </strong>
                        </span>
                      )}
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
                        <div
                          key="economy"
                          className="w-40 h-40 flex flex-col items-center justify-center gap-y-2 mx-2 p-2 border border-gray"
                        >
                          {
                            questions[1].options.find((option) => option.data === formData.economy)
                              ?.src
                          }
                          {
                            questions[1].options.find((option) => option.data === formData.economy)
                              ?.alt
                          }
                        </div>
                        <div
                          key="weather"
                          className="w-40 h-40 flex flex-col items-center justify-center gap-y-2 mx-2 p-2 border border-gray"
                        >
                          {
                            questions[2].options.find((option) => option.data === formData.weather)
                              ?.src
                          }
                          {
                            questions[2].options.find((option) => option.data === formData.weather)
                              ?.alt
                          }
                        </div>
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
                <div>
                  {questions[currentQuestion].type === 'calendar' ? (
                    <div className="flex flex-col md:flex-row w-full">
                      <div className="flex flex-col items-center relative">
                        <MapaArg onProvinceClick={handleProvinceClick} />
                      </div>
                      <div className="flex flex-col gap-y-4 justify-center items-center w-full">
                        <h2 className="text-2xl sm:text-3xl font-semibold text-primary-4">
                          Armemos tu próxima aventura
                        </h2>
                        <div className="h-10 text-center">
                          {selectedProvince ? (
                            <span className="text-2xl font-bold text-primary-2">
                              {selectedProvince.name}
                            </span>
                          ) : null}
                        </div>
                        <div>
                          <span className="block text-lg font-medium leading-6 text-gray-900 my-2">
                            Fecha del viaje
                          </span>
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
                        </div>
                        <div>
                          <span>
                            {state[0].endDate && state[0].startDate && (
                              <p className="text-xl">
                                Tu viaje va a durar
                                <strong>
                                  {' '}
                                  {state[0].endDate && state[0].startDate
                                    ? Math.ceil(
                                        (state[0].endDate.getTime() -
                                          state[0].startDate.getTime()) /
                                          (1000 * 60 * 60 * 24),
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
                            className="btn-question"
                            onClick={handleNextQuestion}
                          >
                            Siguiente pregunta
                          </button>
                          {errorMessage && (
                            <div className="error-message" role="alert">
                              {errorMessage}
                            </div>
                          )}
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
                                  questions[currentQuestion].multipleSelection
                                    ? 'checkbox'
                                    : 'radio'
                                }
                                id={`option-${index}`}
                                checked={
                                  questions[currentQuestion].multipleSelection
                                    ? formData.types.includes(option.data as string)
                                    : formData[
                                        questions[currentQuestion].name as keyof FormData
                                      ] === option.data
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
                </div>
              </form>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default FormQuestions;
