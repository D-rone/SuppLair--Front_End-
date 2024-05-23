import React, { useState } from "react";
import OrdersTable from "./OrdersTable";
import FilterDropdown from "./FilterDropdown";

function Orders() {
  const [filterOption, setFilterOption] = useState("ALL");

  const handleFilterChange = (option) => {
    setFilterOption(option);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center w-full pb-5">
        <div className="flex items-center h-16 px-8 pt-4">
          <select
            id="selectUserStatus"
            className="text-xl font-semibold hover:cursor-pointer"
            onChange={(e) => getUsers(e.target.value)}
          >
            <option value="all">All orders</option>
            <option value="PENDING">Pending orders</option>
            <option value="ACCEPTED">Accepted orders</option>
            <option value="REFUSED">Reffused orders</option>
            <option value="ORDERED">Ordered orders</option>
            <option value="PAYED">Payed orders</option>
          </select>
        </div>
      </div>
      <OrdersTable filterOption={filterOption} />
    </div>
  );
}

export default Orders;
