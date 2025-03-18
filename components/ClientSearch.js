
import { useState } from 'react';

const ClientSearch = ({ clients, onSelect, selectedClients }) => {
  const [search, setSearch] = useState('');

  const filteredClients = clients.filter(client =>
    client.society.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => a.society.localeCompare(b.society));

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="mb-2 text-gray-900 font-semibold">
        Nombre de clients sélectionnés : <span className="text-[#f44336]">{selectedClients.length}</span>
      </div>
      <input
        type="text"
        placeholder="Rechercher ..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 w-full border border-gray-300 rounded text-gray-900"
      />
    <ul className="text-gray-900">
       
        {filteredClients.map((client) => (
          
          <li
            key={client.id}
            onClick={() => onSelect(client)}
            className={`cursor-pointer p-2 rounded transition ${
              selectedClients.some((c) => c.id === client.id) ? 'bg-[#f443366b]' : 'hover:bg-gray-100'
            }`}
          >
            {client.society} ({client.phone})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientSearch;
