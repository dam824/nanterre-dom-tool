// app/octopush/page.js
"use client";

import { useEffect, useState } from "react";
import ClientSearch from "../../components/ClientSearch";
import MessageSelectForm from "../../components/MessageSelectForm";
import Sidebar from "../../components/Sidebar";

const OctopushPage = () => {
  const [clients, setClients] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const res = await fetch("/api/clients/get-client", {
        cache: 'no-store',
        next: { 
          tags: ['clients'],
          revalidate: 0
        }
      });
      const data = await res.json();
      setClients(data);
    };
    const fetchTemplates = async () => {
      const res = await fetch("/api/messages/get-all-message", {
        cache: 'no-store',
        next: { 
          tags: ['messages'],
          revalidate: 0
        }
      });
      const data = await res.json();
      setTemplates(data);
    };
    fetchClients();
    fetchTemplates();
  }, []);

  const handleSelectClient = (client) => {
    if( selectedClients.some((c) => c.id === client.id)){
      //si le client est deja selectionne, on le retire
      setSelectedClients((prev) => prev.filter((c) => c.id !== client.id));
    }else{
      //sinon on l ajoute 
      setSelectedClients((prev) => [...prev, client]);
    }
  };

  const handleSendSMS = async (message) => {
    let failedClients = []; 

    for (const client of selectedClients) {
      const phoneNumber = formatPhoneNumber(client.phone);
      try {
        const res = await fetch("/api/octopush/send-message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ to: phoneNumber, body: message.content }),
        });

        const data = await res.json();
       /*  if (res.ok) {
          alert(`Message sent to ${client.society}!`);
        } else {
          alert(`Failed to send message to ${client.society}: ${data.error}`);
        }
      
      } catch (error) {
        console.error("Error sending SMS:", error);
        alert(`Error sending SMS to ${client.society}: ${error.message}`);
      } */
        if (!res.ok) {
          failedClients.push(client.society);
        }
      } catch (error) {
        console.error("Error sending SMS:", error);
        failedClients.push(client.society);
      } 
    }
    if (failedClients.length > 0) {
      alert(`Certains messages n'ont pas pu être envoyés à : ${failedClients.join(", ")}`);
    } else {
      alert("Tous les messages ont bien été envoyés !");
    }
    
  };

  const formatPhoneNumber = (phone) => {
    let cleaned = ("" + phone).replace(/\D/g, ""); // Remove all non-digit characters

    // Check if the number starts with "0" and remove it
    if (cleaned.startsWith("0")) {
      cleaned = cleaned.substring(1);
    }

    // Ensure the number starts with the country code "+33" for France
    return "+33" + cleaned;
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4 sm:ml-64 flex flex-col bg-gray-50 shadow-md">
        <div className="p-4 border-2 border-gray-200 mt-14 flex flex-col flex-1 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4 text-black">
            Send SMS via Octopush
          </h2>
          <div className="flex">
            <div className="w-1/2 p-2">
              <ClientSearch
                clients={clients}
                onSelect={handleSelectClient}
                selectedClients={selectedClients}
              />
            </div>
            <div className="w-1/2 p-2">
              <MessageSelectForm
                onSubmit={handleSendSMS}
                templates={templates}
              />
            </div>
          </div>
          <div className="mt-4 p-2">
            <h3 className="text-lg font-bold mb-2 text-black">
              Selected Clients:
            </h3>
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
