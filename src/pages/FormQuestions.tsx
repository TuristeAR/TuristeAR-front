import { useState } from 'react';
import { Header } from '../components/Header';
import MapaArg from '../components/MapaArg';
import { useNavigate } from 'react-router-dom';

// Definir la estructura de formData con una interfaz
interface FormData {
  province?: string; // Agregamos la provincia aquí
  date: string;
  days: number | string;
  answers: {
    [key: number]: string | string[]; // Índices numéricos, respuestas pueden ser string o array de strings (selección múltiple)
  };
}

// Preguntas del formulario con selección única y múltiple
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
      { src: '/assets/pollo.jpg', alt: 'Turismo Urbano' },
    ],
    type: 'image', 
    multipleSelection: false,  // Selección única
  },
  {
    question: '¿Qué tipo de clima preferís?',
    options: [
      { src: '/assets/clima_calido.jpg', alt: 'Clima calido' },
      { src: '/assets/clima_templado.jpg', alt: 'Clima templado' },
      { src: '/assets/clima_frio.jpg', alt: 'Clima frio' },
      { src: '/assets/clima_arido.jpg', alt: 'Clima Arido' },
    ],
    type: 'image', 
    multipleSelection: false,  // Selección única
  },
  {
    question: '¿Qué tipo de actividades te gusta hacer?',
    options: [
      { src: '/assets/playa.jpg', alt: 'Playa' },
      { src: '/assets/escalar.jpg', alt: 'Escalar' },
      { src: '/assets/aire_libre.jpg', alt: 'Aire Libre' },
      { src: '/assets/urbano.jpg', alt: 'Turismo Urbano' },
    ],
    type: 'image', 
    multipleSelection: true,  // Selección múltiple
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
    multipleSelection: false,  // Selección única
  },
];

// Provincias de ejemplo para la selección en el mapa
type Province = {
  id: string;
  nombre: string;
};

const provincias = [
  {
    id: 'caba',
    nombre: 'Ciudad Autónoma de Buenos Aires',
  },
  {
    id: 'caba-z',
    nombre: 'Ciudad Autónoma de Buenos Aires',
  },
  {
    id: 'buenos-aires',
    nombre: 'Buenos Aires',
  },
  {
    id: 'catamarca',
    nombre: 'Catamarca',
  },
  {
    id: 'chaco',
    nombre: 'Chaco',
  },
  {
    id: 'chubut',
    nombre: 'Chubut',
  },
  {
    id: 'cordoba',
    nombre: 'Córdoba',
  },
  {
    id: 'corrientes',
    nombre: 'Corrientes',
  },
  {
    id: 'entre-rios',
    nombre: 'Entre Ríos',
  },
  {
    id: 'formosa',
    nombre: 'Formosa',
  },
  {
    id: 'jujuy',
    nombre: 'Jujuy',
  },
  {
    id: 'la-pampa',
    nombre: 'La Pampa',
  },
  {
    id: 'la-rioja',
    nombre: 'La Rioja',
  },
  {
    id: 'mendoza',
    nombre: 'Mendoza',
  },
  {
    id: 'misiones',

    nombre: 'Misiones',
  },
  {
    id: 'neuquen',

    nombre: 'Neuquén',
  },
  {
    id: 'rio-negro',

    nombre: 'Río Negro',
  },
  {
    id: 'salta',

    nombre: 'Salta',
  },
  {
    id: 'san-juan',

    nombre: 'San Juan',
  },
  {
    id: 'san-luis',

    nombre: 'San Luis',
  },
  {
    id: 'santa-cruz',

    nombre: 'Santa Cruz',
  },
  {
    id: 'santa-fe',

    nombre: 'Santa Fe',
  },
  {
    id: 'santiago-del-estero',

    nombre: 'Santiago del Estero',
  },
  {
    id: 'tierra-del-fuego',

    nombre: 'Tierra del Fuego',
  },
  {
    id: 'tucuman',

    nombre: 'Tucumán',
  },
];



