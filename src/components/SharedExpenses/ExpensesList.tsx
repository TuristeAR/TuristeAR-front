import { useEffect, useState } from 'react';
import useFetchParticipants from '../../utilities/useFetchParticipants';
import ExpenseDetail from './ExpenseDetail';

import { CalendarRange, CircleDollarSign, CircleX, Edit2Icon, Hash, Plus, Receipt } from 'lucide-react';
import ExpenseEditForm from './ExpenseEditForm';

type Expense = {
  id: number;
  description: string;
  totalAmount: number;
  date: Date;
  payer: User;
  itineraryId: number;
};
type User = {
  id: number;
  name: string;
  profilePicture: string;
};

const ExpensesList = ({ onAddExpense, itineraryId, itineraryName }) => {
  const [groupedExpenses, setGroupedExpenses] = useState<{ [date: string]: Expense[] }>({});
  const { usersOldNav } = useFetchParticipants(itineraryId);
  const [selectedExpenseId, setSelectedExpenseId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [expense, setExpense] = useState<Expense>();
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [firstPurchaseDate, setFirstPurchaseDate] = useState<string | null>(null);
  const [lastPurchaseDate, setLastPurchaseDate] = useState<string | null>(null);

  const handleOpenModal = (expenseId: number) => {
    if (selectedExpenseId === expenseId) {
      setSelectedExpenseId(null);
    } else {
      setSelectedExpenseId(expenseId);
    }
  };

  const handleCloseModal = () => {
    setSelectedExpenseId(null);
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(
          `https://api-turistear.koyeb.app/expenses/${itineraryId as number}`,
        );
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
        const totalExpenses = data.reduce((sum, expense) => sum + expense.totalAmount, 0);
        setTotalAmount(totalExpenses as number);

        const dates = data.map((expense) => new Date(expense.date));
        if (dates.length > 0) {
          const earliestDate = new Date(Math.min(...dates.map((date) => date.getTime())));
          const latestDate = new Date(Math.max(...dates.map((date) => date.getTime())));
          setFirstPurchaseDate(earliestDate.toLocaleDateString('es-ES'));
          setLastPurchaseDate(latestDate.toLocaleDateString('es-ES'));
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchExpenses();
  }, [showForm, itineraryId]);

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
        const newTotalAmount = Object.values(updatedExpenses)
          .flat()
          .reduce((sum, expense) => sum + expense.totalAmount, 0);
        setTotalAmount(newTotalAmount as number);
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

  const totalPurchases = Object.values(groupedExpenses).flat().length;
  return (
    <>
      {showForm ? (
        <ExpenseEditForm
          expense={expense}
          onBack={() => setShowForm(false)}
          itineraryId={itineraryId}
        />
      ) : (
        <div className=" w-full mx-auto bg-[ #F9FAFf]">
          <h2 className="font-bold text-3xl lead-10 text-black mb-9">
            Gastos Compartidos - {itineraryName}
          </h2>
          <div className="flex mb-4 flex-row gap-1">
            <button
              onClick={onAddExpense}
              className="rounded-xl flex px-7 py-3 bg-primary text-white hover:text-black border border-primary font-semibold text-lg shadow-sm shadow-transparent transition-all duration-500 hover:shadow-primary hover:bg-slate-50"
            >
              <Plus className="my-auto" />
              Añadir Gasto
            </button>
          </div>
          {Object.keys(groupedExpenses).length > 0 && (
            <div className="text-center text-xl mt-6 flex flex-col sm:flex-row justify-around  h-max">
              <div className="my-1 w-62">
              <CircleDollarSign className='mx-auto' color='#616161'/>
                <p className="text-lg text-[#616161]">Total de Gastos</p>
                <span className="font-semibold text-2xl">${totalAmount}</span>
              </div>
              <div className='my-1 w-62'>
              <Hash className='mx-auto' color='#616161'/>
              <p className="text-lg text-[#616161]">Cantidad de Gastos</p>
                <span className="font-semibold text-2xl">{totalPurchases}</span>
              </div>
              <div className="my-1 w-62">
              <CalendarRange className='mx-auto' color='#616161'/>
                <p className="text-lg text-[#616161]">Rango de Fechas</p>
                <span className="font-semibold text-2xl">
                  {firstPurchaseDate} a {lastPurchaseDate}
                </span>
              </div>
            </div>
          )}
          {/*   {showGraphs && (
            <div className="w-3/4">
              <ExpensesGraph groupedExpenses={groupedExpenses}></ExpensesGraph>
            </div>
          )} */}
          {Object.keys(groupedExpenses).length === 0 ? (
            <div className="text-center text-lg text-gray-500">
              No hay gastos registrados para este itinerario.
            </div>
          ) : (
            Object.keys(groupedExpenses).map((date) => (
              <div key={date} className="mt-4">
                <details
                  key={date}
                  className="flex flex-col gap-6 p-4 bg-white rounded-lg shadow-md"
                >
                  <summary className="text-2xl font-semibold text-primary-3 cursor-pointer hover:text-primary-4">
                    {date}
                  </summary>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
                    {groupedExpenses[date].map((expense: Expense) => {
                      const payer: User | undefined = usersOldNav.find(
                        (user) => user.id === expense.payer.id,
                      );
                      const isSelected = selectedExpenseId === expense.id;

                      return (
                        <div className="max-w-xxl" key={expense.id}>
                          <div
                            onClick={() => handleOpenModal(expense.id)}
                            className="flex justify-between p-2 rounded-xl bg-slate-50 m cursor-pointer transition-all duration-500 hover:bg-gray-50"
                          >
                            <div className="flex gap-1">
                              <Receipt size={60} className="stroke-primary" />

                              <div className="flex h-full px-1 flex-col items-start">
                                <h5 className="font-semibold sm:text-xl leading-9 text-black mb-1">
                                  {expense.description}
                                </h5>
                                <p className="text-sm">
                                  {new Date(expense.date).toLocaleTimeString()} hs
                                </p>

                                <p className="text-sm text-gray-600 flex gap-1 flex-wrap">
                                  <span>Pagado por </span>
                                  <span className="flex gap-1">
                                    <span className="w-5 h-5 rounded-full flex overflow-hidden items-center justify-center">
                                      <img
                                        src={expense.payer.profilePicture}
                                        className="w-full object-cover"
                                      />{' '}
                                    </span>

                                    <span className="font-bold">{expense.payer.name}</span>
                                    <span>{payer ? '' : '(Salio del viaje)'}</span>
                                  </span>
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
                                size={25}
                                className="stroke-primary-3 hover:stroke-primary"
                              />
                              <CircleX
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteExpense(expense.id);
                                }}
                                size={25}
                                className="stroke-[#ba0000] hover:stroke-[#f00]"
                              />
                            </div>
                          </div>

                          {isSelected && (
                            <ExpenseDetail expense={expense} onClose={handleCloseModal} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </details>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default ExpensesList;
