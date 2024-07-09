 
import { useEffect, useState } from 'react';
import { FaMoneyBillWave } from 'react-icons/fa';

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
    <div className="flex items-center p-4 bg-white shadow-lg rounded-lg border-l-4 border-[#F44336]">
      <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-tr from-[#F44336] to-red-400 text-white rounded-full shadow-md shadow-red-500/40 mr-3">
        <FaMoneyBillWave size={24} />
      </div>
      <div>
        <h2 className="text-lg font-bold text-gray-900">
          {balance !== null ? `${balance} ${unit}` : 'Chargement...'}
        </h2>
        <p className="text-sm text-gray-400">Montant restants</p>
      </div>
    </div>
  );
};

export default Card2;
