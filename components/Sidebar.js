// components/Sidebar.js
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = async () => {
    if (!isMounted) return;

    // Appeler l'API de déconnexion
    await fetch("/api/logout", {
      method: "GET",
    });
    // Rediriger vers la page de connexion
    router.push("/login");
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-300 dark:bg-gray-100 dark:border-gray-300">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-200 dark:focus:ring-gray-300"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="https://flowbite.com" className="flex ms-2 md:me-24">
                <Image
                  src="/nanterre-dom-logo-sidebar.png"
                  alt="Nanterre Dom Logo"
                  width={200}
                  height={42}
                  className="self-center"
                />
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-200 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-300"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <Image
                      className="w-8 h-8 rounded-full"
                      src="/profil-pic.jpg"
                      alt="Profile"
                      width={50}
                      height={50}
                      layout="fixed"
                    />
                  </button>
                </div>
                <div
                  className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-200 rounded shadow dark:bg-gray-100 dark:divide-gray-300"
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-gray-800"
                      role="none"
                    >
                      Neil Sims
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 truncate dark:text-gray-600"
                      role="none"
                    >
                      neil.sims@flowbite.com
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-600 dark:hover:bg-gray-200 dark:hover:text-gray-800"
                        role="menuitem"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <Link
                        href="/mon-compte"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-600 dark:hover:bg-gray-200 dark:hover:text-gray-800"
                        role="menuitem"
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-600 dark:hover:bg-gray-200 dark:hover:text-gray-800"
                        role="menuitem"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-600 dark:hover:bg-gray-200 dark:hover:text-gray-800"
                        role="menuitem"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-300 sm:translate-x-0 dark:bg-gray-100 dark:border-gray-300"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-100">
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="/dashboard" legacyBehavior>
                <a className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-800 dark:hover:bg-gray-200 group">
                  <svg
                    className="w-5 h-5 text-[#F44336] transition duration-75 group-hover:text-[#f71615] dark:text-[#F44336] dark:group-hover:text-[#f71615]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#F44336"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">Dashboard</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/mon-compte" legacyBehavior>
                <a className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-800 dark:hover:bg-gray-200 group">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-[#F44336] transition duration-75 dark:text-[#F44336] group-hover:text-[#f71615] dark:group-hover:text-[#f71615]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#F44336"
                    viewBox="0 0 18 18"
                  >
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Mon Compte
                  </span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/octopush" legacyBehavior>
                <a className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-800 dark:hover:bg-gray-200 group">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-[#F44336] transition duration-75 dark:text-[#F44336] group-hover:text-[#f71615] dark:group-hover:text-[#f71615]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#F44336"
                    viewBox="0 0 20 20"
                  >
                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Octopush
                  </span>
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-200 dark:text-blue-800">
                    3
                  </span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/messages" legacyBehavior>
                <a className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-800 dark:hover:bg-gray-200 group">
                  <svg
                    className="w-6 h-6 text-[#F44336] dark:text-[#F44336] group-hover:text-[#f71615] dark:group-hover:text-[#f71615]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#F44336"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1v2a1 1 0 0 0 1.707.707L9.414 13H15a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4Z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M8.023 17.215c.033-.03.066-.062.098-.094L10.243 15H15a3 3 0 0 0 3-3V8h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1v2a1 1 0 0 1-1.707.707L14.586 18H9a1 1 0 0 1-.977-.785Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Messages
                  </span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/clients" legacyBehavior>
                <a className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-800 dark:hover:bg-gray-200 group">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-[#F44336] transition duration-75 dark:text-[#F44336] group-hover:text-[#f71615] dark:group-hover:text-[#f71615]"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#F44336"
                    viewBox="0 0 20 18"
                  >
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Clients</span>
                </a>
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-800 dark:hover:bg-gray-200 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-[#F44336] transition duration-75 dark:text-[#F44336] group-hover:text-[#f71615] dark:group-hover:text-[#f71615]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="#F44336"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );

};

export default Sidebar;
