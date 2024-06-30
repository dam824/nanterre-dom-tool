const MessageTable = ({ messages, onEdit, onDelete }) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-full w-full">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 h-full">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Title</th>
                        <th scope="col" className="px-6 py-3">Content</th>
                        <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {messages.map((message) => (
                        <tr key={message.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {message.title}
                            </th>
                            <td className="px-6 py-4">{message.content}</td>
                            <td className="px-6 py-4">
                                <button
                                    onClick={() => onEdit(message)}
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-4"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(message.id)}
                                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MessageTable;
