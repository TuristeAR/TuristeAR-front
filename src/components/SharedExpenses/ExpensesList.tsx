import { useEffect, useState } from 'react';
import useFetchParticipants from '../../utilities/useFetchParticipants';
import ExpenseDetail from './ExpenseDetail';

import { ArrowLeft, CircleX, Edit2Icon, Receipt } from 'lucide-react';
import ExpenseEditForm from './ExpenseEditForm';

type Expense = {
  id: number;
  description: string;
  totalAmount: number;
  date: string;
  payer: User;
  itineraryId: number;
};
type User = {
  id: number;
  name: string;
  profilePicture: string;
};

const ExpensesList = ({ onAddExpense, itineraryId, itineraryName, onClose }) => {
  const [groupedExpenses, setGroupedExpenses] = useState({});
  const { usersOldNav } = useFetchParticipants(497);
  const [selectedExpenseId, setSelectedExpenseId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [expense, setExpense] = useState(false);

  const handleOpenModal = (expenseId: number) => {
    setSelectedExpenseId(expenseId);
  };

  const handleCloseModal = () => {
    setSelectedExpenseId(null);
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(`https://api-turistear.koyeb.app/expenses/${itineraryId as number}`);
        if (!response.ok) {
          throw new Error('Error al obtener los gastos');
        }

        const data = await response.json();

        const groupedByDate = data.reduce((acc, expense) => {
          const date = new Date(expense.date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(expense);

          return acc;
        }, {});

        setGroupedExpenses(groupedByDate);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchExpenses();
  }, [itineraryId]);

  const handleDeleteExpense = async (expenseId: number) => {
    try {
      const response = await fetch(`https://api-turistear.koyeb.app/expenses/${expenseId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el gasto');
      }

      setGroupedExpenses((prevGroupedExpenses) => {
        const updatedExpenses = { ...prevGroupedExpenses };
        Object.keys(updatedExpenses).forEach((date) => {
          updatedExpenses[date] = updatedExpenses[date].filter(
            (expense: Expense) => expense.id !== expenseId,
          );
          if (updatedExpenses[date].length === 0) {
            delete updatedExpenses[date];
          }
        });
        return updatedExpenses;
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEditExpense = async (expense) => {
    setExpense(expense);
    setShowForm(true);
  };

  return (
    <>
      {showForm ? (
        <ExpenseEditForm
          expense={expense}
          onBack={() => setShowForm(false)}
          itineraryId={itineraryId}
          onClose={onClose}
        />
      ) : (
        <div className="bg-white p-6 rounded-sm shadow-lg max-w-lg mx-auto">
               <ArrowLeft onClick={onClose} className='cursor-pointer'/>

          <h2 className="font-bold text-3xl lead-10 text-black mb-9">
            Gastos Compartidos - {itineraryName}
          </h2>

          <div className="flex mb-4 flex-row ">
            <button
              onClick={onAddExpense}
              className="rounded-xl px-7 py-3 bg-primary text-white hover:text-black border border-primary font-semibold text-lg shadow-sm shadow-transparent transition-all duration-500 hover:shadow-primary hover:bg-slate-50"
            >
              Añadir Gasto
            </button>
          </div>

          {Object.keys(groupedExpenses).map((date) => (
            <div key={date} className="mt-4">
              <h2 className="text-2xl font-semibold mb-3">{date}</h2>
              {groupedExpenses[date].map((expense: Expense) => {
                const payer: User | undefined = usersOldNav.find(
                  (user) => user.id === expense.payer.id,
                );
                const isSelected = selectedExpenseId === expense.id;

                return (
                  <div key={expense.id}>
                    <div
                      onClick={() => handleOpenModal(expense.id)}
                      className="flex justify-between p-2 rounded-xl bg-slate-50 m cursor-pointer transition-all duration-500 hover:bg-gray-50"
                    >
                      <div className="flex gap-1">
                        <Receipt className='w-[3rem]'/>

                        <div className="flex h-full px-1 flex-col items-start">
                          <h5 className="font-semibold sm:text-2xl leading-9 text-black mb-1">
                            {expense.description}
                          </h5>
                          <p className="text-base leading-7 text-gray-600">
                            Pagado por{' '}
                            {payer && payer.profilePicture && (
                              <img
                                src={payer.profilePicture}
                                className="w-5 rounded-full inline-flex"
                              />
                            )}
                            <span className="font-bold">{payer ? payer.name : 'Desconocido'}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <p className="font-semibold text-2xl leading-8 text-black">
                          ${expense.totalAmount}
                        </p>
                      </div>
                      <div className=" flex flex-col justify-between ml-2">
                        <Edit2Icon
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditExpense(expense);
                          }}
                          size={30}
                          className="stroke-primary-3 hover:stroke-primary"
                        />
                        <CircleX
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteExpense(expense.id);
                          }}
                          size={30}
                          className="stroke-[#ba0000] hover:stroke-[#f00]"
                        />
                      </div>
                    </div>

                    {isSelected && <ExpenseDetail expense={expense} onClose={handleCloseModal} />}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ExpensesList;
