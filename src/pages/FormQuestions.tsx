import { useState } from 'react';
import { Header } from '../components/Header/Header';
import { MapaArg } from '../components/Destinations/MapaArg';
import { useNavigate } from 'react-router-dom';
import { provincias } from '../utilities/provincias';
import { ProgressBar } from '../components/Questions/ProgressBar';

interface FormData {
  province?: string; // Agregamos la provincia aquí
  date: string;
  days: number | string;
  economy: string;
  activities: string[];
  weather: string;
  company: string;
}
// Define el tipo de errores
interface FormErrors {
  days?: string;
  date?: string;
}
const questions = [
  {
    question: 'Fecha del viaje y Duración del viaje',
    type: 'calendar',
  },
  {
    question: '¿Qué nivel de comodidad se ajusta a tu presupuesto?',
    options: [
      { src: '/assets/pancho.jpg', alt: 'Económico' },
      { src: '/assets/canelones.jpg', alt: 'Moderado' },
      { src: '/assets/pollo.jpg', alt: 'Lujoso' },
    ],
    type: 'image',
    name: 'economy',
    multipleSelection: false, // Selección única
  },
  {
    question: '¿Qué tipo de clima preferís?',
    options: [
      { src: '/assets/clima_calido.jpg', alt: 'Clima calido' },
      { src: '/assets/clima_templado.jpg', alt: 'Clima templado' },
      { src: '/assets/clima_frio.jpg', alt: 'Clima frio' },
      { src: '/assets/clima_arido.jpg', alt: 'Clima arido' },
    ],
    type: 'image',
    name: 'weather',
    multipleSelection: false, // Selección única
  },
  {
    question: '¿Qué tipo de actividades te gusta hacer?',
    options: [
      { src: '/assets/playa.jpg', alt: 'Relajar' },
      { src: '/assets/escalar.jpg', alt: 'Deportes de aventura' },
      { src: '/assets/aire_libre.jpg', alt: 'Naturaleza' },
      { src: '/assets/urbano.jpg', alt: 'Urbano' },
    ],
    type: 'image',
    name: 'activities',
    multipleSelection: true, // Selección múltiple
  },
  {
    question: '¿Con quién vas a emprender tu nueva aventura?',
    options: [
      { src: '/assets/solo.jpg', alt: 'Solo' },
      { src: '/assets/en_pareja.jpg', alt: 'En pareja' },
      { src: '/assets/amigos.jpg', alt: 'Amigos' },
      { src: '/assets/familia.jpg', alt: 'Familia' },
    ],
    type: 'image',
    name: 'company',
    multipleSelection: false, // Selección única
  },
];

// Provincias de ejemplo para la selección en el mapa
type Province = {
  id: string;
  nombre: string;
};

