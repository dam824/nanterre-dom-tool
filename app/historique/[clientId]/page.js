// /app/historique/[clientId]/page.js

"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";

const HistoriqueClient = () => {
  const { clientId } = useParams();
  const [historique, setHistorique] = useState([]);
  const [clientName, setClientName] = useState("");

  useEffect(() => {
    const fetchHistorique = async () => {
      try {
        const res = await fetch(`/api/clients/historique/${clientId}`, {
          cache: "no-store",
        });
        const data = await res.json();
        setHistorique(data.historique || []);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'historique", error);
      }
    };

    const fetchClientName = async () => {
      try {
        const res = await fetch("/api/clients/get-client", {
          cache: "no-store",
        });
        const data = await res.json();
        const client = data.find((c) => c.id === clientId);
        if (client) setClientName(client.society);
      } catch (error) {
        console.error("Client name error", error);
      }
    };

    if (clientId) {
      fetchHistorique();
      fetchClientName();
    }
  }, [clientId]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4 sm:ml-64 flex flex-col bg-gray-50 shadow-md">
        <div className="p-4 border-2 border-gray-200 mt-14 flex flex-col flex-1 rounded-2xl bg-white">
          <h2 className="text-2xl font-bold mb-4 text-black">
            Historique des SMS envoyés à{" "}
            <span className="text-[#f44336d4]">{clientName || "..."}</span>{" "}
          </h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full bg-white">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-gray-900 uppercase bg-gray-100">
                <tr className="bg-[var(--main-color)]">
                  <th scope="col" className="px-6 py-3 text-white text-center">
                    Message envoyé
                  </th>
                  <th scope="col" className="px-6 py-3 text-white text-center">
                    Nombre de messages
                  </th>
                  <th scope="col" className="px-6 py-3 text-white text-center">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {historique.length > 0 ? (
                  historique.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-100 dark:border-gray-300"
                    >
                      <td className="px-6 py-4 text-center">{item.title}</td>
                      <td className="px-6 py-4 text-center">1</td>
                      <td className="px-6 py-4 text-center">
                        {new Date(item.sentAt).toLocaleString("fr-FR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-4 text-center text-gray-700"
                    >
                      Aucun SMS trouvé pour ce client.
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
};

export default HistoriqueClient;
