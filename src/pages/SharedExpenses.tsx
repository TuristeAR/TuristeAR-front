import { useState } from 'react';
import ExpensesList from '../components/SharedExpenses/ExpensesList';
import ExpenseForm from '../components/SharedExpenses/ExpenseForm';
import { Link, useParams } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import useFetchItinerary from '../utilities/useFetchItinerary';
import UserDebt from '../components/SharedExpenses/UserDebt';
import { Plus } from 'lucide-react';
import SettleDebt from '../components/SharedExpenses/SettleDebt';

const SharedExpenses = () => {
  const { itineraryId } = useParams();
  const { itinerary } = useFetchItinerary(itineraryId || null);
  const [showForm, setShowForm] = useState(false);
  const [showDebts, setShowDebts] = useState(false);
  const [showList, setShowList] = useState(true);
  const [showSettle, setShowSettle] = useState(false); 

  const handleShowDebts = () => {
    setShowDebts(true);
    setShowForm(false);
    setShowList(false);
    setShowSettle(false);
  };

  const handleShowList = () => {
    setShowList(true);
    setShowForm(false);
    setShowDebts(false);
    setShowSettle(false);
  };

  const handleShowSettle = () => {
    setShowSettle(true);  
    setShowForm(false);
    setShowDebts(false);
    setShowList(false);   
  };

  return (
    <>
      <Header />
      <div className="border-b p-4 mb-4 border-gray-50 flex items-center">
        <Link to={`/itinerario/calendario/${itineraryId}`} className="md:mr-10">
          <img src={'/assets/arrow-prev.svg'} alt={'Regresar'} className={'w-[50px]'} />
        </Link>
        <h2 className="text-2xl font-bold text-primary-3">{itinerary?.name}</h2>
      </div>
      <div className="py-4 flex items-center">
        <h2 className="font-bold text-3xl lead-10 text-black px-4 ">
          Gastos Compartidos - {itinerary?.name}
        </h2>
      </div>
      
     
      
      <div className="flex mb-4 flex-row gap-1 px-4">
        <button
          onClick={handleShowList}
          className={`rounded-xl flex px-7 py-3 border border-primary font-semibold text-lg shadow-sm shadow-transparent transition-all duration-500 hover:shadow-primary hover:bg-[#d3e6fb] hover:text-black ${
            !showList ? 'bg-primary text-white' : 'shadow-primary bg-slate-50 text-black'
          }`}
        >
          Lista de Gastos
        </button>
        <button
          onClick={handleShowDebts}
          className={`rounded-xl flex px-7 py-3 border border-primary font-semibold text-lg shadow-sm shadow-transparent transition-all duration-500 hover:shadow-primary hover:bg-[#d3e6fb] hover:text-black ${
            !showDebts ? 'bg-primary text-white' : 'shadow-primary bg-slate-50 text-black'
          }`}
        >
          Tus Deudas
        </button>
        <button
          onClick={handleShowSettle}
          className={`rounded-xl flex px-7 py-3 border border-primary font-semibold text-lg shadow-sm shadow-transparent transition-all duration-500 hover:shadow-primary hover:bg-[#d3e6fb] hover:text-black ${
            !showSettle ? 'bg-primary text-white' : 'shadow-primary bg-slate-50 text-black'
          }`}
        >
          Saldar Deuda
        </button>
      </div>

      {showList && (
        <section className="mb-2 p-2 sm:p-8">
          <ExpensesList itineraryId={itineraryId} />
        </section>
      )}
      {showDebts && <UserDebt itineraryId={itineraryId} />}
      {showForm && <ExpenseForm onBack={() => setShowForm(false)} itineraryId={itineraryId} />}
      
      <div
        onClick={() => {
          setShowForm(true);
        }}
        className="rounded-full fixed bottom-4 right-4 bg-[#49a2ec] active:bg-[#2a6f9e] hover:bg-[#388cd4] flex flex-col justify-evenly z-[80]"
      >
        <Plus className="my-auto mx-auto lg:w-[55px] lg:h-[55px] w-[45px] h-[45px] lg:m-6 m-3" color="#fff" />
      </div>
      {showSettle && <SettleDebt itineraryId={Number(itineraryId)} />}
    </>
  );
};

export default SharedExpenses;
