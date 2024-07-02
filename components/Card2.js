// /components/Card2.js
import { useEffect, useState } from 'react';

const Card2 = () => {
  const [balance, setBalance] = useState(null);
  const [unit, setUnit] = useState('');

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await fetch('/api/octopush/check-balance');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log('API response data:', data); // Log API response data
        setBalance(data.amount);
        setUnit(data.unit);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-white shadow-lg rounded-lg p-4 border border-gray-200">
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-[#F44336]">
        Montant restants 
      </h2>
      <p className="text-xl text-gray-700">
        {balance !== null ? `${balance} ${unit}` : 'Chargement...'}
      </p>
    </div>
  );
};

export default Card2;
