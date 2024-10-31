import { useCallback, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useFetchParticipants from '../../utilities/useFetchParticipants';
import { ArrowLeft } from 'lucide-react';

const ExpensesForm = ({ onBack, itineraryId, onClose }) => {
  const [date, setDate] = useState(new Date());
  const onDateChangeHandler = useCallback((date) => setDate(date), [date]);
  const [distributionType, setDistributionType] = useState('equivalente');
  const [payerId, setPayerId] = useState('');
  const [description, setDescription] = useState(''); 
  const { usersOldNav } = useFetchParticipants(itineraryId);
  const [individualAmounts, setIndividualAmounts] = useState({});
  const [individualPercentages, setIndividualPercentages] = useState({});
  const [participatingUsers, setParticipatingUsers] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState('');

  const handleDistributionChange = (e) => {
    setDistributionType(e.target.value);
  };

  const handlePayerChange = (e) => {
    setPayerId(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTotalAmountChange = (e) => {
    setTotalAmount(e.target.value);
  };
  const handleIndividualAmountChange = (userId, value) => {
    console.log("Cambio de monto para el usuario:", userId, "Nuevo valor:", value); // Para depuración

    setIndividualAmounts((prev) => ({
      ...prev,
      [userId]: Number(value),
    }));
  };

  const handleIndividualPercentageChange = (userId, value) => {
    setIndividualPercentages((prev) => ({
      ...prev,
      [userId]: Number(value),
    }));
  };

  const toggleParticipatingUser = (id) => {
    setParticipatingUsers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const calculateEquivalentAmount = () => {
    const selectedUsers = usersOldNav.filter((user) => participatingUsers[user.id]);
    return selectedUsers.length > 0 ? (totalAmount / selectedUsers.length).toFixed(2) : 0;
  };

  const equivalentAmount = calculateEquivalentAmount();
  const validateAmounts = () => {
    if (distributionType == 'montos') {
      const totalIndividualAmounts = Object.keys(individualAmounts)
        .filter((userId) => participatingUsers[userId])
        .reduce((sum, userId) => sum + (individualAmounts[userId] || 0), 0);
      console.log(totalIndividualAmounts, totalAmount);
      return totalIndividualAmounts == totalAmount;
    }

    if (distributionType == 'porcentajes') {
      const totalIndividualPercentages = Object.keys(individualPercentages)
        .filter((userId) => participatingUsers[userId])
        .reduce((sum, userId) => sum + (individualPercentages[userId] || 0), 0);
      return totalIndividualPercentages == 100;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    setError(null);
    setValidationError('');
    if (!validateAmounts()) {
      setValidationError(`La suma de los ${distributionType} no coincide con el monto total.`);
      setLoading(false);
      return;
    }
    const expenseData = {
      description, 
      date,
      payerId,
      participatingUsers: Object.keys(participatingUsers).filter(
        (userId) => participatingUsers[userId],
      ),
      totalAmount,
      distributionType,
      individualAmounts,
      individualPercentages,
      itineraryId: itineraryId,
    };
    try {
      const response = await fetch('https://api-turistear.koyeb.app/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseData),
      });

      console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al guardar el gasto');
      }

      const result = await response.json();
      console.log('Gasto guardado:', result);

      setDate(new Date());
      setDescription(''); 
      setPayerId('');
      setParticipatingUsers({});
      setTotalAmount(0);
      setDistributionType('equivalente');
      setIndividualAmounts({});
      setIndividualPercentages({});
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     <div className="bg-white p-6 rounded-sm shadow-lg max-w-lg mx-auto">
     <ArrowLeft onClick={onClose} className='cursor-pointer'/>
      <h3 className="font-bold text-3xl lead-10 text-black mb-9">
        Agregar Nuevo Gasto
      </h3>
      <form>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-2">Descripción</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Ejemplo: Cena en restaurante"
            value={description} 
            onChange={handleDescriptionChange} 
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-2">Fecha del Gasto</label>
          <DatePicker
            placeholderText="Select date"
            selected={date}
            onChange={onDateChangeHandler}
            showIcon
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-2">Usuario que paga</label>
          <select
            value={payerId}
            onChange={handlePayerChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Selecciona el pagador</option>
            {usersOldNav.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-2">Usuarios que participan</label>
          {usersOldNav.map((user) => (
            <div key={user.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                onChange={() => toggleParticipatingUser(user.id)}
                className="mr-2"
              />
              <span className="text-gray-600">{user.name}</span>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-2">Monto Total</label>
          <input
            type="number"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Ejemplo: 100"
            value={totalAmount}
            onChange={handleTotalAmountChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-gray-700 mb-2">Tipo de Distribución</label>
          <select
            value={distributionType}
            onChange={handleDistributionChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="equivalente">Equivalente</option>
            <option value="montos">Por Montos Exactos</option>
            <option value="porcentajes">Porcentajes</option>
          </select>
        </div>

        {distributionType === 'equivalente' && (
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Monto Equivalente por Persona
            </label>
            {usersOldNav.map(
              (user) =>
                participatingUsers[user.id] && (
                  <div key={user.id} className="flex items-center mb-2">
                    <span className="w-1/2 text-gray-600">{user.name}</span>
                    <span className="w-1/2 text-gray-600">${equivalentAmount}</span>
                  </div>
                ),
            )}
          </div>
        )}

        {distributionType === 'montos' && (
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">Montos Individuales</label>
            {usersOldNav.map(
              (user) =>
                participatingUsers[user.id] && (
                  <div key={user.id} className="flex items-center mb-2">
                    <span className="w-1/2 text-gray-600">{user.name}</span>
                    <input
                      type="number"
                      className="w-1/2 px-4 py-2 border rounded-lg"
                      placeholder="Monto"
                      value={individualAmounts[user.id] || ''}
                      onChange={(e) => handleIndividualAmountChange(user.id, e.target.value)}
                    />
                  </div>
                ),
            )}
          </div>
        )}

        {distributionType === 'porcentajes' && (
          <div className="mb-4">
            <label className="block font-semibold text-gray-700 mb-2">
              Porcentajes Individuales
            </label>
            {usersOldNav.map(
              (user) =>
                participatingUsers[user.id] && (
                  <div key={user.id} className="flex items-center mb-2">
                    <span className="w-1/2 text-gray-600">{user.name}</span>
                    <input
                      type="number"
                      className="w-1/2 px-4 py-2 border rounded-lg"
                      placeholder="Porcentaje"
                      value={individualPercentages[user.id] || ''}
                      onChange={(e) => handleIndividualPercentageChange(user.id, e.target.value)}
                    />
                  </div>
                ),
            )}
          </div>
        )}

        {validationError && <div className="mb-4 text-[#ff0000]">{validationError}</div>}

        <button
          type="button"
          className="px-6 py-2 rounded-lg bg-primary text-white font-semibold hover:shadow-primary hover:bg-slate-50 hover:text-black hover:border hover:border-primary shadow-sm"
          onClick={onBack}
        >
          Volver
        </button>
        <button
          onClick={handleSubmit}
          type="submit"
          className="ml-4 px-6 py-2 rounded-lg bg-orange text-white font-semibold hover:shadow-orange hover:bg-slate-50 hover:text-black hover:border hover:border-orange shadow-sm"
        >
          Guardar Gasto
        </button>
      </form>
    </div>
    </>
   
  );
};

export default ExpensesForm;