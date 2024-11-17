import { useEffect, useState } from 'react';

const SettleDebt = ({ itineraryId }: { itineraryId: number }) => {
  const [debts, setDebts] = useState<{ totalDebt: number; totalPaid: number; debtsByPayer: any[] }>(
    {
      totalDebt: 0,
      totalPaid: 0,
      debtsByPayer: [],
    },
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchDebts = async () => {
      try {
        const response = await fetch(
          `https://api-turistear.koyeb.app/expenses/debt/payer/itinerary/${itineraryId}`,
          {
            credentials: 'include',
          },
        );
        const data = await response.json();
        setDebts(data);
      } catch (error) {
        console.error('Error fetching debts:', error);
      }
    };

    fetchDebts();
  }, [itineraryId]);

  const handlePayment = async (userId: number, itineraryId: number) => {
    if (isProcessing[userId]) return;

    setIsProcessing((prev) => ({ ...prev, [userId]: true }));
    try {
      const response = await fetch(`https://api-turistear.koyeb.app/expenses/settle`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          itineraryId,
        }),
      });

      if (!response.ok) {
        throw new Error('Error processing payment');
      }

      setDebts((prevState) => ({
        ...prevState,
        totalDebt:
          prevState.totalDebt -
            prevState.debtsByPayer.find((debt) => debt.payerId === userId)?.amount || 0,
        debtsByPayer: prevState.debtsByPayer.map((debt) => {
          if (debt.payerId === userId) {
            return {
              ...debt,
              amount: debt.amount - debt.amount,
              paid: debt.paid + debt.amount,
            };
          }
          return debt;
        }),
        totalPaid: prevState.totalPaid + prevState.debtsByPayer.find((debt) => debt.payerId === userId)?.amount || 0
        
      }));

      setSuccessMessage('¡Deuda saldada correctamente!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Error processing payment:', error);
    } finally {
      setIsProcessing((prev) => ({ ...prev, [userId]: false }));
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto my-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-primary-3">
        Deudas de los participantes hacia vos
      </h1>

      {/* Mensaje de éxito */}
      {successMessage && <div className="text-green-500 text-center mb-4">{successMessage}</div>}

      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Total de Deuda: ${debts.totalDebt}
        </h3>
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Total de Deuda Saldada: ${debts.totalPaid}
        </h3>
      </div>
      <ul className="space-y-4">
        {debts.debtsByPayer.map((debt) => (
          <li key={debt.payerId}>
            <div className="flex justify-between">
              <div className="flex items-center p-4 bg-gray-100 rounded-lg">
                <img
                  src={debt.profilePicture}
                  alt={debt.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-800">{debt.name}</span>
                    <span className="text-lg text-[#f00] font-semibold">Debe ${debt.amount}</span>
                    <span className="text-lg text-[#178917] font-semibold">
                      Saldado ${debt.paid}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <button
                  className={`my-auto btn-blue h-10 ${isProcessing[debt.payerId] ? 'opacity-50' : ''}`}
                  onClick={() => handlePayment(debt.payerId, itineraryId)}
                  disabled={isProcessing[debt.payerId]}
                  >
                  {isProcessing[debt.payerId] ? 'Procesando...' : 'Saldar deuda'}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettleDebt;
