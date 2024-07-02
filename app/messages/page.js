// components/MessagesTable.js
const MessagesTable = ({ messages, onEdit, onDelete }) => {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3 text-white">
            Title
          </th>
          <th scope="col" className="px-6 py-3 text-white">
            Content
          </th>
          <th scope="col" className="px-6 py-3 text-white">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {messages.map((message) => (
          <tr key={message.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">{message.title}</td>
            <td className="px-6 py-4">{message.content}</td>
            <td className="px-6 py-4 flex space-x-2">
              <button
                onClick={() => onEdit(message)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(message.id)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MessagesTable;
