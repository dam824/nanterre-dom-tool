// app/messages/page.js
"use client";

import { useEffect, useState } from "react";
import MessageForm from "../../components/MessageForm";
import MessagesTable from "../../components/MessagesTable";
import Sidebar from "../../components/Sidebar";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch("/api/messages/get-all-message", {
        cache: "no-store",
        next: {
          tags: ["messages"],
          revalidate: 0,
        },
      });
      const data = await res.json();
      setMessages(data);
    };
    fetchMessages();
  }, []);

  const handleAddMessage = async (message) => {
    const res = await fetch("/api/messages/create-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
      cache: "no-store",
    });
    if (res.ok) {
      const newMessage = await res.json();
      setMessages([...messages, newMessage]);
      setShowForm(false);

      // Re-fetch après création
      const refreshRes = await fetch("/api/messages/get-all-message", {
        cache: "no-store",
        next: {
          tags: ["messages"],
          revalidate: 0,
        },
      });
      const refreshedData = await refreshRes.json();
      setMessages(refreshedData);
    }
  };

  const handleEditMessage = (message) => {
    setCurrentMessage(message);
    setShowForm(true);
  };

  const handleUpdateMessage = async (message) => {
    const res = await fetch("/api/messages/update-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...currentMessage, ...message }),
      cache: "no-store",
    });
    if (res.ok) {
      const updatedMessage = await res.json();
      setMessages(
        messages.map((msg) =>
          msg.id === updatedMessage.id ? updatedMessage : msg
        )
      );
      setShowForm(false);
      setCurrentMessage(null);

      // Re-fetch après mise à jour
      const refreshRes = await fetch("/api/messages/get-all-message", {
        cache: "no-store",
        next: {
          tags: ["messages"],
          revalidate: 0,
        },
      });
      const refreshedData = await refreshRes.json();
      setMessages(refreshedData);
    }
  };

  const handleDeleteMessage = async (id) => {
    const res = await fetch("/api/messages/delete-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setMessages(messages.filter((msg) => msg.id !== id));
    }
  };

  const handleSubmit = (message) => {
    if (currentMessage) {
      handleUpdateMessage(message);
    } else {
      handleAddMessage(message);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4 sm:ml-64 flex flex-col bg-gray-50 shadow-md">
        <div className="p-4 border-2 border-gray-200 mt-14 flex flex-col flex-1 rounded-2xl bg-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-black">Message Templates</h2>
            <button
              onClick={() => {
                setShowForm(true);
                setCurrentMessage(null);
              }}
              className="px-4 py-2 bg-[var(--main-color)] text-white rounded"
            >
              Add Message Template
            </button>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-4 bg-white">
            {messages.length > 0 ? (
              <MessagesTable
                messages={messages}
                onEdit={handleEditMessage}
                onDelete={handleDeleteMessage}
              />
            ) : (
              <div className="text-center text-gray-500">
                No messages found.
              </div>
            )}
          </div>
          {showForm && (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-4 bg-white">
              <MessageForm
                onSubmit={handleSubmit}
                initialData={currentMessage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
