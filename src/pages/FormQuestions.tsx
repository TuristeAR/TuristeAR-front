import { Header } from '../components/Header';
import Question from '../components/Questions';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    question: '¿Cuál es tu presupuesto aproximado para el viaje?',
    options: ['Menos de $150000', '$150000 - $250000', 'Más de $250000'],
  },
  {
    question: '¿Qué tipo de clima prefieres?',
    options: ['Frío', 'Cálido', 'Templado', 'Lluvioso'],
  },
  {
    question: '¿Qué tipo de actividades te interesan más?',
    options: ['Playa', 'Montaña', 'Turismo urbano', 'Aventuras al aire libre', 'Cultura'],
  },
  {
    question: '¿Viajas solo, en pareja, en familia o con amigos?',
    options: ['Solo', 'En pareja', 'En familia', 'Con amigos'],
  },
  {
    question: '¿Qué nivel de comodidad buscas?',
    options: ['Lujo', 'Económico', 'Moderado'],
  },
];

const FormQuestions = () => {
  const navigate = useNavigate();

  const onsubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    navigate('/calendar');
  };

  return (
    <>
      <Header containerStyles={'bg-primary relative top-0 z-[60] '} />
      <section className="h-auto my-5   text-black">
        <div className="container mx-auto shadow-2xl flex  items-center justify-center z-30 relative">
          {/* Form */}
          <form
            onSubmit={onsubmit}
            action=""
            className="flex flex-col w-full justify-center items-center bg-white overflow-y-hidden p-4  shadow-2xl rounded-lg md:rounded"
          >
            {questions.map((q, index) => (
              <Question key={index} question={q} />
            ))}
            <button className="btn-blue">Continuar</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default FormQuestions;
