import { useState } from 'react';
import ExpensesList from '../components/SharedExpenses/ExpensesList';
import ExpenseForm from '../components/SharedExpenses/ExpenseForm';

const SharedExpenses = ({ itineraryId, itineraryName, onClose }) => {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"></div>
      <section className="py-24 fixed h-screen z-50 top-0 left-0 right-0 overflow-y-auto">
        {showForm ? (
          <ExpenseForm
            onClose={onClose}
            onBack={() => setShowForm(false)}
            itineraryId={itineraryId}
          />
        ) : (
          <ExpensesList
            onClose={onClose}
            itineraryName={itineraryName}
            onAddExpense={() => setShowForm(true)}
            itineraryId={itineraryId}
          />
        )}
      </section>
    </>
  );
};
export default SharedExpenses;
