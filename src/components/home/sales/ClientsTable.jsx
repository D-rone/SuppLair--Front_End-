import React, { useEffect, useState } from "react";
import ClientOrdersSidebar from "./ClientOrdersSidebar";
import { useUserContext } from "../../../pages/HomePage";
import axios from "axios";

const ClientsTable = ({ filterOption }) => {
  const { userData, setUserData } = useUserContext();

  const [expandedClient, setExpandedClient] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [originalExpandedClient, setOriginalExpandedClient] = useState(null);
  const [clientsData, setclientsData] = useState([]);
  const [clientDetails, setClientDetails] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/v1/customers/` + userData.companyName)
      .then((res) => {
        setclientsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    if (selectedClient) {
      axios
        .get(
          `http://localhost:8081/api/v1/orders/${userData.companyName}/${selectedClient.name}`
        )
        .then((res) => {
          console.log("hhh");
          setClientDetails(res.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [selectedClient]);

  const toggleExpandedClient = (clientId) => {
    if (expandedClient === clientId) {
      setExpandedClient(originalExpandedClient); // Restore original expanded client
      setShowSidebar(false);
      setSelectedClient(null);
    } else {
      setOriginalExpandedClient(expandedClient); // Store original expanded client
      setExpandedClient(clientId);
      const selectedClient = clientsData.find(
        (client) => client.name === clientId
      );
      setSelectedClient(selectedClient);
      setShowSidebar(true);
    }
  };

  const handleCloseSidebar = () => {
    setExpandedClient(null);
    setShowSidebar(false);
    setSelectedClient(null);
  };

  const getDotColor = (clientId) => {
    const client = clientsData.find((client) => client.name === clientId);
    const clientOrders = ordersData.filter(
      (order) => order.client_name === client.name
    );

    const hasPayedOrder = clientOrders.some(
      (order) => order.status === "PAYED"
    );

    const hasPendingOrder = clientOrders.some(
      (order) =>
        order.status === "PENDING" ||
        order.status === "ACCEPTED" ||
        order.status === "REFUSED" ||
        order.status === "ORDERED"
    );

    if (hasPayedOrder && !hasPendingOrder) {
      return "bg-green-500";
    } else if (hasPendingOrder) {
      return "bg-red-500";
    }

    return "bg-gray-500";
  };

  const filteredClients =
    filterOption === "ALL"
      ? clientsData
      : clientsData.filter((client) => client.state === filterOption);

  return (
    <div className="container mx-auto px-4">
      <div className="flex">
        <div className="flex w-full transition-all duration-300">
          <div className={`${showSidebar ? "w-1/4" : "w-full"}`}>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {!showSidebar && (
                    <>
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
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClients.map((client) => (
                  <React.Fragment key={client.name}>
                    {!showSidebar && (
                      <tr>
                        <td
                          className={`px-6 py-4 whitespace-nowrap cursor-pointer${
                            selectedClient?.name === client.name
                              ? "bg-gray-200"
                              : ""
                          }`}
                          onClick={() => toggleExpandedClient(client.name)}
                        >
                          <div className="truncate max-w-xs font-medium">
                            {client.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {client.state}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {client.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`w-3 h-3 rounded-full`}
                            style={{
                              width: "15px",
                              height: "15px",
                              background: client.payment ? "green" : "red",
                            }}
                          ></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            className="bg-supplair-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mr-2"
                            onClick={() => toggleExpandedClient(client.name)}
                          >
                            {expandedClient !== client.name
                              ? "Show Orders"
                              : "Hide Orders"}
                          </button>
                        </td>
                      </tr>
                    )}
                    {showSidebar && (
                      <tr>
                        <td
                          colSpan="5" // span the entire row
                          className={`px-6 py-4 whitespace-nowrap cursor-pointer  ${
                            selectedClient?.name === client.name
                              ? "bg-gray-200"
                              : ""
                          }`}
                          onClick={() => toggleExpandedClient(client.name)}
                        >
                          <div className="truncate max-w-xs text-xl  text-supplair-primary font-semibold">
                            {client.name}
                          </div>
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
            {showSidebar && selectedClient && (
              <ClientOrdersSidebar
                client={selectedClient}
                clientDetails={clientDetails}
                onClose={handleCloseSidebar}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsTable;
