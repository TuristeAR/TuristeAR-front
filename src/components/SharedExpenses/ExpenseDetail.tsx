import { Receipt } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ImageGallery } from '../ImageGallery/ImageGallery';

const ExpenseDetail = ({ expense, onClose }) => {
  const [distributionDescription, setDistributionDescription] = useState('');

  const {
    distributionType,
    totalAmount,
    participatingUsers,
    individualAmounts,
    individualPercentages,
  } = expense;

  useEffect(() => {
    if (distributionType === 'equivalente') {
      setDistributionDescription('Montos Iguales');
    } else if (distributionType === 'montos') {
      setDistributionDescription('Montos Individuales');
    } else if (distributionType === 'porcentajes') {
      setDistributionDescription('Distribución por Porcentajes');
    }
  }, [distributionType]);

  const calculateAmountOwed = (participant) => {
    if (distributionType === 'equivalente') {
      const baseAmount = totalAmount / participatingUsers.length;
      const roundedAmount = Math.floor(baseAmount * 100) / 100;

      const totalDistributed = roundedAmount * (participatingUsers.length - 1);
      const remainingAmount = totalAmount - totalDistributed;
      const amountOwed =
        participant.id === participatingUsers[participatingUsers.length - 1].id
          ? remainingAmount.toFixed(2)
          : roundedAmount.toFixed(2);

      return amountOwed;
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
        <Receipt size={100} className="stroke-primary m-0" />
        <div>
          <h3 className="text-xl font-semibold">{expense.description}</h3>
          <p className="font-semibold">${expense.totalAmount}</p>
          <p className="font-semibold">
            {new Date(expense.date).toLocaleDateString()} -{' '}
            {new Date(expense.date).toLocaleTimeString()} hs
          </p>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1">
              <span>Pagado por </span>
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full flex overflow-hidden items-center justify-center">
                  <img src={expense.payer.profilePicture} className="w-full h-full object-cover" />
                </div>
                <span className="font-semibold ">{expense.payer.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-4 mt-2">
        <p className="font-semibold">{distributionDescription}</p>
        <ul>
          {expense.participatingUsers.map((participant) => (
            <li className="flex items-center gap-1 justify-between" key={participant.name}>
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 rounded-full flex overflow-hidden items-center justify-center">
                  <img src={participant.profilePicture} className="w-full h-full object-cover" />{' '}
                </div>
                <span className="font-semibold">{participant.name}</span>{' '}
              </div>

              <div className="flex gap-1">
                {participant.id === expense.payer.id ? (
                  <>
                    <p> aportó </p>
                    <span className="font-semibold text-[#24b424]">
                      ${calculateAmountOwed(participant)}
                    </span>
                  </>
                ) : (
                  <>
                    <p> debe </p>
                    <span className="font-semibold text-[#f00]">
                      ${calculateAmountOwed(participant)}
                    </span>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
        {expense.imageUrls && <ImageGallery images={expense.imageUrls}></ImageGallery>}
        {/* <ExpenseSummaryTable expense={expense}></ExpenseSummaryTable> */}
        <button className="btn-blue mt-2 mb-4" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};
export default ExpenseDetail;
