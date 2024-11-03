import { Receipt } from 'lucide-react';

const ExpenseDetail = ({ expense, onClose }) => {
  const {
    distributionType,
    totalAmount,
    participatingUsers,
    individualAmounts,
    individualPercentages,
  } = expense;

  const calculateAmountOwed = (participant) => {
    if (distributionType === 'equivalente') {
      return (totalAmount / participatingUsers.length).toFixed(2);
    } else if (distributionType === 'montos') {
      console.log(individualAmounts);
      return individualAmounts[participant.id] || 0;
    } else if (distributionType === 'porcentajes') {
      console.log(individualPercentages);
      return (
        `${((individualPercentages[participant.id] / 100) * totalAmount).toFixed(2)} %${individualPercentages[participant.id]}` ||
        0
      );
    }
  };
  return (
    <div className="border-b mb-4">
      <div className="flex">
        <Receipt size={100} className="stroke-primary" />
        <div>
          <h3 className="text-xl font-semibold">{expense.description}</h3>
          <p className="font-semibold">${expense.totalAmount}</p>
          <p className="font-semibold">{new Date(expense.date).toLocaleDateString()}</p>
          <p className="font-semibold">
            Pagado por{' '}
            <img src={expense.payer.profilePicture} className="w-5 rounded-full inline-flex" />{' '}
            {expense.payer.name}
          </p>
        </div>
      </div>
      <div className="ml-4">
        <h4>Participantes y Monto Adeudado: </h4>
        <p>Tipo de distribución: {distributionType}</p>
        <ul>
          {expense.participatingUsers.map((participant) => (
            <li key={participant.name}>
              <img src={participant.profilePicture} className="w-5 rounded-full inline-flex" />{' '}
              <span className="font-semibold">{participant.name}</span> Debe{' '}
              <span className="font-semibold">${calculateAmountOwed(participant)}</span>
            </li>
          ))}
        </ul>
        <button className="btn-blue mt-2 mb-4" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};
export default ExpenseDetail;
