// app/components/ClientTable.js
export default function ClientTable({ clients }) {
    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-full w-full">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 h-full">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nom du client
              </th>
              <th scope="col" className="px-6 py-3">
                Téléphone
              </th>
              <th scope="col" className="px-6 py-3">
                Courrier reçu
              </th>
              <th scope="col" className="px-6 py-3">
                adresse
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Client 1
              </th>
              <td className="px-6 py-4">
                0645454545
              </td>
              <td className="px-6 py-4">
                3
              </td>
              <td className="px-6 py-4">
              4 rue de paris 75020 PARIS
              </td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Client 2
              </th>
              <td className="px-6 py-4">
                0644444444
              </td>
              <td className="px-6 py-4">
                2
              </td>
              <td className="px-6 py-4">
              4 rue de paris 75020 PARIS
              </td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Client 3
              </th>
              <td className="px-6 py-4">
                0674747474
              </td>
              <td className="px-6 py-4">
                0
              </td>
              <td className="px-6 py-4">
              4 rue de paris 75020 PARIS
              </td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
