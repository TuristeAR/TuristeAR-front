import { useState } from 'react';
import ExpensesList from '../components/SharedExpenses/ExpensesList';
import ExpenseForm from '../components/SharedExpenses/ExpenseForm';
import { Link, useParams } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import useFetchItinerary from '../utilities/useFetchItinerary';

const SharedExpenses = ({}) => {
  const { itineraryId } = useParams();
  const { itinerary } = useFetchItinerary(itineraryId || null);
  console.log(itinerary);
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Header></Header>
      <div className="border-b p-4 mb-4 border-gray-50 flex items-center">
        <Link to={`/itineraryCalendar/${itineraryId}`}>
          <img src={'/assets/arrow-prev.svg'} alt={'Regresar'} className={'w-[40px]'} />
        </Link>
        <h2 className="text-2xl font-bold text-primary-3">{itinerary?.name}</h2>
      </div>
      <section className="mb-2 p-2 sm:p-8">
        {showForm ? (
          <ExpenseForm onBack={() => setShowForm(false)} itineraryId={itineraryId} />
        ) : (
          <ExpensesList
            itineraryName={itinerary?.name}
            onAddExpense={() => setShowForm(true)}
            itineraryId={itineraryId}
          />
        )}
      </section>
    </>
  );
};
export default SharedExpenses;
