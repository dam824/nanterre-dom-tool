'use client';

import Sidebar from '../../components/Sidebar';
import { useState, useEffect } from 'react';

export default function MonCompte() {
    const [user, setUser] = useState(null);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showProfileForm, setShowProfileForm] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/user');
            const data = await res.json();
            setUser(data);
        };
        fetchUser();
    }, []);

    if (!user) return <div>Loading ☕ ⌛...</div>

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        const oldPassword = e.target.oldPassword.value;
        const newPassword = e.target.newPassword.value;

        const res = await fetch('/api/user/update-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ oldPassword, newPassword })
        });

        const data = await res.json();
        if (res.ok) {
            alert('Password updated successfully');
            setShowPasswordForm(false);
        } else {
            alert(data.error);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        const newUsername = e.target.newUsername.value;

        const res = await fetch('/api/user/update-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newUsername }),
        });

        const data = await res.json();
        if (res.ok) {
            alert('Profile updated');
            setUser((prevUser) => ({ ...prevUser, username: newUsername }));
            setShowProfileForm(false);
        } else {
            alert(data.error)
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 p-4 sm:ml-64 flex flex-col">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 flex flex-col flex-1">
                    <h2 className="text-2xl font-bold mb-4">Mon Compte</h2>
                    <div className="flex flex-col space-y-4">
                        <div>
                            <span className="font-bold">Username: </span>
                            <span>{user.username}</span>
                        </div>
                        <div>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                                onClick={() => setShowPasswordForm(!showPasswordForm)}
                            >
                                Modifier Mot de Passe
                            </button>
                        </div>
                        {showPasswordForm && (
                            <form onSubmit={handleUpdatePassword} className='max-w-sm mx-auto'>
                                <div className='mb-5'>
                                    <label htmlFor="oldPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Ancien mot de passe
                                    </label>
                                    <input
                                        type="password"
                                        id="oldPassword"
                                        name="oldPassword"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Nouveau mot de passe
                                    </label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Modifier
                                </button>
                            </form>
                        )}
                        <div>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                                onClick={() => setShowProfileForm(!showProfileForm)}
                            >
                                Modifier profil
                            </button>
                        </div>
                        {showProfileForm && (
                            <form onSubmit={handleUpdateProfile} className="max-w-sm mx-auto">
                                <div className="mb-5">
                                    <label htmlFor="newUsername" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Nouveau nom d utilisateur
                                    </label>
                                    <input
                                        type="text"
                                        id="newUsername"
                                        name="newUsername"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Modifier
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
