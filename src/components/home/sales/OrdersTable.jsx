import React, { useState } from 'react';
import ordersData from './orders.json';

const OrdersTable = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleExpandedOrder = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  return (
    <div className="container mx-auto">
      <table className="w-full divide-y divide-gray-200 border border-gray-200 border-2 rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Delivery Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Client Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {ordersData.map((order) => (
            <React.Fragment key={order.order_number}>
              <tr>
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
                  {order.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end items-center">
                  <div className="relative  text-left">
                    <button className="bg-supplair-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg" onClick={() => toggleExpandedOrder(order.order_number)}>
                      {expandedOrder === order.order_number ? 'Hide Details' : 'Show Details'}
                    </button>
                    <button className="ml-2 bg-supplair-primary hover:bg-blue-600 text-white font-bold py-2 px-2 rounded-full" onClick={(e) => e.stopPropagation()}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    {expandedOrder === order.order_number && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Update</button>
                          <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Delete</button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
              {expandedOrder === order.order_number && (
                <tr>
                  <td colSpan="5" className="p-5">
                    <table className="w-full divide-y divide-supplair-primary">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Product
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Quantity
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Unit Price
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Grouped Product
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total Product
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
                              {detail.grouped_product}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {detail.quantity * detail.unit_price}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" colSpan="4">
                            Total
                          </td>
                          <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {order.details.reduce((acc, curr) => acc + (curr.quantity * curr.unit_price), 0).toFixed(2)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
