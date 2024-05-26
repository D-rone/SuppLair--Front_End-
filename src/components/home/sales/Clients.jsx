import React, { useState } from "react";
import ClientsTable from "./ClientsTable";
import ClientFilter from "./ClientFilter";

function Clients() {
  const [filterOption, setFilterOption] = useState("ALL");

  const handleFilterChange = (option) => {
    setFilterOption(option);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center w-full pb-5">
        <div className="flex items-center space-x-2">
          <h1 className="ml-2 py-2 px-4 rounded-lg text-4xl bg-white text-gray-800 font-bold shadow-lg dark:shadow-2xl">
            Clients
          </h1>
          <ClientFilter onFilterChange={handleFilterChange} />
        </div>
      </div>
      <ClientsTable filterOption={filterOption} />
    </div>
  );
}

export default Clients;
