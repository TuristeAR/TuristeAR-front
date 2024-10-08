import { useEffect, useState } from 'react';
import { Header } from '../components/Header/Header';
import { MapaArg } from '../components/Destinations/MapaArg';
import { ProgressBar } from '../components/Questions/ProgressBar';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { es } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

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
      { src: '/assets/pancho.jpg', alt: 'Económico', data: 1 },
      { src: '/assets/canelones.jpg', alt: 'Moderado', data: 2 },
      { src: '/assets/pollo.jpg', alt: 'Lujoso', data: 3 },
    ],
    type: 'image',
    name: 'economy',
    multipleSelection: false,
  },
  {
    question: '¿Qué tipo de clima preferís?',
    options: [
      { src: '/assets/clima_calido.jpg', alt: 'Cálido', data: 4 },
      { src: '/assets/clima_templado.jpg', alt: 'Templado', data: 3 },
      { src: '/assets/clima_frio.jpg', alt: 'Frío', data: 2 },
      { src: '/assets/clima_arido.jpg', alt: 'Árido', data: 1 },
    ],
    type: 'image',
    name: 'weather',
    multipleSelection: false,
  },
  {
    question: '¿Qué tipo de actividades te gusta hacer?',
    options: [
      { src: '/assets/playa.jpg', alt: 'Naturaleza', data: 'national_park' },
      { src: '/assets/escalar.jpg', alt: 'Montañas', data: 'hiking_area' },
      { src: '/assets/aire_libre.jpg', alt: 'Comida', data: 'food' },
      { src: '/assets/urbano.jpg', alt: 'Atracciones turísticas', data: 'tourist_attraction' },
    ],
    type: 'image',
    name: 'activities',
    multipleSelection: true,
  },
  {
    question: '¿Con quién vas a emprender tu nueva aventura?',
    options: [
      { src: '/assets/solo.jpg', alt: 'Sólo', data: 1 },
      { src: '/assets/en_pareja.jpg', alt: 'En pareja', data: 2 },
      { src: '/assets/amigos.jpg', alt: 'Amigos', data: 3 },
      { src: '/assets/familia.jpg', alt: 'Familia', data: 4 },
    ],
    type: 'image',
    name: 'company',
    multipleSelection: false,
  },
];

const FormQuestions = () => {
  const navigate = useNavigate();
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

  const handleNextQuestion = () => {
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
    try {
      formData.fromDate = state[0].startDate.toISOString();
      formData.toDate = state[0].endDate.toISOString();

      const response = await fetch('https://api-turistear.koyeb.app/formQuestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error en la red: ${response.statusText} (${response.status})`);
      }

      navigate('/calendarioItinerario');
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch('https://api-turistear.koyeb.app/province');

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const fetchResponse = await response.json();

        setProvinces(fetchResponse.data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();
  }, []);

  return (
    <>
      <Header />
      <section className="min-h-screen flex items-center justify-center bg-gray-100 text-black py-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-center z-30 relative">
          <form className="flex flex-col w-full max-w-full items-center justify-center bg-white p-4 gap-y-6 md:gap-y-4 min-h-[500px]">
            <ProgressBar currentStep={currentStep} />
            <div>
              {questions[currentQuestion].type === 'image' ? (
                <div className="flex flex-col items-center gap-4">
                  <h3 className="text-primary-4 font-bold text-xl text-center">
                    {questions[currentQuestion].question}
                  </h3>
                  <div className="flex flex-col md:flex-row gap-x-5 justify-center">
                    {questions[currentQuestion].options?.map((option, index) => (
                      <div key={index} className="flex flex-col justify-center gap-y-2">
                        {questions[currentQuestion].multipleSelection ? (
                          <input
                            type="checkbox"
                            id={`option-${index}`}
                            checked={formData.types.includes(option.data as string)}
                            onChange={() => handleMultipleSelection(option.data as string)}
                          />
                        ) : (
                          <input
                            type="radio"
                            id={`option-${index}`}
                            checked={
                              formData[questions[currentQuestion].name as keyof FormData] ===
                              option.data
                            }
                            onChange={() =>
                              handleSingleSelection(
                                questions[currentQuestion].name as keyof FormData,
                                option.data as number,
                              )
                            }
                          />
                        )}
                        <label htmlFor={`option-${index}`} className="relative">
                          <img
                            src={option.src}
                            alt={option.alt}
                            className="w-[250px] h-[100px] md:w-[450px] md:h-[250px] object-cover cursor-pointer"
                          />
                          <p className="absolute bottom-0 text-sm py-2 bg-black/60 w-full text-white text-center">
                            {option.alt}
                          </p>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-x-4">
                    <button type="button" className="btn-question" onClick={handleNextQuestion}>
                      {currentQuestion < questions.length - 1 ? 'Siguiente pregunta' : 'Finalizar'}
                    </button>
                  </div>
                </div>
              ) : questions[currentQuestion].type === 'calendar' ? (
                <div className="flex flex-col md:flex-row w-full">
                  <div className="flex flex-col items-center relative">
                    <MapaArg onProvinceClick={handleProvinceClick} />
                  </div>
                  <div className="flex flex-col gap-y-4 justify-center items-center w-full">
                    <h2 className="text-[25px] font-semibold text-primary-4">
                      Armemos tu próxima aventura
                    </h2>
                    <div>
                      <span className="block text-sm font-medium leading-6 text-gray-900">
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
                          <p>
                            Tu viaje va a durar{' '}
                            {state[0].endDate && state[0].startDate
                              ? Math.ceil(
                                  (state[0].endDate.getTime() - state[0].startDate.getTime()) /
                                    (1000 * 60 * 60 * 24),
                                )
                              : 0}{' '}
                            días
                          </p>
                        )}
                      </span>
                    </div>
                    <div className="flex gap-x-4">
                      <button type="button" className="btn-question" onClick={handleNextQuestion}>
                        Siguiente pregunta
                      </button>
                    </div>
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
