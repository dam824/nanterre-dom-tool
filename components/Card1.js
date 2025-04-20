// components/Card1.js
import { FaUser } from 'react-icons/fa';

const Card1 = ({ title, value }) => {
  return (
    <div className="flex items-center p-4 bg-white shadow-lg rounded-lg border-l-4 border-[var(--main-color)]">
      <div className="w-14 h-14 flex items-center justify-center bg-[var(--main-color)] text-white rounded-full shadow-md shadow-red-500/40 mr-3">
        <FaUser size={24} />
      </div>
      <div>
        <h2 className="text-lg font-bold text-gray-900">{value}</h2>
        <p className="text-sm text-gray-400">{title}</p>
      </div>
    </div>
  );
};

export default Card1;
