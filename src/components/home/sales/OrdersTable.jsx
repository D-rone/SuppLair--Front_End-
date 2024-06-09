import React, { useEffect, useState } from "react";
import OrderDetailsModal from "./OrderDetailsModal";
import { useUserContext } from "../../../pages/HomePage";
import { supplairAPI } from "../../../utils/axios";

const OrdersTable = ({ filterOption, id }) => {
  const { userData, setUserData } = useUserContext();

  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showSidebar, setShowSidebar] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [originalStatus, setOriginalStatus] = useState(null); // New state to store original status
  const [orders, setOrders] = useState([]);
  const [orderSelected, setOrderSelected] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    supplairAPI
      .get(`orders-srv/api/v1/orders/` + userData.companyName)
      .then((res) => {
        if (id) {
          setOrders(res.data.filter((order) => order.order_number === id));
        } else {
          setOrders(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    if (selectedOrder) {
      supplairAPI
        .get(
          `orders-srv/api/v1/supplier/orders/` +
            selectedOrder.order_number
        )
        .then((res) => {
          setOrderDetails(res.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [selectedOrder]);

  const toggleSidebar = async (orderId) => {
    try {
      const response = await supplairAPI.get(
        `orders-srv/api/v1/supplier/orders/` + orderId
      );

      setOrderDetails(response.data);
    } catch (error) {
      console.error("Error:", error);
    }

    if (orderId === expandedOrder) {
      setExpandedOrder(null);
      setSelectedOrder(null);
      setShowSidebar(false);
    } else {
      setExpandedOrder(orderId);
      const selectedOrder = orders.find(
        (order) => order.order_number === orderId
      );
      setSelectedOrder(selectedOrder);
      setOriginalStatus(selectedOrder.status); // Set original status
      setShowSidebar(true);
    }
  };

  const filteredOrders =
    filterOption === "ALL"
      ? orders
      : orders.filter((order) => order.status === filterOption);

  const handleCloseSidebar = () => {
    setExpandedOrder(null);
    setSelectedOrder(null);
    setShowSidebar(false);
  };

  const handleNavigateOrder = (orderId) => {
    const selectedOrder = orders.find(
      (order) => order.order_number === orderId
    );
    setSelectedOrder(selectedOrder);
    setOriginalStatus(selectedOrder.status); // Set original status when navigating
  };

  const updateOrderStatus = (orderId, newStatus, deliveryDate) => {
    // Find the index of the order in the orders array
    const index = orders.findIndex((order) => order.order_number === orderId);
    if (index !== -1) {
      // Update the status of the order in the orders array
      orders[index].status = newStatus;
      orders[index].delivery_date = deliveryDate;
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
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Delivery Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Reference#
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Client Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
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
                        <td className="px-6 py-4 whitespace-nowrap font-semibold text-lg">
                          {order.client_name}
                          <span className="text-supplair-primary block font-semibold ">
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
                        <td className="px-6 py-4 whitespace-nowrap font-semibold">
                          {order.delivery_date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold">
                          {order.order_number}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold">
                          {order.client_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold">
                          {order.totalAmount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold">
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
                orderDetails={orderDetails}
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
