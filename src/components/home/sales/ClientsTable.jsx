import React, { useState } from "react";
import clientsData from "./clients.json";
import ordersData from "./orders.json"; // Import the ordersData

const ClientsTable = () => {
  const [expandedClient, setExpandedClient] = useState(null);

  const toggleExpandedClient = (clientId) => {
    if (expandedClient === clientId) {
      setExpandedClient(null);
    } else {
      setExpandedClient(clientId);
    }
  };

  const getDotColor = (clientId) => {
    const client = clientsData.find((client) => client.id === clientId);
    const clientOrders = ordersData.filter(
      (order) => order.client_name === client.name
    );

    // Check if any order is in "PAYED" status
    const hasPayedOrder = clientOrders.some(
      (order) => order.status === "PAYED"
    );

    // Check if any order is in "PENDING", "ACCEPTED", "REFUSED", or "ORDERED" status
    const hasPendingOrder = clientOrders.some(
      (order) =>
        order.status === "PENDING" ||
        order.status === "ACCEPTED" ||
        order.status === "REFUSED" ||
        order.status === "ORDERED"
    );

    if (hasPayedOrder && !hasPendingOrder) {
      return "bg-green-500"; // Green dot if all orders are in "PAYED" status
    } else if (hasPendingOrder) {
      return "bg-red-500"; // Red dot if any order is in "PENDING", "ACCEPTED", "REFUSED", or "ORDERED" status
    }

    return "bg-gray-500"; // Default color for unknown status or no orders
  };

  return (
    <div className="container mx-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Client Name
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              State
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contacts
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payment
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {clientsData.map((client) => (
            <React.Fragment key={client.id}>
              <tr>
                <td
                  className="px-6 py-4 whitespace-nowrap cursor-pointer"
                  onClick={() => toggleExpandedClient(client.id)}
                >
                  <div className="truncate">{client.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{client.state}</td>
                <td className="px-6 py-4 whitespace-nowrap">{client.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    className={`w-3 h-3 rounded-full ${getDotColor(client.id)}`}
                  ></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="bg-supplair-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mr-2"
                    onClick={() => toggleExpandedClient(client.id)}
                  >
                    {expandedClient === client.id
                      ? "Hide Orders"
                      : "Show Orders"}
                  </button>
                </td>
              </tr>
              {expandedClient === client.id && (
                <tr>
                  <td colSpan="5" className="p-5">
                    <table className=" w-full divide-y border-supplair-primary border-2 rounded-xl divide-supplair-primary divide-2">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Order ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Order Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-supplair-primary">
                        {client.orders.map((order) => (
                          <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {order.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {order.order_date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              ${order.total_amount.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>{" "}
      </table>
    </div>
  );
};

export default ClientsTable;
