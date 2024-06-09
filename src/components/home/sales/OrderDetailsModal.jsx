import React, { useState, useEffect } from "react";
import { faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf as farFilePdf } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";
import { useUserContext } from "../../../pages/HomePage";
import { supplairAPI } from "../../../utils/axios";

const formatDate = (dateStr) => {
  const [year, month, day] = dateStr.split(/[-/]/);
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

const OrderDetailsModal = ({
  order,
  orderDetails,
  onClose,
  originalStatus,
  updateOrderStatus,
}) => {
  const { userData, setUserData } = useUserContext();
  const [customer, setCustomer] = useState(null);
  const [state, setState] = useState(orderDetails.orderState); // Set initial state to original status
  const [showStateMenu, setShowStateMenu] = useState(false);
  const [payedAmount, setPayedAmount] = useState(0);
  const [address, setAddress] = useState(null); // State for the address
  const [deliveryDate, setDeliveryDate] = useState("");

  useEffect(() => {
    if (orderDetails.date) {
      setDeliveryDate(formatDate(orderDetails.date));
    }
  }, [orderDetails.date]);
  useEffect(() => {
    setState(orderDetails.orderState);
  }, [order]);
  useEffect(() => {
    setState(originalStatus);
  }, [originalStatus]);

  const handleDateChange = (event) => {
    setDeliveryDate(event.target.value);
  };

  const handleStateChange = (newState) => {
    setState(newState);
    setShowStateMenu(false);
  };

  const handleSave = async () => {
    updateOrderStatus(order.order_number, state, deliveryDate); // Update status in original table

    if (payedAmount > orderDetails.totalAmount - orderDetails.payedAmount) {
      toast.error(
        "The amount you are trying to pay exceeds the remaining balance."
      );
      return;
    }
    if (
      orderDetails.totalAmount - (orderDetails.payedAmount + payedAmount) ==
      0
    ) {
      if (state != "PAYED") {
        toast.error("Order state must be payed");
        return;
      }
    }
    try {
      const response = await supplairAPI.put(
        `orders-srv/api/v1/supplier/orders/` + order.order_number,
        {
          date: deliveryDate,
          orderState: state,
          payedAmount: payedAmount,
        }
      );
      onClose(); // Close sidebar
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleStateMenu = () => {
    setShowStateMenu(!showStateMenu);
  };
  const handlePrintInvoice = () => {
    const order = orderDetails;

    const items = order.productRows.map((detail) => ({
      product: detail.product_name,
      quantity: detail.qte,
      unitPrice: detail.product_price,
      amount: detail.amount,
    }));

    const invoiceData = `
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          h1, h2 { text-align: left; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border: 1px solid #000; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          p { margin: 20px 0; text-align: left; }
          strong{font-size:18px}
          thead{bachground:grey}
        </style>
      </head>
      <body>
        <p><strong>Date:</strong> ${order.date}</p>
        <p><strong>Order Reference:</strong> ${order.orderId}</p>
        <p><strong>Customer Name:</strong> ${order.customerName}</p>
        <p><strong>Customer Email:</strong> ${order.customerEmail}</p>
        <p><strong>Customer Address:</strong> ${order.customerAddress}</p>
  
        <h2>Items:</h2>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${items
              .map(
                (item) => `
                <tr>
                  <td>${item.product}</td>
                  <td>${item.quantity}</td>
                  <td>$${item.unitPrice.toFixed(2)}</td>
                  <td>$${item.amount.toFixed(2)}</td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        </table>
        <p><strong>Total Amount:</strong> $${order.totalAmount.toFixed(2)}</p>
        <p><strong>Payed Amount:</strong> $${order.payedAmount.toFixed(2)}</p>
        <p><strong>Rest Amount:</strong> $${(
          order.totalAmount - order.payedAmount
        ).toFixed(2)}</p>
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(invoiceData);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex justify-between mb-4">
        <div>
          <h2 className="text-2xl leading-6 font-bold text-supplair-primary mb-6">
            {order.client_name}
          </h2>
          <div>
            <span className="mt-1 text-lg font-semibold text-black">
              Email :
            </span>
            <span className="mt-1 text-lg font-meduim text-black">
              {" " + orderDetails.customerEmail}
            </span>
          </div>
          <div>
            <span className="mt-1 text-lg font-semibold text-black">
              Address :
            </span>
            <span className="mt-1 text-lg font-meduim text-black">
              {" " + orderDetails.customerAddress}
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="mt-1 text-lg font-semibold text-black">
              Delivery Date:
            </span>
            <input
              type="date"
              disabled={!userData.hasDeliveryDate}
              value={deliveryDate}
              onChange={handleDateChange}
              className="border p-2 mt-1"
            />
          </div>
        </div>
        <div>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "20px" }}>
              <button
                className="text-supplair-primary font-meduim"
                onClick={handlePrintInvoice}
              >
                <FontAwesomeIcon
                  icon={farFilePdf}
                  className="mr-2 text-supplair-primary text-lg"
                />
                Print Invoice
              </button>
            </div>

            <button
              className="text-supplair-primary hover:text-supplair-primary-darker"
              onClick={() => onClose()}
            >
              <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 mb-4">
        <div className="mb-1">
          <span className="mt-1 text-lg font-semibold text-black">
            Select Order status
          </span>
        </div>
        <div className="relative inline-block text-left w-full">
          <div>
            <button
              type="button"
              className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-supplair-primary"
              id="state-menu"
              aria-haspopup="true"
              aria-expanded={showStateMenu}
              onClick={toggleStateMenu}
            >
              {state || "PENDING"}
              <FontAwesomeIcon
                icon={faChevronDown}
                className="-mr-1 ml-2 h-5 w-5"
              />
            </button>
          </div>
          {showStateMenu && (
            <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="state-menu"
              >
                <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                  <input
                    type="radio"
                    className="mr-2 leading-tight"
                    checked={state === "PENDING"}
                    onChange={() => handleStateChange("PENDING")}
                  />
                  <span className="ml-2">PENDING</span>
                </label>
                <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                  <input
                    type="radio"
                    className="mr-2 leading-tight"
                    checked={state === "ACCEPTED"}
                    onChange={() => handleStateChange("ACCEPTED")}
                  />
                  <span className="ml-2">ACCEPTED</span>
                </label>
                <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                  <input
                    type="radio"
                    className="mr-2 leading-tight"
                    checked={state === "REFUSED"}
                    onChange={() => handleStateChange("REFUSED")}
                  />
                  <span className="ml-2">REFUSED</span>
                </label>
                <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                  <input
                    type="radio"
                    className="mr-2 leading-tight"
                    checked={state === "ORDERED"}
                    onChange={() => handleStateChange("ORDERED")}
                  />
                  <span className="ml-2">ORDERED</span>
                </label>
                <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                  <input
                    type="radio"
                    className="mr-2 leading-tight"
                    checked={state === "PAYED"}
                    onChange={() => handleStateChange("PAYED")}
                  />
                  <span className="ml-2">PAYED</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="overflow-auto">
        <span className="mt-1 text-lg font-semibold text-black">Items :</span>
        <div className="mt-4">
          <table className="w-full divide-y divide-gray-400">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Price
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-supplair-primary">
              {orderDetails.productRows.map((detail, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {detail.product_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{detail.qte}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${detail.product_price.toFixed(2)}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {(detail.qte * detail.product_price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <div className="flex justify-end">
            <span className="text-lg font-semibold">Total Amount :</span>
            <span className="text-lg font-medium ml-3">
              {"$" + orderDetails.totalAmount}
            </span>
          </div>

          <div className="flex justify-end mt-2">
            <span className="text-lg font-semibold">Payed Amount :</span>
            <span className="text-lg font-medium ml-3">
              ${orderDetails.payedAmount}
            </span>
          </div>

          <div className="flex justify-end mt-2">
            <span className="text-lg font-semibold">Rest Amount :</span>
            <span className="text-lg font-medium ml-3">
              ${orderDetails.totalAmount - orderDetails.payedAmount}
            </span>
          </div>

          <div className="flex justify-end mt-2">
            <label
              htmlFor="payed-amount"
              className="mt-1 text-lg font-semibold text-black"
            >
              Add Payed Amount :
            </label>

            <div className="mt-1 relative rounded-md ml-3">
              <input
                type="number"
                name="payed-amount"
                className="block w-full pr-12 sm:text-sm border-2 border-gray-300 rounded-md py-1 pl-2 focus:outline-none focus:border-supplair-primary focus:border-2 "
                placeholder="0.00"
                value={payedAmount || ""}
                onChange={(e) => setPayedAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-supplair-primary border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-supplair-primary"
              onClick={handleSave} // Call handleSave on save button click
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderDetailsModal;
