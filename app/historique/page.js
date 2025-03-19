'use client';
import {useEffect, useState} from 'react'
import Sidebar from '../../components/Sidebar';

const Historique = () => {
    const [history, setHistory] = useState({});
    const [clients, setClients] = useState({})

    useEffect(() => {
        const fetchHistory = async () => {
          try {
            const res = await fetch('/api/octopush/count-client-messages', {
              cache: 'no-store',
            });
            const data = await res.json();
            setHistory(data.messageCounts || {});
          } catch (error) {
            console.error("Erreur lors de la récupération de l'historique", error);
          }
        };
    
        const fetchClients = async () => {
          try {
            const res = await fetch('/api/clients/get-client', {
              cache: 'no-store',
            });
            const data = await res.json();
            // Crée un objet { clientId: nom }
            const clientMap = data.reduce((acc, client) => {
              acc[client.id] = client.society; // Associe l'ID du client à son nom
              return acc;
            }, {});
            setClients(clientMap);
          } catch (error) {
            console.error("Erreur lors de la récupération des clients", error);
          }
        };
    
        fetchHistory();
        fetchClients();
      }, []);
    return (
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 p-4 sm:ml-64 flex flex-col bg-gray-50 shadow-md">
            <div className="p-4 border-2 border-gray-200 mt-14 flex flex-col flex-1 rounded-2xl bg-white">
              <h2 className="text-2xl font-bold mb-4 text-black">Historique des SMS envoyés</h2>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full bg-white">
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="text-xs text-gray-900 uppercase bg-gray-100">
                    <tr className="bg-[#f44336d4]">
                      <th scope="col" className="px-6 py-3 text-white text-center">Nom du client</th>
                      <th scope="col" className="px-6 py-3 text-white text-center">Nombre de SMS envoyés</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(history).length > 0 ? (
                      Object.entries(history).map(([clientId, count]) => (
                        <tr key={clientId} className="bg-white border-b dark:bg-gray-100 dark:border-gray-300">
                          <td className="px-6 py-4 font-medium text-gray-900 text-center whitespace-nowrap">
                        {clients[clientId] || "Client inconnu"} 
                      </td>
                          <td className="px-6 py-4 text-center">{count}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="px-6 py-4 text-center text-gray-700">
                          Aucun historique trouvé.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Historique