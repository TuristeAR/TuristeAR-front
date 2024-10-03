import { useState } from 'react';
import { Header } from '../components/Header';
import MapaArg from '../components/MapaArg';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: 'Fecha del viaje y Duración del viaje ',
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
  },
  {
    question: '¿Qué tipo de actividades te gusta hacer?',
    options: [
      { src: '/assets/playa.jpg', alt: 'Playa' },
      { src: '/assets/escalar.jpg', alt: 'Playa' },
      { src: '/assets/aire_libre.jpg', alt: 'Aire Libre' },
      { src: '/assets/urbano.jpg', alt: 'Turismo Urbano' },
    ],
    type: 'image',
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
  },
];

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
  const [selectedProvince, setSelectedProvince] = useState<Province>();
  const [currentQuestion, setCurrentQuestion] = useState(0); // Estado para controlar el índice de la pregunta actual
  const [formData, setFormData] = useState({ date: '', days: '', comfort: '' }); // Estado para guardar las respuestas
  const navigate = useNavigate();

  const handleProvinceClick = (nombre: string) => {
    const province = provincias.find((p) => p.id === nombre);
    setSelectedProvince(province);
  };

  // Manejar el cambio de inputs (calendario, días, nivel de comodidad)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate('/calendar');
    }
  };

  return (
    <>
      <Header containerStyles={'bg-primary  '} />

      <section className="min-h-screen flex items-center justify-center bg-gray-100 text-black py-8">
        <div className="container mx-auto  flex flex-col md:flex-row justify-center z-30 relative">
          {/* Formulario */}
          <form className="flex flex-col w-full max-w-full items-center justify-center bg-white p-4 gap-y-6 md:gap-y-4 min-h-[500px]">
            <div>
              {questions[currentQuestion].type === 'image' ? (
                <div className="flex flex-col items-center gap-4">
                  <div>
                    <h3 className="text-primary-4 font-bold text-xl text-center">
                      {questions[currentQuestion].question}
                    </h3>
                  </div>

                  <div className="flex flex-col md:flex-row gap-x-5  justify-center">
                    {questions[currentQuestion].options?.map((option, index) => (
                      <div key={index} className="flex flex-col justify-center gap-y-2">
                        <input type="radio" name="question" id={`option-${index}`} />
                        <label className="relative" htmlFor={`option-${index}`}>
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

                  {/* Botón para avanzar o finalizar */}
                  <div className="flex gap-x-4">
                    {currentQuestion < questions.length - 1 ? (
                      <button type="button" className="btn-question" onClick={handleNextQuestion}>
                        Siguiente pregunta
                      </button>
                    ) : (
                      <button type="button" className="btn-question" onClick={handleNextQuestion}>
                        Finalizar
                      </button>
                    )}
                  </div>
                </div>
              ) : questions[currentQuestion].type === 'calendar' ? (
                <>
                  <div className="flex flex-col md:flex-row w-full">
                    <div className="flex flex-col items-center relative">
                      <div className="absolute top-16 left-4 block text-md font-medium leading-6 text-gray-900">
                        <h2>Seleccioná una provincia</h2>
                      </div>
                      <MapaArg
                        onProvinceClick={handleProvinceClick}
                        defaultProvinceId={selectedProvince?.id}
                      />
                      {/* Si hay una provincia seleccionada, mostrar el popup */}
                      {selectedProvince && (
                        <div className="fixed inset-0 flex  items-center justify-center bg-black bg-opacity-50">
                          <div className="bg-white p-4 rounded-lg flex flex-col items-center shadow-lg">
                            <h3>Has seleccionado: {selectedProvince.nombre}</h3>
                            <button
                              onClick={() => setSelectedProvince(undefined)}
                              className="btn-blue mt-4"
                            >
                              Cerrar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-y-4 justify-center items-center w-full">
                      <h2 className="text-[25px] font-bold text-primary-3 text-center">
                        Armemos tu próxima aventura
                      </h2>

                      {/* Pregunta: ¿Qué nivel de comodidad buscas? */}
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
                          className="mt-1 block w-[300px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                      </div>

                      {/* Pregunta: ¿Cuántos días durará tu viaje? */}
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
                          className="mt-1 block w-[300px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                      </div>

                      <div className="flex gap-x-4">
                        <button type="button" className="btn-question" onClick={handleNextQuestion}>
                          Saltar pregunta
                        </button>
                        <button type="button" className="btn-question" onClick={handleNextQuestion}>
                          Siguiente pregunta
                        </button>
                      </div>
                      <p className="text-primary">
                        Crearemos el itinerario en base a tus respuestas
                      </p>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default FormQuestions;
