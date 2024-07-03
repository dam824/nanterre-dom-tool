// app/components/ClientTable.js
export default function ClientTable({ clients }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-full w-full bg-white">
      <table className="w-full text-sm text-left rtl:text-right text-gray-700 h-full">
        <thead className="text-xs text-gray-900 uppercase bg-gray-100 dark:bg-gray-200">
          <tr className="bg-[#f44336d4]">
            <th scope="col" className="px-6 py-3 text-white">
              Nom du client
            </th>
            <th scope="col" className="px-6 py-3 text-white">
              Téléphone
            </th>
            <th scope="col" className="px-6 py-3 text-white">
              Courrier reçu
            </th>
            <th scope="col" className="px-6 py-3 text-white">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {clients && clients.length > 0 ? (
            clients.map((client) => (
              <tr
                key={client.id}
                className="bg-white border-b dark:bg-gray-100 dark:border-gray-300"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {client.society}
                </th>
                <td className="px-6 py-4">{client.phone}</td>
                <td className="px-6 py-4">
                  {client.messages ? client.messages.length : 0}
                </td>
                <td className="px-6 py-4 flex">
                  <button
                    onClick={() => handleEditClient(client)}
                    className="font-medium text-blue-700 hover:underline mr-5"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClient(client.id)}
                    className="font-medium text-red-600 hover:underline"
                  >
                    Delete
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
