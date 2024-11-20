import React, { useState, useEffect } from 'react';

export const getUserDebt = async (itineraryId) => {
  try {
    const response = await fetch(
      `${process.env.VITE_API_URL}/expenses/debt/user/itinerary/${itineraryId}`,
      {
        method: 'GET',
        credentials: 'include',
      },
    );
    if (!response.ok) {
      throw new Error(`Error fetching user debt: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching user debt:', error);
    throw error;
  }
};

export const settleUserDebt = async (amount) => {
  try {
    const response = await fetch(`${process.env.VITE_API_URL}/expenses/settle`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });
    if (!response.ok) {
      throw new Error(`Error settling debt: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error settling debt:', error);
    throw error;
  }
};

const UserDebt = ({ itineraryId }) => {
  const [debt, setDebt] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  console.log(itineraryId);

  useEffect(() => {
    const fetchDebt = async () => {
      try {
        const userDebt = await getUserDebt(itineraryId);
        setDebt(userDebt);
      } catch (error) {
        setMessage('Error al obtener la deuda');
      } finally {
        setLoading(false);
      }
    };
    fetchDebt();
  }, []);

  if (loading) return <p></p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto my-4">
      <h2 className="text-2xl font-bold mb-4 text-center text-primary-3">
      Tus deudas con los participantes
      </h2>
      <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Total de Deuda: ${debt.totalDebt}
        </h3>
      <div className="space-y-4">
        {debt.debtsByPayer.map((payer) => (
          <div key={payer.payerId} className="flex items-center p-4 bg-gray-100 rounded-lg">
            <img
              src={payer.profilePicture}
              alt={payer.name}
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div className="flex flex-col">
              <span className="text-lg font-medium text-gray-800">{payer.name}</span>
              <span className="text-lg text-primary-3 font-semibold">${payer.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDebt;
