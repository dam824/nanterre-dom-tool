// components/ClientSearch.js
import { useState } from 'react';

const ClientSearch = ({ clients, onSelect }) => {
  const [search, setSearch] = useState('');

  const filteredClients = clients.filter(client =>
    client.society.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search clients..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <ul>
        {filteredClients.map((client) => (
          <li
            key={client.id}
            onClick={() => onSelect(client)}
            className="cursor-pointer hover:bg-gray-200 p-2"
          >
            {client.society} ({client.phone})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientSearch;
