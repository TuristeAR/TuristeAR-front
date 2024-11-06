import React from 'react';

const ExpenseSummaryTable = ({ expense }) => {
  const totalAmount = expense.totalAmount; // Monto total del gasto
  const participatingUsers = expense.participatingUsers; // Usuarios que participan en el gasto

  const calculatePaidAmount = (userId) => {

    return userId === expense.payer.id ? totalAmount as number: 0;
  };

  const calculateOwedAmount = () => {
    return (totalAmount as number / participatingUsers.length).toFixed(2); 
  };

  const calculateBalance = (userId) => {
    const paid = calculatePaidAmount(userId);
    const owed = calculateOwedAmount();
    return (paid - parseFloat(owed)).toFixed(2); // Saldo = Pagado - Debe
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
          <th className="px-2 py-2 text-left border-b">Usuarios</th>
            <th className="px-2 py-2 text-left border-b">Pagado</th>
            <th className="px-2 py-2 text-left border-b">Debe</th>
            <th className="px-2 py-2 text-left border-b">Saldo</th>
          </tr>
        </thead>
        <tbody>
          {participatingUsers.map((user) => {
            const owedAmount = calculateOwedAmount();
            return (<tr key={user.id} className="hover:bg-gray-100">
              <td className="px-2 py-2 border-b">
                <div className="flex items-center flex-wrap">
                  <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center mr-1">
                    <img src={user.profilePicture} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                  <span>{user.name}</span>
                </div>
              </td>
              <td className="px-2 py-2 border-b">
                {calculatePaidAmount(user.id).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
              </td>
              <td className="px-2 py-2 border-b">
                {owedAmount.toLocaleString()}
              </td>
              <td className="px-2 py-2 border-b">
                {calculateBalance(user.id).toLocaleString()}
              </td>
            </tr>)
})}
        </tbody>
      </table>
    </div>
  );
};

// Ejemplo de uso del componente
const App = () => {
  const expense = {
    id: 46,
    createdAt: "2024-11-05T01:07:53.344Z",
    description: "kk",
    date: "2024-11-01T01:07:24.000Z",
    totalAmount: 12312, // Monto total
    distributionType: "equivalente",
    individualAmounts: {},
    individualPercentages: {},
    payer: {
      id: 8,
      email: "biez591@gmail.com",
      name: "Domingo Medina",
      profilePicture: "https://lh3.googleusercontent.com/a/ACg8ocLQOr2f6oBPqeis1Y5KMVyj7gzMbV4YiAvpFPCLDOwpwFjwPA=s96-c",
      description: "🗺️ | Encontrando tesoros en las grandes ciudades",
      location: "Buenos Aires",
    },
    participatingUsers: [
      {
        id: 8,
        email: "biez591@gmail.com",
        name: "Domingo Medina",
        profilePicture: "https://lh3.googleusercontent.com/a/ACg8ocLQOr2f6oBPqeis1Y5KMVyj7gzMbV4YiAvpFPCLDOwpwFjwPA=s96-c",
      },
      {
        id: 9,
        email: "user@example.com",
        name: "Usuario Ejemplo",
        profilePicture: "https://example.com/profile.jpg",
      }
    ],
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Resumen de Gastos</h1>
      <ExpenseSummaryTable expense={expense} />
    </div>
  );
};

export default ExpenseSummaryTable;
