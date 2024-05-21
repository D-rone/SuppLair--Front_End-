import { useState } from "react";
import React from "react";
import ordersData from "./orders.json";

const ClientOrdersSidebar = ({ client, onClose }) => {
  const [address, setAddress] = useState(null); // State for the address

  const clientOrders = ordersData.filter(
    (order) => order.client_name === client.name
  );

  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex justify-between mb-4">
        <div>
          <h2 className="text-2xl leading-6 font-bold text-black mb-6">
            {client.name}
          </h2>
          <p className="mt-1 text-lg font-semibold text-black">
            Email: {client.email}
          </p>
          <p className="mt-1 text-lg font-semibold text-black">
            Address: {address || "East Region; Oran"}{" "}
          </p>
        </div>
      </div>

      <div className="overflow-auto">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Orders</h3>
        <div className="mt-4">
          <table className="w-full divide-y divide-gray-400">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Delivery Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference#
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-supplair-primary">
              {clientOrders.map((order) => (
                <tr key={order.order_number}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.delivery_date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.order_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.details
                      .reduce(
                        (acc, curr) => acc + curr.quantity * curr.unit_price,
                        0
                      )
                      .toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-supplair-primary border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-supplair-primary"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ClientOrdersSidebar;
