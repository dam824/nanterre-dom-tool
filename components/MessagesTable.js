// components/MessagesTable.js
import React from 'react';

const MessagesTable = ({ messages, onEdit, onDelete }) => {
  if (!messages || !onEdit || !onDelete) {
    return null;
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-900 uppercase bg-gray-100 dark:bg-gray-200">
          <tr className="bg-[#f44336d4]">
            <th scope="col" className="px-6 py-3 text-white">Title</th>
            <th scope="col" className="px-6 py-3 text-white">Content</th>
            <th scope="col" className="px-6 py-3 text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.length > 0 ? (
            messages.map((message) => (
              <tr key={message.id} className="odd:bg-white even:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{message.title}</td>
                <td className="px-6 py-4">{message.content}</td>
                <td className="px-6 py-4 flex">
                  <button onClick={() => onEdit(message)} className="font-medium text-blue-700 hover:underline mr-5">
                    Edit
                  </button>
                  <button onClick={() => onDelete(message.id)} className="font-medium text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="px-6 py-4 text-center text-gray-700">No messages found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MessagesTable;
