// app/octopush/page.js
'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import ClientSearch from '../../components/ClientSearch';
import MessageSelectForm from '../../components/MessageSelectForm';

const OctopushPage = () => {
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
      const phoneNumber = formatPhoneNumber(client.phone);
      try {
        const res = await fetch('/api/octopush/send-message', {
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

  const formatPhoneNumber = (phone) => {
    let cleaned = ('' + phone).replace(/\D/g, ''); // Remove all non-digit characters

    // Check if the number starts with "0" and remove it
    if (cleaned.startsWith('0')) {
      cleaned = cleaned.substring(1);
    }

    // Ensure the number starts with the country code "+33" for France
    return '+33' + cleaned;
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4 sm:ml-64 flex flex-col bg-gray-50 shadow-md">
        <div className="p-4 border-2 border-gray-200 mt-14 flex flex-col flex-1 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4 text-black">Send SMS via Octopush</h2>
          <div className="flex">
            <div className="w-1/2 p-2">
              <ClientSearch clients={clients} onSelect={handleSelectClient} />
            </div>
            <div className="w-1/2 p-2">
              <MessageSelectForm onSubmit={handleSendSMS} templates={templates} />
            </div>
          </div>
          <div className="mt-4 p-2">
            <h3 className="text-lg font-bold mb-2 text-black">Selected Clients:</h3>
            <ul>
              {selectedClients.map((client) => (
                <li key={client.id} className="text-black">
                  {client.society} ({client.phone})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OctopushPage;
