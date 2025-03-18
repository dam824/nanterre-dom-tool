import { useEffect, useState } from "react";
export default function ClientTable({ clients, onEditClient, onDeleteClient }) {
  const [messageCount, setMessageCount] = useState({});

  useEffect(() => {
    const fetchMessagesCount = async () => {
      try {
        const res = await fetch ('/api/octopush/count-client-messages', {
          cache:'no-store',
        });
        const data = await res.json();
        setMessageCount(data.messageCounts || {});
      }catch(error){
        console.error('Erreur lors de la récupération des messages par client', error)
      }
    }

    fetchMessagesCount();
    const interval = setInterval(fetchMessagesCount, 5000);
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full bg-white">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-xs text-gray-900 uppercase bg-gray-100 dark:bg-gray-200">
          <tr className="bg-[#f44336d4]">
            <th scope="col" className="px-6 py-3 text-white text-center">Nom du client</th>
            <th scope="col" className="px-6 py-3 text-white text-center">Téléphone</th>
            <th scope="col" className="px-6 py-3 text-white text-center">SMS envoyés</th>
            <th scope="col" className="px-6 py-3 text-white text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {clients && clients.length > 0 ? (
            clients.map((client) => (
              <tr key={client.id} className="bg-white border-b dark:bg-gray-100 dark:border-gray-300">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 text-center whitespace-nowrap">
                  {client.society}
                </th>
                <td className="px-6 py-4 text-center">{client.phone}</td>
                <td className="px-6 py-4 text-center">{messageCount[client.id] || 0}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => onDeleteClient(client.id)}
                    className="font-medium text-red-600 hover:underline"
                  >
                    Supprimer 
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center text-gray-700">
                Aucun client trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
