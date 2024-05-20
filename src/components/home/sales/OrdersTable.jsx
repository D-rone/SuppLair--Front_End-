import React, { useState } from "react";
import ordersData from "./orders.json";
import OrderDetailsModal from "./OrderDetailsModal";

const OrdersTable = ({ filterOption }) => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [originalStatus, setOriginalStatus] = useState(null); // New state to store original status

  const toggleSidebar = (orderId) => {
    if (orderId === expandedOrder) {
      setExpandedOrder(null);
      setSelectedOrder(null);
      setShowSidebar(false);
    } else {
      setExpandedOrder(orderId);
      const selectedOrder = ordersData.find(
        (order) => order.order_number === orderId
      );
      setSelectedOrder(selectedOrder);
      setOriginalStatus(selectedOrder.status); // Set original status
      setShowSidebar(true);
    }
  };

  const filteredOrders =
    filterOption === "ALL"
      ? ordersData
      : ordersData.filter((order) => order.status === filterOption);

  const handleCloseSidebar = () => {
    setExpandedOrder(null);
    setSelectedOrder(null);
    setShowSidebar(false);
  };

  const handleNavigateOrder = (orderId) => {
    const selectedOrder = ordersData.find(
      (order) => order.order_number === orderId
    );
    setSelectedOrder(selectedOrder);
    setOriginalStatus(selectedOrder.status); // Set original status when navigating
  };

  const updateOrderStatus = (orderId, newStatus) => {
    // Find the index of the order in the ordersData array
    const index = ordersData.findIndex(
      (order) => order.order_number === orderId
    );
    if (index !== -1) {
      // Update the status of the order in the ordersData array
      ordersData[index].status = newStatus;
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex">
        <div className="flex w-full transition-all duration-300">
          <div className={`${showSidebar ? "w-1/4" : "w-full"}`}>
            <table className="w-full divide-y divide-gray-200 border border-gray-200 border-2 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  {!showSidebar && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Delivery Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reference#
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Client Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3"></th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <React.Fragment key={order.order_number}>
                    {showSidebar ? (
                      <tr
                        className={`${
                          selectedOrder?.order_number === order.order_number
                            ? "bg-gray-200 cursor-pointer"
                            : "cursor-pointer"
                        }`}
                        onClick={() => handleNavigateOrder(order.order_number)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap font-bold text-lg">
                          {order.client_name}
                          <span className="text-supplair-primary block">
                            {" "}
                            (#{order.order_number})
                          </span>
                        </td>
                      </tr>
                    ) : (
                      <tr
                        className={
                          expandedOrder === order.order_number
                            ? "bg-gray-100"
                            : ""
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.delivery_date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.order_number}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.client_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.details
                            .reduce(
                              (acc, curr) =>
                                acc + curr.quantity * curr.unit_price,
                              0
                            )
                            .toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end items-center">
                          <button
                            className="bg-supplair-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                            onClick={() => toggleSidebar(order.order_number)}
                          >
                            Show Details
                          </button>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className={`${
              showSidebar ? "w-3/4" : "w-0"
            } bg-white transition-all duration-300 overflow-hidden`}
          >
            {showSidebar && selectedOrder && (
              <OrderDetailsModal
                order={selectedOrder}
                onClose={handleCloseSidebar}
                originalStatus={originalStatus}
                updateOrderStatus={updateOrderStatus} // Pass the function to update status
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
