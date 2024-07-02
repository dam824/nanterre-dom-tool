// components/ClientSearch.js
import { useState } from 'react';

const ClientSearch = ({ clients, onSelect }) => {
  const [search, setSearch] = useState('');

  const filteredClients = clients.filter(client =>
    client.society.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg border border-gray-200">
      <input
        type="text"
        placeholder="Search clients..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 w-full border border-gray-300 rounded text-gray-900"
      />
      <ul className="text-gray-900">
        {filteredClients.map((client) => (
          <li
            key={client.id}
            onClick={() => onSelect(client)}
            className="cursor-pointer hover:bg-gray-100 p-2 rounded transition"
          >
            {client.society} ({client.phone})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientSearch;
