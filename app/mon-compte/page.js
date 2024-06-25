import Sidebar from '../../components/Sidebar';

export default function MonCompte() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4 sm:ml-64 flex flex-col">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 flex flex-col flex-1">
          <h2 className="text-2xl font-bold mb-4">Mon Compte</h2>
          <div className="flex flex-col space-y-4">
            <div>
              <span className="font-bold">Nom: </span>
              <span>Doe</span>
            </div>
            <div>
              <span className="font-bold">Prénom: </span>
              <span>John</span>
            </div>
            <div>
              <span className="font-bold">Username: </span>
              <span>johndoe</span>
            </div>
            <div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded">Modifier Mot de Passe</button>
            </div>
            <div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded">Modifier profil</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

 
