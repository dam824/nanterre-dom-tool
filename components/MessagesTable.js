// components/MessagesTable.js

import React from 'react';

const MessagesTable = ({ messages, onEdit, onDelete }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2">Title</th>
          <th className="py-2">Content</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {messages.map((message) => (
          <tr key={message.id} className="bg-gray-100">
            <td className="px-4 py-2">{message.title}</td>
            <td className="px-4 py-2">{message.content}</td>
            <td className="px-4 py-2">
              <button onClick={() => onEdit(message)}>Edit</button>
              <button onClick={() => onDelete(message.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MessagesTable;
