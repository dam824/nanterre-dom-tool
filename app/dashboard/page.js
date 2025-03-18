'use client';

import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Card1 from '../../components/Card1';
import Card2 from '../../components/Card2';
import Card3 from '../../components/Card3';
import ClientTable from '../../components/ClientTable';

const DashboardPage = () => {
  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    society: '',
    phone: '',
    isActive: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editClientId, setEditClientId] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch('/api/clients/get-client');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const sortedClients = data.sort((a, b) => a.society.localeCompare(b.society));

        setClients(sortedClients);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };
    fetchClients();
  }, []);

  const handleShowForm = () => {
    setShowForm(!showForm);
    setIsEditing(false);
    setFormData({
      society: '',
      phone: '',
      isActive: true,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/clients/add-client', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const newClient = await res.json();
      setClients([...clients, newClient]);
      setShowForm(false);
      setFormData({
        society: '',
        phone: '',
        isActive: true,
      });
    } else {
      alert('Error adding client');
    }
  };

  const handleEditClient = (client) => {
    setShowForm(true);
    setIsEditing(true);
    setEditClientId(client.id);
    setFormData({
      society: client.society,
      phone: client.phone,
      isActive: client.isActive,
    });
  };

  const handleUpdateClient = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/clients/update-client/${editClientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const updatedClient = await res.json();
      setClients(clients.map((client) => (client.id === updatedClient.id ? updatedClient : client)));
      setShowForm(false);
      setFormData({
        society: '',
        phone: '',
        isActive: true,
      });
      setIsEditing(false);
      setEditClientId(null);
    } else {
      alert('Error updating client');
    }
  };

  const handleDeleteClient = async (clientId) => {
    try {
      const res = await fetch(`/api/clients/delete-client/${clientId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        setClients(clients.filter((client) => client.id !== clientId));
        console.log('Deleted client:', clientId);
      } else {
        alert('Error deleting client');
      }
    } catch (error) {
      console.error('Error deleting client:', error);
      alert('Error deleting client');
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4 sm:ml-64 flex flex-col bg-gray-50 shadow-md">
        <div className="p-4 mt-14 flex flex-col flex-1 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Card1 title="Clients" value={clients.length} />
            <Card2 />
            <Card3 />
          </div>
          <div className="flex-grow mb-4 rounded bg-white shadow-md">
            <ClientTable
              clients={clients}
              onEditClient={handleEditClient}
              onDeleteClient={handleDeleteClient}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
