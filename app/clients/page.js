"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";

export default function Clients() {
  const [searchQuery, setSearchQuery] = useState(""); //test barre recherche
  const [showForm, setShowForm] = useState(false);
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    society: "",
    phone: "",
    isActive: true,
  });
  const [sortOrder, setSortOrder] = useState("asc");

  const [isEditing, setIsEditing] = useState(false);
  const [editClientId, setEditClientId] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      const res = await fetch("/api/clients/get-client", {
        cache: "no-store",
        next: {
          tags: ["clients"],
          revalidate: 0,
        },
      });
      const data = await res.json();
      const sortedClients = data.sort((a, b) =>
        a.society.localeCompare(b.society)
      );
      setClients(sortedClients);
    };
    fetchClients();
  }, []);

  const handleShowForm = () => {
    setShowForm(!showForm);
    setIsEditing(false);
    setFormData({
      society: "",
      phone: "",
      isActive: true,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/clients/add-client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      cache: "no-store",
    });
    if (res.ok) {
      const newClient = await res.json();
      setClients([...clients, newClient]);
      setShowForm(false);
      setFormData({
        society: "",
        phone: "",
        isActive: true,
      });
      // Forcer un re-fetch des données
      const refreshData = await fetch("/api/clients/get-client", {
        cache: "no-store",
        next: {
          tags: ["clients"],
          revalidate: 0,
        },
      });
      const refreshedClients = await refreshData.json();
      setClients(refreshedClients);
    } else {
      alert("Error adding client");
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

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleUpdateClient = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/clients/update-client/${editClientId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      cache: "no-store",
    });

    if (res.ok) {
      const updatedClient = await res.json();
      setClients(
        clients.map((client) =>
          client.id === updatedClient.id ? updatedClient : client
        )
      );
      setShowForm(false);
      setFormData({
        society: "",
        phone: "",
        isActive: true,
      });
      setIsEditing(false);
      setEditClientId(null);
      // Forcer un re-fetch des données
      const refreshData = await fetch("/api/clients/get-client", {
        cache: "no-store",
        next: {
          tags: ["clients"],
          revalidate: 0,
        },
      });
      const refreshedClients = await refreshData.json();
      setClients(refreshedClients);
    } else {
      alert("Error updating client");
    }
  };

  const handleDeleteClient = async (clientId) => {
    try {
      const res = await fetch(`/api/clients/delete-client/${clientId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setClients(clients.filter((client) => client.id !== clientId));
        console.log("Deleted client:", clientId);
      } else {
        alert("Error deleting client");
      }
    } catch (error) {
      console.error("Error deleting client:", error);
      alert("Error deleting client");
    }
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);

    setClients((prevClients) =>
      [...prevClients].sort((a, b) =>
        newSortOrder === "asc"
          ? a.society.localeCompare(b.society)
          : b.society.localeCompare(a.society)
      )
    );
  };

  //search query
  const filteredClients = clients.filter((client) =>
    client.society.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen sm:flex-row">
      <Sidebar />
      <div className="flex-1 p-4 sm:ml-64 flex flex-col bg-gray-50 shadow-md">
        <div className="p-4 border-2 border-gray-200 mt-14 flex flex-col flex-1 rounded-2xl bg-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#f44336d4]">
              Clients
            </h2>

            <input
              type="text"
              placeholder="Rechercher un client ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-full sm:w-[70%]"
            />

            <button
              onClick={handleShowForm}
              className="mt-2 sm:mt-0 px-4 py-2 bg-[var(--main-color)] text-white rounded w-full sm:w-auto"
            >
              {showForm ? "Cancel" : "Add Client"}
            </button>
          </div>
          {showForm && (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-4 bg-white p-6">
              <form
                onSubmit={isEditing ? handleUpdateClient : handleSubmit}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Society
                  </label>
                  <input
                    type="text"
                    name="society"
                    value={formData.society}
                    onChange={handleInputChange}
                    className="mt-1 p-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900"
                    placeholder="Enter society name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 p-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Active
                  </label>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-[#f44336d4] border-gray-300 rounded focus:ring-[#f44336d4]"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[var(--main-color)] text-white rounded"
                  >
                    {isEditing ? "Update Client" : "Add Client"}
                  </button>
                </div>
              </form>
            </div>
          )}
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-900 uppercase bg-gray-100 dark:bg-gray-200">
                <tr className="bg-[var(--main-color)]">
                  <th
                    scope="col"
                    className="px-6 py-3 text-white text-center sm:text-left cursor-pointer"
                    onClick={handleSort}
                  >
                    <span className="inline-flex items-center">
                      Nom du client
                      {sortOrder === "asc" ? (
                        <FaSortUp className="ml-2 text-white" />
                      ) : (
                        <FaSortDown className="ml-2 text-white" />
                      )}
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-white text-center sm:text-left"
                  >
                    Téléphone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-white text-center sm:text-left"
                  >
                    Courrier reçu
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-white text-center sm:text-left"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredClients && filteredClients.length > 0 ? (
                  filteredClients.map((client) => (
                    <tr
                      key={client.id}
                      className="odd:bg-white even:bg-gray-50"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-center sm:text-left"
                      >
                        {client.society}
                      </th>
                      <td className="px-6 py-4 text-center sm:text-left">
                        {client.phone}
                      </td>
                      <td className="px-6 py-4 text-center sm:text-left">
                        {client.messages ? client.messages.length : 0}
                      </td>
                      <td className="px-6 py-4 flex justify-center sm:justify-start">
                        <button
                          onClick={() => handleEditClient(client)}
                          className="font-medium text-blue-700 hover:underline mr-5"
                        >
                          Modifier
                        </button>
                        <Link
                          href={`/historique/${client.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mr-5 font-medium text-blue-700 hover:underline"
                        >
                          Historique
                        </Link>

                        <button
                          onClick={() => handleDeleteClient(client.id)}
                          className="font-medium text-red-600 hover:underline"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-4 text-center text-gray-700"
                    >
                      Aucun client trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
