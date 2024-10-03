import { useState } from 'react';
import { Header } from '../components/Header';
import MapaArg from '../components/MapaArg';
import { useNavigate } from 'react-router-dom';

// Preguntas y entradas del formulario, con texto, imágenes y inputs
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
      { src: '/assets/aire_libre.jpg', alt: 'aire Libre' },
      { src: '/assets/urbano.jpg', alt: 'Turismo Urbano' },
    ],
    type: 'image',
  },
  {
    question: '¿Con quién vas a emprender tu nueva aventura?',
    options: [
      { src: '/assets/solo.jpg', alt: 'solo' },
      { src: '/assets/en_pareja.jpg', alt: 'en pareja' },
      { src: '/assets/amigos.jpg', alt: 'amigos' },
      { src: '/assets/familia.jpg', alt: 'familia' },
    ],
    type: 'image',
  },
];

const FormQuestions = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0); // Estado para controlar el índice de la pregunta actual
  const [formData, setFormData] = useState({ date: '', days: '', comfort: '' }); // Estado para guardar las respuestas
  const navigate = useNavigate(); // Para la navegación después de las preguntas

  // Manejar el cambio de inputs (calendario, días, nivel de comodidad)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Función para avanzar a la siguiente pregunta
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      console.log(formData); // Aquí podrías enviar la información al servidor o procesarla
      navigate('/calendar'); // Al finalizar las preguntas, navega a la página de calendario
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

                  <div className="flex gap-x-5  justify-center">
                    {questions[currentQuestion].options?.map((option, index) => (
                      <div key={index} className="flex flex-col justify-center gap-y-2">
                        <input type="radio" name="question" id={`option-${index}`} />
                        <label className="relative" htmlFor={`option-${index}`}>
                          <img
                            src={option.src}
                            alt={option.alt}
                            className="w-[250px] h-[100px] md:w-[450px] md:h-[250px] object-cover cursor-pointer"
                          />
                          <p className="absolute bottom-0 bg-black/60 w-full text-white text-center">
                            {option.alt}
                          </p>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ) : questions[currentQuestion].type === 'calendar' ? (
                <>
                  <div className="flex flex-col md:flex-row w-full">
                    <div className="flex flex-col items-center relative">
                      <div className="absolute top-16">
                        <h2>Seleccioná una provincia</h2>
                      </div>
                      <MapaArg />
                    </div>
                    <div className="flex flex-col justify-center items-center w-full">
                      <h2 className="text-[25px] font-semibold">Armemos tu próxima aventura</h2>

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
                          ¿Cuántos días durará tu viaje?
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
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h1>Ahora crearemos tu itinerario</h1>
                  </div>
                </>
              )}
            </div>

            {/* Botón para avanzar o finalizar */}
            <div className="flex gap-x-4">
              {currentQuestion < questions.length && (
                <button type="button" className="btn-blue" onClick={handleNextQuestion}>
                  Siguiente
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default FormQuestions;