const FormQuestions = () => {
  const [selectedProvince, setSelectedProvince] = useState<Province>(); // Estado para manejar la provincia seleccionada
  const [currentQuestion, setCurrentQuestion] = useState(0); // Controla el índice de la pregunta actual
  const [formData, setFormData] = useState<FormData>({
    province: '',
    date: '',
    days: 0,
    economy: '',
    activities: [],
    weather: '',
    company: '',
  });
  const [currentStep, setCurrentStep] = useState(1);

  const [errors, setErrors] = useState<FormErrors>({}); // Estado para errores de validación
  const navigate = useNavigate();

  const handleProvinceClick = (nombre: string) => {
    const province = provincias.find((p) => p.id === nombre);
    setSelectedProvince(province);
    formData.province = province?.nombre;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Si hay un error en el campo actual, eliminarlo
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined, // Borra el error de este campo
    }));
  };

  // Validación de campos obligatorios
  const validate = () => {
    let formErrors: FormErrors = {};
    const days = Number(formData.days);

    // Validar campo de días
    if (!formData.days || isNaN(days) || days <= 0) {
      formErrors.days = 'Por favor ingrese un número válido de días.';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Devuelve verdadero si no hay errores
  };

  // Manejar la selección única
  const handleSingleSelection = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultipleSelection = (option: string) => {
    setFormData((prev) => {
      const alreadySelected = prev.activities.includes(option);
      let updatedActivities = [];

      if (alreadySelected) {
        // Si la opción ya estaba seleccionada, la quitamos
        updatedActivities = prev.activities.filter((activity) => activity !== option);
      } else {
        // Si no estaba seleccionada, la agregamos
        updatedActivities = [...prev.activities, option];
      }

      return { ...prev, activities: updatedActivities };
    });
  };

  // Manejar la siguiente pregunta con validación
  const handleNextQuestion = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
  }
    if (currentQuestion === 0 && !validate()) {
      return; // No avanzar si la validación falla
    }

    if (currentQuestion < questions.length - 1) {
      // se consulta la posicion de la pregunta y si se puede se avanza ala siguiente
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log(formData); // mostar data formulario
      submitFormData();
    }
  };

  const submitFormData = async () => {
    try {
      const response = await fetch('https://api-turistear.koyeb.app/formQuestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log('Código de estado:', response.status);

      if (!response.ok) {
        throw new Error(`Error en la red: ${response.statusText} (${response.status})`);
      }

      const responseData = await response.json();
      console.log('Datos enviados con éxito:', responseData);
      console.log('Redirigiendo a /calendarioItinerario');
      navigate('/calendarioItinerario');
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <>
      <Header />

      <section className="min-h-screen flex items-center justify-center bg-gray-100 text-black py-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-center z-30 relative">
          <form className="flex flex-col w-full max-w-full items-center justify-center bg-white p-4 gap-y-6 md:gap-y-4 min-h-[500px]">
          <ProgressBar currentStep={currentStep} />

            <div>
              {questions[currentQuestion].type === 'image' ? (
                /* PREGUNTAS DE IMAGEN */
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
                            checked={formData.activities.includes(option.alt)}
                            onChange={() => handleMultipleSelection(option.alt)}
                          />
                        ) : (
                          <input
                            type="radio"
                            id={`option-${index}`}
                            checked={
                              formData[questions[currentQuestion].name as keyof FormData] ===
                              option.alt
                            }
                            onChange={() =>
                              handleSingleSelection(
                                questions[currentQuestion].name as keyof FormData,
                                option.alt,
                              )
                            }
                          />
                        )}
                        {/* Imagen */}
                        <label htmlFor={`option-${index}`} className="relative">
                          <img
                            src={option.src}
                            alt={option.alt}
                            className="w-[250px] h-[100px] md:w-[450px] md:h-[250px] object-cover cursor-pointer"
                          />
                          {/* Titulo */}
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
              ) : /* PRIMER PREGUNTA */
              questions[currentQuestion].type === 'calendar' ? (
                <div className="flex flex-col md:flex-row w-full">
                  <div className="flex flex-col items-center relative">
                    <MapaArg
                      onProvinceClick={handleProvinceClick}
                      defaultProvinceId={selectedProvince?.id}
                    />
                  </div>
                  <div className="flex flex-col gap-y-4 justify-center items-center w-full">
                    <h2 className="text-[25px] font-semibold text-primary-4">
                      Armemos tu próxima aventura
                    </h2>

                    <div>
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Fecha del viaje
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className={`mt-1 block w-[300px] px-3 py-2 border  'border-red-500' : 'border-gray-300'
                          } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="days"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Cantidad de días <span className="text-[#ff0000]">*</span>
                      </label>
                      <input
                        type="number"
                        name="days"
                        value={formData.days}
                        onChange={handleInputChange}
                        placeholder="Ingresá cantidad de días"
                        className={`mt-1 block w-[300px] px-3 py-2 border  'border-red-500' : 'border-gray-300'
                        } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
                      />
                      {errors.days && (
                        <span className="text-[#ff0000] text-sm font-medium">{errors.days}</span>
                      )}
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
