import React, { useEffect, useState } from "react";
import OrdersTable from "./OrdersTable";
import FilterDropdown from "./FilterDropdown";

function Orders() {
  const [filterOption, setFilterOption] = useState("ALL");
  const [id, setId] = useState(null);

  useEffect(() => {
    const url = window.location.href;
    const idRegex = /orders\/([^\/]+)/;
    const match = url.match(idRegex);
    if (match) {
      setId(match[1]);
    } else {
      setId(null);
    }
  }, []);

  const handleFilterChange = (option) => {
    setFilterOption(option);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center w-full pb-5">
        <h1 className="py-2 px-4 rounded-lg text-4xl m-5 bg-white text-gray-800 font-bold shadow-lg dark:shadow-2xl">
          Orders
          <FilterDropdown onFilterChange={handleFilterChange} />
        </h1>
      </div>
      <OrdersTable filterOption={filterOption} id={id} />
    </div>
  );
}

export default Orders;
