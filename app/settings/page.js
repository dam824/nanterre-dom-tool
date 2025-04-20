'use client';

 
import Sidebar from '../../components/Sidebar';
import { useTheme } from '../context/ThemeContext';

const predefinedColors = [
  '#f44336d4', // rouge
  '#3f51b5',   // bleu
  '#4caf50',   // vert
  '#ff9800',   // orange
  '#9c27b0',   // violet
  '#000000',   // noir
];


const Settings = () => {
  const { themeColor, setThemeColor } = useTheme();
 return (
  <div className="flex h-screen">
    <Sidebar />
    <div className="flex-1 p-4 sm:ml-64 flex flex-col bg-gray-50 shadow-md">
      <div className="p-4 border-2 border-gray-200 mt-14 flex flex-col flex-1 rounded-2xl bg-white">
        <h2 className="text-2xl font-bold mb-4 text-black">Paramètres</h2>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full bg-white p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">🎨 Thème</h3>
          <div className="flex flex-wrap gap-4">
            {predefinedColors.map((color) => (
              <button
                key={color}
                className={`w-10 h-10 rounded-full border-2 transition duration-200 ${
                  themeColor === color
                    ? 'border-black ring-2 ring-offset-2 ring-black'
                    : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setThemeColor(color)}
                title={color}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-4">
            La couleur sélectionnée sera utilisée comme couleur principale .
          </p>
        </div>
      </div>
    </div>
  </div>
);
}

export default Settings