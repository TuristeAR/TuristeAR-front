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
    userExpense,
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
      return individualAmounts[participant.id] || 0;
    } else if (distributionType === 'porcentajes') {
      return (
        `${((individualPercentages[participant.id] / 100) * totalAmount).toFixed(2)} %${individualPercentages[participant.id]}` ||
        0
      );
    }
  };
  return (
    <div className="border-b mb-4">
      <div className="ml-4 mt-2 flex flex-col gap-4">
        <p className="font-semibold">Tipo de distribución: {distributionDescription}</p>
        <ul>
          {expense.userExpenses.map((participant) => {
            return (
              <li className="flex items-center gap-1 justify-between" key={participant.user.name}>
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 rounded-full flex overflow-hidden items-center justify-center">
                    <img
                      src={participant.user.profilePicture}
                      className="w-full h-full object-cover"
                    />{' '}
                  </div>
                  <span className="font-semibold">{participant.user.name}</span>{' '}
                </div>

                <div className="flex gap-1">
                  {participant.isPaid ? (
                    <>
                      <p> aportó </p>
                      <span className="font-semibold text-[#24b424]">${participant.amount}</span>
                    </>
                  ) : (
                    <>
                      <p> debe </p>
                      <span className="font-semibold text-[#f00]">${participant.amount}</span>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        {expense.imageUrls && <ImageGallery images={expense.imageUrls}></ImageGallery>}
        {/* <ExpenseSummaryTable expense={expense}></ExpenseSummaryTable> */}
      </div>
    </div>
  );
};
export default ExpenseDetail;
