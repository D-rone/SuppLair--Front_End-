import React from "react";
import ClientsTable from "./ClientsTable";
function Clients() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center w-full pb-5">
        <h1 className="py-2 px-4 rounded-lg text-4xl m-5 bg-white text-gray-800 font-bold shadow-lg dark:shadow-2x">
          Clients
        </h1>
      </div>
      <ClientsTable></ClientsTable>
    </div>
  );
}

export default Clients;
