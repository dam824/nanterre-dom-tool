'use client';

import { useState } from "react";
import Image from 'next/image';
import Link from "next/link";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    //logic soumission formulaire a voir plus tard
  };

  return (
    <>
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <Image
              src="https://www.nanterredom.fr/images/logo.png"
              alt="nanterredom logo"
              width={128}
              height={128}
              className="mx-auto"
            />
          </div>
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Créer un compte
            </h1>
            <div className="w-full flex-1 mt-8">
              <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <div className="mx-auto max-w-xs w-full">
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                  <button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    style={{ backgroundColor: '#F44336' }}
                  >
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-3">S enregistrer</span>
                  </button>
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    Vous n avez pas de compte ? 
                    <Link href="/login" className="border-b border-gray-500 border-dotted">
                      Creer un compte 
                    </Link>             
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          className="flex-1 bg-indigo-100 text-center hidden lg:flex"
          style={{
            backgroundImage: "url('https://www.nanterredom.fr/images/background_home.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      </div>
    </div>
  </>
  );
}
