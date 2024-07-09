import { FaEnvelope } from 'react-icons/fa';

const Card3 = ({ title, value }) => {
  return (
    <div className="flex items-center p-4 bg-white shadow-lg rounded-lg border-l-4 border-[#F44336]">
      <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-tr from-[#F44336] to-red-400 text-white rounded-full shadow-md shadow-red-500/40 mr-3">
        <FaEnvelope size={24} />
      </div>
      <div>
      <h2 className="text-lg font-bold text-gray-900">3</h2>
      <p className="text-sm text-gray-400">Messages envoyes </p>
      </div>
    </div>
  );
};

export default Card3;
