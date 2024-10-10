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

interface FormData {
  province?: number | null;
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
  const [errorMessage, setErrorMessage] = useState('');
  const [dialogWindowOpen, setDialogWindowOpen] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState<Province>();
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    province: null,
    fromDate: '',
    toDate: '',
    economy: null,
    types: [],
    weather: null,
    company: null,
  });
  const [currentStep, setCurrentStep] = useState(1);

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
    formData.province = province?.id;
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
      submitFormData();
    }
  };

  const submitFormData = async () => {
    formData.fromDate = state[0].startDate.toISOString();
    formData.toDate = state[0].endDate.toISOString();

    const response = await post(
      'https://api-turistear.koyeb.app/formQuestion',
      {
        'Content-Type': 'application/json',
      },
      formData,
    );

    if (response.statusCode === 201) {
      const itinerary = response.data;

      navigate('/itineraryCalendar', { state: { itinerary } });
    }

    if (response.statusCode === 401) {
      setDialogWindowOpen(true);
    }
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await get('https://api-turistear.koyeb.app/province', {
          'Content-Type': 'application/json',
        });

        setSelectedProvince(response.data[0]);
        setProvinces(response.data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();
  }, []);

  return (
    <>
      <Header />
      <DialogWindow isOpen={dialogWindowOpen} onClose={handleCloseDialogWindow} />
      <section
        className={`min-h-[90vh] flex items-center justify-center ${dialogWindowOpen ? 'opacity-10' : 'bg-gray-100'} text-black`}
      >
        <div className="container mx-auto flex flex-col md:flex-row justify-center z-30 relative">
          <form className="flex flex-col w-full max-w-full items-center justify-center bg-white p-4 gap-y-6 md:gap-y-4 min-h-[500px]">
            <ProgressBar currentStep={currentStep} />
            <div>
              {questions[currentQuestion].type === 'calendar' ? (
                <div className="flex flex-col md:flex-row w-full">
                  <div className="flex flex-col items-center relative">
                    <div>{selectedProvince?.name}</div>
                    <MapaArg onProvinceClick={handleProvinceClick} />
                  </div>
                  <div className="flex flex-col gap-y-4 justify-center items-center w-full">
                    <h2 className="text-2xl font-semibold text-primary-4">
                      Armemos tu próxima aventura
                    </h2>
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
                                    (state[0].endDate.getTime() - state[0].startDate.getTime()) /
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
                      <button type="button" className="btn-question" onClick={handleNextQuestion}>
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
                        <div className="w-40 p-2 border border-gray text-center">{option.alt}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col items-center gap-x-4">
                    <button type="button" className="btn-question" onClick={handleNextQuestion}>
                      {currentQuestion < questions.length - 1 ? 'Siguiente pregunta' : 'Finalizar'}
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
        </div>
      </section>
    </>
  );
};

export default FormQuestions;
