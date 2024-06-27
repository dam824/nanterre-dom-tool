// app/components/ClientTable.js
export default function ClientTable({ clients }) {
    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-full w-full">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 h-full">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Nom du client</th>
              <th scope="col" className="px-6 py-3">Téléphone</th>
              <th scope="col" className="px-6 py-3">Courrier reçu</th>
              <th scope="col" className="px-6 py-3">Adresse</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {clients && clients.length > 0 ? (
              clients.map((client) => (
                <tr key={client.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {client.society}
                  </th>
                  <td className="px-6 py-4">{client.phone}</td>
                  <td className="px-6 py-4">{client.messages ? client.messages.length : 0}</td>
                  <td className="px-6 py-4">{client.address}</td>
                  <td className="px-6 py-4">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">Aucun client trouvé.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
  