import React, { useState, useEffect } from "react";
import clientsData from "./clients.json";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf as farFilePdf } from "@fortawesome/free-regular-svg-icons";

const OrderDetailsModal = ({
  order,
  onClose,
  originalStatus,
  updateOrderStatus,
}) => {
  const [customer, setCustomer] = useState(null);
  const [state, setState] = useState(originalStatus); // Set initial state to original status
  const [showStateMenu, setShowStateMenu] = useState(false);
  const [payedAmount, setPayedAmount] = useState(0);
  const [address, setAddress] = useState(null); // State for the address

  useEffect(() => {
    const customer = clientsData.find(
      (client) => client.name === order.client_name
    );
    setCustomer(customer);
    // Fetch address data from backend based on order ID or other identifier
    // Example fetch request:
    // fetchAddressData(order.id)
    //   .then((data) => setAddress(data.address))
    //   .catch((error) => console.error("Error fetching address:", error));
  }, [order.client_name]);

  const handleStateChange = (newState) => {
    setState(newState);
    setShowStateMenu(false);
  };

  const handleSave = () => {
    updateOrderStatus(order.order_number, state); // Update status in original table
    onClose(); // Close sidebar
  };

  const toggleStateMenu = () => {
    setShowStateMenu(!showStateMenu);
  };

  const handlePayedAmountChange = (e) => {
    const value = e.target.value;
    const regex = /^(0|([1-9]\d*))(\.\d{0,2})?$/; // Updated regex

    if (regex.test(value)) {
      const numericValue = parseFloat(value);
      if (
        numericValue <=
        order.details.reduce(
          (acc, curr) => acc + curr.quantity * curr.unit_price,
          0
        )
      ) {
        setPayedAmount(numericValue);
      }
    } else {
      setPayedAmount(0); // Set payedAmount to 0 if the input is invalid
    }
  };

  const restAmount =
    order.details.reduce(
      (acc, curr) => acc + curr.quantity * curr.unit_price,
      0
    ) - payedAmount;

  const handlePrintInvoice = () => {
    const customerName = order.client_name;
    const items = order.details.map((detail) => ({
      product: detail.product,
      quantity: detail.quantity,
      unitPrice: detail.unit_price,
      amount: (detail.quantity * detail.unit_price).toFixed(2),
    }));

    const invoiceData = `
        <h1>${customerName}</h1>
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
                  <td>$${item.amount}</td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        </table>
        <p>Total Amount: $${order.details
          .reduce((acc, curr) => acc + curr.quantity * curr.unit_price, 0)
          .toFixed(2)}</p>
        <p>Payed Amount: $${payedAmount.toFixed(2)}</p>
        <p>Rest Amount: $${restAmount.toFixed(2)}</p>
      `;

    // Open a new window with the invoice data
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
          <p className="mt-1 text-lg font-semibold text-black">
            Email: {customer?.email}
          </p>
          <p className="mt-1 text-lg font-semibold text-black">
            Address: {address || "East Region; Oran"}{" "}
            {/* Display address dynamically */}
          </p>
          <p className="mt-1 text-lg font-semibold text-black">
            Delivery Date: {order.delivery_date}
          </p>
        </div>
        <button
          className="text-supplair-primary font-semibold"
          onClick={handlePrintInvoice}
        >
          {" "}
          <FontAwesomeIcon
            icon={farFilePdf}
            className="mr-2 text-supplair-primary text-lg"
          />
          Print Invoice
        </button>
      </div>

      <div className="flex-shrink-0 mb-4">
        <div className="mb-1">
          <span className="text-supplair-primary font-semibold">
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
        <h3 className="text-lg leading-6 font-medium text-gray-900">Items</h3>
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
              {order.details.map((detail, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {detail.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {detail.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${detail.unit_price.toFixed(2)}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {(detail.quantity * detail.unit_price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <div className="flex justify-between">
            <span className="text-lg font-medium">Total Amount</span>
            <span className="text-lg font-medium">
              $
              {order.details
                .reduce((acc, curr) => acc + curr.quantity * curr.unit_price, 0)
                .toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between mt-2">
            <span className="text-lg font-medium">Payed Amount</span>
            <span className="text-lg font-medium">
              ${payedAmount.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between mt-2">
            <span className="text-lg font-medium">Rest Amount</span>
            <span className="text-lg font-medium">
              ${restAmount.toFixed(2)}
            </span>
          </div>

          <div className="mt-4">
            <label
              htmlFor="payed-amount"
              className="block text-sm font-medium text-gray-700"
            >
              Add Payed Amount
            </label>
            <div className="mt-1 relative rounded-md    ">
              <input
                type="text"
                name="payed-amount"
                id="payed-amount"
                className="block w-full pr-12 sm:text-sm border-2 border-gray-300 rounded-md py-1 pl-2 focus:outline-none focus:border-supplair-primary focus:border-2 "
                placeholder="0.00"
                value={payedAmount || ""}
                onChange={handlePayedAmountChange}
                max={order.details.reduce(
                  (acc, curr) => acc + curr.quantity * curr.unit_price,
                  0
                )}
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
