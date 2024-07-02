// /app/dashboard/page.js
'use client';

import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Card1 from '../../components/Card1';
import Card2 from '../../components/Card2';
import Card3 from '../../components/Card3';
import ClientTable from '../../components/ClientTable';

const DashboardPage = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch('/api/clients/get-client');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
    fetchClients();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4 sm:ml-64 flex flex-col bg-gray-50 shadow-md">
        <div className="p-4   mt-14 flex flex-col flex-1 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Card1 title="Clients" value={clients.length} />
            <Card2 />
            <Card3 />
          </div>
          <div className="flex-grow mb-4 rounded bg-white shadow-md">
            <ClientTable clients={clients} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