const FormQuestions = () => {
  const [selectedProvince, setSelectedProvince] = useState<Province>();  // Estado para manejar la provincia seleccionada
  const [currentQuestion, setCurrentQuestion] = useState(0);  // Controla el índice de la pregunta actual
  const [formData, setFormData] = useState<FormData>({
    province: '',
    date: '',
    days: 0,
    answers: {}
  });  // Estado para manejar las respuestas del formulario con tipado
  const [errors, setErrors] = useState({}); // Estado para errores de validación
  const navigate = useNavigate();

  const handleProvinceClick = (nombre: string) => {
    const province = provincias.find((p) => p.id === nombre);
    setSelectedProvince(province);
    formData.province = province?.nombre;
  };

  // Manejo de inputs del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Validación de campos obligatorios
  const validate = () => {
    let formErrors = {};

    // Validar campo de días
    if (!formData.days || isNaN(Number(formData.days)) || Number(formData.days) <= 0) {
      formErrors = { ...formErrors, days: 'Por favor ingrese un número válido de días.' };
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Retorna true si no hay errores
  };


  
    // Manejar la selección única
    const handleSingleSelection = (selectedOption: string) => {
      setFormData((prevData) => ({
        ...prevData,
        answers: { ...prevData.answers, [currentQuestion]: selectedOption }, // Aquí se usa currentQuestion como índice numérico
      }));
    };
  
    // Manejar la selección múltiple
    const handleMultipleSelection = (selectedOption: string) => {
      setFormData((prevData) => {
        const currentSelections = prevData.answers[currentQuestion] || [];
        let updatedSelections;
  
        if (Array.isArray(currentSelections) && currentSelections.includes(selectedOption)) {
          updatedSelections = currentSelections.filter((option) => option !== selectedOption);
        } else {
          updatedSelections = [...currentSelections, selectedOption];
        }
  
        return {
          ...prevData,
          answers: { ...prevData.answers, [currentQuestion]: updatedSelections }, // Aquí también usamos currentQuestion como índice numérico
        };
      });
    };
  

  // Manejar la siguiente pregunta con validación
  const handleNextQuestion = () => {
    if (currentQuestion === 0 && !validate()) {
      return;  // No avanzar si la validación falla
    }

    if (currentQuestion < questions.length - 1) { // se consulta la posicion de la pregunta y si se puede se avanza ala siguiente
      setCurrentQuestion(currentQuestion + 1);
    } else {
      
      console.log(formData); // mostar data formulario 
      submitFormData();
      
    }
  };


  const submitFormData = async () =>{
    try {
        const response = await fetch('https://api-turistear.koyeb.app/formQuestion', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Error en la red');
        }

        const responseData = await response.json();
        console.log('Datos enviados con éxito:', responseData);
        navigate('/calendar');  // Cambiar la ruta cuando finalice el formulario y se genere el itinerario 

    } catch (error) {
        console.error('Error al enviar los datos:', error);
    }
};

  return (
    <>
      <Header containerStyles={'bg-primary  '} />

      <section className="min-h-screen flex items-center justify-center bg-gray-100 text-black py-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-center z-30 relative">
          <form className="flex flex-col w-full max-w-full items-center justify-center bg-white p-4 gap-y-6 md:gap-y-4 min-h-[500px]">
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
                          checked={formData.answers[currentQuestion]?.includes(option.alt) || false}
                          onChange={() => handleMultipleSelection(option.alt)}
                        />
                        
                        ) : (
                          <input
                            type="radio"
                            name={`question-${currentQuestion}`}
                            id={`option-${index}`}
                            checked={formData.answers[currentQuestion] === option.alt}
                            onChange={() => handleSingleSelection(option.alt)} 
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
<<<<<<< HEAD
                <>
                  <div className="flex flex-col md:flex-row w-full">
                    <div className="flex flex-col items-center relative">
                      <div className="absolute top-16 left-4 block text-md font-medium leading-6 text-gray-900">
                        <h2>Seleccioná una provincia</h2>
                      </div>
                      <MapaArg
                        onProvinceClick={handleProvinceClick}
                        defaultProvinceId={selectedProvince?.id}
=======
                <div className="flex flex-col md:flex-row w-full">
                  <div className="flex flex-col items-center relative">
                    <MapaArg onProvinceClick={handleProvinceClick} defaultProvinceId={selectedProvince?.id} />
                  </div>
                  <div className="flex flex-col gap-y-4 justify-center items-center w-full">
                    <h2 className="text-[25px] font-semibold text-primary-4">
                      Armemos tu próxima aventura
                    </h2>

                    <div>
                      <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                        Fecha del viaje
                      </label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className={`mt-1 block w-[300px] px-3 py-2 border  'border-red-500' : 'border-gray-300'
                          } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
>>>>>>> main
                      />
                    </div>
<<<<<<< HEAD
                    <div className="flex flex-col gap-y-4 justify-center items-center w-full">
                      <h2 className="text-[25px] font-bold text-primary-3 text-center">
                        Armemos tu próxima aventura
                      </h2>
=======
>>>>>>> main

                    <div>
                      <label htmlFor="days" className="block text-sm font-medium leading-6 text-gray-900">
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