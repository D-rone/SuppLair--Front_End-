import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../../../pages/HomePage";
import showMore from "../../../assets/images/more.svg";
import UpdateBillingState from "./UpdateBillingState";

function BillingTable({ selectedMonth }) {
  const taxe = 500;
  const { userData, setUserData } = useUserContext();
  const [invoices, setinvoices] = useState([]);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [update, setUpdate] = useState(false);
  const [updatedInvoice, setUpdatedInvoice] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/v1/invoices`)
      .then((res) => {
        const filteredInvoices = res.data.filter((invoice) => {
          return invoice.date === selectedMonth;
        });
        setinvoices(filteredInvoices);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedMonth, update]);

  const handlePrintInvoice = (invoice) => {
    const { id, companyName, date, orderNumber } = invoice; // Destructure invoice object

    const invoiceData = `
    <!DOCTYPE html>
<html>
<head>
<style>
table, td, th {
  border: 1px solid;
}

table {
  width: 100%;
  border-collapse: collapse;
}
</style>
</head>
<body>

<div style="padding: 5% 50px;">
  <h2 style="font-size: 30px;">${companyName}</h2>
  <div style="display: flex; column-gap: 10px;">
    <p>Date</p>
    <p>${date}</p>
  </div>
  <table style="width: 100%; margin-top: 50px; border-collapse: collapse; ">
    <thead>
      <tr style="text-align: left;">
        <th style="padding: 10px;">Orders number</th>
        <th style="padding: 10px;">Taxe</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 10px;">${orderNumber}</td>
        <td style="padding: 10px;">${taxe}</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td></td>
        <td>
          <div style="display: flex; column-gap: 10px; padding: 0 10px;">
            <p>Total Amount</p>
            <p>${taxe * orderNumber}</p>
          </div>
        </td>
      </tr>
    </tfoot>
  </table>
</div>


</body>
</html>

    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(invoiceData);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="container mx-auto  mt-8">
      <div className="flex">
        <div className="flex w-full transition-all duration-300">
          <div className="w-full">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reference
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      status
                    </th>
                  </>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {invoices.map((invoice) => (
                  <React.Fragment key={invoice.id}>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap cursor-pointer">
                        <div className="truncate max-w-xs font-semibold">
                          {invoice.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-semibold">
                        {invoice.companyName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-semibold">
                        {invoice.orderNumber * taxe}
                      </td>
                      <td
                        className="px-6 py-4 whitespace-nowrap font-semibold"
                        style={{
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            color:
                              invoice.status == "PENDING"
                                ? "#E2B102"
                                : "#07A104",
                          }}
                        >
                          {invoice.status}
                        </div>
                        {showMoreOptions === invoice.id ? (
                          <div
                            className="bg-slate-50 px-2 rounded-lg"
                            style={{
                              position: "absolute",
                              top: "5px",
                              right: "4px",
                              zIndex: "222",
                            }}
                          >
                            <div>
                              <button
                                className="w-40 h-10 px-4 text-lg font-semibold rounded-lg hover:text-white hover:bg-supplair-primary text-start"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowMoreOptions("");
                                  setUpdate(true);
                                  setUpdatedInvoice(invoice);
                                }}
                              >
                                Update
                              </button>
                            </div>
                            <button
                              className="w-40 h-10 px-4 text-lg font-semibold rounded-lg hover:text-white hover:bg-supplair-primary text-start"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePrintInvoice(invoice);
                                setShowMoreOptions("");
                              }}
                            >
                              print invoice
                            </button>
                          </div>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td
                        className="hover:cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (showMoreOptions != invoice.id) {
                            setShowMoreOptions(invoice.id);
                          } else {
                            setShowMoreOptions("");
                          }
                        }}
                      >
                        <img src={showMore} alt="" className="w-6" />
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            {update === true ? (
              <UpdateBillingState
                invoice={updatedInvoice}
                setUpdate={setUpdate}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default BillingTable;
