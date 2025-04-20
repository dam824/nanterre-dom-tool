import { FaEnvelope } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const Card3 = ({ title, value }) => {
  const [messageCount, setMessageCount] = useState(0);

  useEffect(()=> {
    const fetchMessageCount = async () => {
      try{
       
        const res = await fetch('/api/octopush/check-message', {
          cache: "no-store",
        });
        const data = await res.json();
        setMessageCount(data.totalMessagesSent || 0);
      }catch(error){
        console.error('Erreur lors de la recuperation du nombre de message', error)
      }
    };
    fetchMessageCount();

    
    
  }, [])
  return (
    <div className="flex items-center p-4 bg-white shadow-lg rounded-lg border-l-4 border-[var(--main-color)]">
      <div className="w-14 h-14 flex items-center justify-center bg-[var(--main-color)] text-white rounded-full shadow-md shadow-[var(--main-color)]/30 mr-3">
        <FaEnvelope size={24} />
      </div>
      <div>
      <h2 className="text-lg font-bold text-gray-900">{messageCount}</h2>
      <p className="text-sm text-gray-400">Messages envoyés </p>
      </div>
    </div>
  );
};

export default Card3;
