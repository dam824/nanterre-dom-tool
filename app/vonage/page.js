'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import ClientSearch from '../../components/ClientSearch';
import MessageForm from '../../components/MessageForm';

const VonagePage = () => {
  const [clients, setClients] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const res = await fetch('/api/clients/get-client');
      const data = await res.json();
      setClients(data);
    };
    const fetchTemplates = async () => {
      const res = await fetch('/api/messages/get-all-message');
      const data = await res.json();
      setTemplates(data);
    };
    fetchClients();
    fetchTemplates();
  }, []);

  const handleSelectClient = (client) => {
    setSelectedClients(prev => [...prev, client]);
  };

  const handleSendSMS = async (message) => {
    for (const client of selectedClients) {
      const phoneNumber = client.phone; // Utilise le numéro tel quel
      try {
        const res = await fetch('/api/vonage/send-message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ to: phoneNumber, body: message.content }),
        });
        const data = await res.json();
        if (res.ok) {
          alert(`Message sent to ${client.society}!`);
        } else {
          alert(`Failed to send message to ${client.society}: ${data.error}`);
        }
      } catch (error) {
        console.error('Error sending SMS:', error);
        alert(`Error sending SMS to ${client.society}: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4 sm:ml-64 flex flex-col">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 flex flex-col flex-1">
          <h2 className="text-2xl font-bold mb-4">Send SMS via Vonage</h2>
          <div className="flex">
            <div className="w-1/2">
              <ClientSearch clients={clients} onSelect={handleSelectClient} />
            </div>
            <div className="w-1/2">
              <MessageForm onSubmit={handleSendSMS} templates={templates} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">Selected Clients:</h3>
            <ul>
              {selectedClients.map(client => (
                <li key={client.id}>{client.society} ({client.phone})</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VonagePage;
