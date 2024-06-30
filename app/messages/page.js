'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import MessageForm from '../../components/MessageForm';
import MessagesTable from '../../components/MessagesTable'

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [currentMessage, setCurrentMessage] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            const res = await fetch('/api/messages/get-messages');
            const data = await res.json();
            setMessages(data);
        };
        fetchMessages();
    }, []);

    const handleAddMessage = async (message) => {
        const res = await fetch('/api/messages/create-message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(message),
        });
        if (res.ok) {
            const newMessage = await res.json();
            setMessages([...messages, newMessage]);
            setShowForm(false);
        }
    };

    const handleEditMessage = (message) => {
        setCurrentMessage(message);
        setShowForm(true);
    };

    const handleUpdateMessage = async (message) => {
        const res = await fetch('/api/messages/update-message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...currentMessage, ...message }),
        });
        if (res.ok) {
            const updatedMessage = await res.json();
            setMessages(messages.map((msg) => (msg.id === updatedMessage.id ? updatedMessage : msg)));
            setShowForm(false);
            setCurrentMessage(null);
        }
    };

    const handleDeleteMessage = async (id) => {
        const res = await fetch('/api/messages/delete-message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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
            <div className="flex-1 p-4 sm:ml-64 flex flex-col">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 flex flex-col flex-1">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Message Templates</h2>
                        <button
                            onClick={() => { setShowForm(true); setCurrentMessage(null); }}
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Add Message Template
                        </button>
                    </div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-4">
                        <MessagesTable
                            messages={messages}
                            onEdit={handleEditMessage}
                            onDelete={handleDeleteMessage}
                        />
                    </div>
                    {showForm && (
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-4">
                            <MessageForm onSubmit={handleSubmit} initialData={currentMessage} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Messages;
