import { useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ClientOrdersSidebar = ({ client, onClose, clientDetails }) => {
  const navigate = useNavigate();

  const orderSelected = (orderId) => {
    console.log(orderId);
    navigate("/orders/" + orderId);
  };

  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex justify-between mb-4">
        <div>
          <div>
            <span className="mt-1 text-lg font-semibold text-black">
              Email :
            </span>
            <span className="mt-1 text-lg font-meduim text-black">
              {" " + clientDetails.email}
            </span>
          </div>
          <div>
            <span className="mt-1 text-lg font-semibold text-black">
              Address :
            </span>
            <span className="mt-1 text-lg font-meduim text-black">
              {" " + clientDetails.address}
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-auto">
        <h3 className="mt-1 text-lg font-semibold text-black">Orders :</h3>
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
            <tbody className="bg-white divide-y divide-supplair-primary cursor-pointer">
              {clientDetails.orderRowDtos?.map((order) => (
                <tr
                  key={order.order_number}
                  onClick={() => orderSelected(order.order_number)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.delivery_date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.order_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.totalAmount}
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
