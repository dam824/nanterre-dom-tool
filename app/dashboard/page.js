// pages/dashboard.js
import Sidebar from '../../components/Sidebar';
import Card1 from '../../components/Card1';
import Card2 from '../../components/Card2';
import Card3 from '../../components/Card3';
import ClientTable from '../../components/ClientTable';

const DashboardPage = () => {
  return (
   <>
<div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4 sm:ml-64 flex flex-col">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 flex flex-col flex-1">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <Card1 />
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <Card2 />
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <Card3 />
            </div>
          </div>
          <div className="flex-grow flex items-center justify-center mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <ClientTable />
          </div>
        </div>
      </div>
    </div>

   </>
  );
};

export default DashboardPage;
