// components/Card3.js
const Card3 = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-white shadow-lg rounded-lg p-4 border border-gray-200">
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-[#F44336]">
        Messages envoyés :
      </h2>
      <p className="text-xl text-gray-700">
        323
      </p>
    </div>
  );
};

export default Card3;
