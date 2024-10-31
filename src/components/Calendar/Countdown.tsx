import { useState, useEffect } from 'react';

interface CountdownProps {
  fromDate: string;
}

export const Countdown: React.FC<CountdownProps> = ({ fromDate }) => {
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const startDate = new Date(fromDate).getTime();
      const difference = startDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeRemaining('¡Tu viaje ya comenzó!');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining(`${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos`);
    }, 1000);

    return () => clearInterval(interval);
  }, [fromDate]);

  return (
    <div className="my-4 p-4 bg-white shadow-md rounded-lg text-center">
      <p className="text-md font-semibold text-primary-3">Cuenta regresiva:</p>
      <p className="text-xl font-bold text-primary"> {timeRemaining}</p>
    </div>
  );
};
