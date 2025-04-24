"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import AvatarForm from "../../components/AvatarForm";

export default function MonCompte() {
  const [user, setUser] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showAvatarForm, setShowAvatarForm] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/user");
      const data = await res.json();
      setUser(data);
    };
    fetchUser();
  }, []);

  if (!user) return <div>Loading ☕ ⌛...</div>;

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const oldPassword = e.target.oldPassword.value;
    const newPassword = e.target.newPassword.value;

    const res = await fetch("/api/user/update-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Password updated successfully");
      setShowPasswordForm(false);
    } else {
      alert(data.error);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const newUsername = e.target.newUsername.value;

    const res = await fetch("/api/user/update-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newUsername }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Profile updated");
      setUser((prevUser) => ({ ...prevUser, username: newUsername }));
      setShowProfileForm(false);
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4 sm:ml-64 flex flex-col bg-gray-100">
        <div className="p-4 border-2 mt-14 flex flex-col flex-1 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Mon Compte</h2>
          <div className="flex justify-center gap-6 flex-wrap">
            <div className="w-[300px] h-[300px] bg-white shadow-md rounded-lg p-6 flex flex-col justify-center items-center text-center">
              <h3 className="text-xl font-semibold text-gray-800 text-center">Changer mot de passe</h3>
              <button
                className="px-4 py-2 mt-4 bg-[var(--main-color)] text-white rounded"
                onClick={() => setShowPasswordForm(!showPasswordForm)}
              >
                Modifier Mot de Passe
              </button>
            </div>
  
            <div className="w-[300px] h-[300px] bg-white shadow-md rounded-lg p-6 flex flex-col justify-center items-center text-center">
              <h3 className="text-xl font-semibold text-gray-800 text-center">
                Changer nom d&apos;utilisateur
              </h3>
              <button
                className="px-4 py-2 mt-4 bg-[var(--main-color)] text-white rounded"
                onClick={() => setShowProfileForm(!showProfileForm)}
              >
                Modifier Nom
              </button>
            </div>
  
            <div className="w-[300px] h-[300px] bg-white shadow-md rounded-lg p-6 flex flex-col justify-center items-center text-center">
              <h3 className="text-xl font-semibold text-gray-800 text-center">Changer avatar</h3>
              <button
                className="px-4 py-2 mt-4 bg-[var(--main-color)] text-white rounded"
                onClick={() => setShowAvatarForm(true)}
              >
                Modifier Avatar
              </button>
            </div>
          </div>
  
          {showPasswordForm && (
            <form
              onSubmit={handleUpdatePassword}
              className="max-w-sm mx-auto mt-6 p-4 bg-white shadow-lg rounded-lg border border-gray-200"
            >
              <div className="mb-5">
                <label htmlFor="oldPassword" className="block mb-2 text-sm font-medium text-gray-900">
                  Ancien mot de passe
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#F44336] focus:border-[#F44336] block w-full p-2.5"
                  required
                />
              </div>
              <div className="mb-5">
                <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#F44336] focus:border-[#F44336] block w-full p-2.5"
                  required
                />
              </div>
              <button
                type="submit"
                className="text-white bg-[var(--main-color)] hover:bg-[#d4372d] focus:ring-4 focus:outline-none focus:ring-[#F44336] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Modifier
              </button>
            </form>
          )}
  
          {showProfileForm && (
            <form
              onSubmit={handleUpdateProfile}
              className="max-w-sm mx-auto mt-6 p-4 bg-white shadow-lg rounded-lg border border-gray-200"
            >
              <div className="mb-5">
                <label htmlFor="newUsername" className="block mb-2 text-sm font-medium text-gray-900">
                  Nouveau nom d&apos;utilisateur
                </label>
                <input
                  type="text"
                  id="newUsername"
                  name="newUsername"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#F44336] focus:border-[#F44336] block w-full p-2.5"
                  required
                />
              </div>
              <button
                type="submit"
                className="text-white bg-[#F44336] hover:bg-[#d4372d] focus:ring-4 focus:outline-none focus:ring-[#F44336] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Modifier
              </button>
            </form>
          )}
  
          {showAvatarForm && <AvatarForm />}
        </div>
      </div>
    </div>
  );
  
  
  
}
