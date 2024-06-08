import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../../../pages/HomePage";

function Billing() {
  const taxe = 500;
  const { userData, setUserData } = useUserContext();

  const [invoices, setinvoices] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/v1/invoices/` + userData.companyName)
      .then((res) => {
        setinvoices(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

    // Create a new window only if the document object is available
    if (typeof window !== "undefined" && window.document) {
      const printWindow = window.open("", "_blank");
      printWindow.document.write(invoiceData);
      printWindow.document.close();
      printWindow.print();
    } else {
      console.error(
        "Cannot open print window: document object is not available"
      );
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center w-full pb-5">
        <h1 className="py-2 px-4 rounded-lg text-4xl m-5 bg-white text-gray-800 font-bold shadow-lg dark:shadow-2xl">
          Billing
        </h1>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex">
          <div className="flex w-full transition-all duration-300">
            <div className="w-full">
              <table className="w-full divide-y divide-gray-200 border border-gray-200 border-2 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        #Reference
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Billing Date
                      </th>

                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3"></th>
                    </>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoices.map((invoice) => (
                    <React.Fragment key={invoice.id}>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold">
                          {invoice.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold">
                          {invoice.date}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap font-semibold">
                          {invoice.orderNumber * taxe}
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap font-semibold"
                          style={{
                            color:
                              invoice.status == "PENDING"
                                ? "#E2B102"
                                : "#07A104",
                          }}
                        >
                          {" "}
                          {invoice.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end items-center">
                          <button
                            className="bg-supplair-primary hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                            onClick={() => handlePrintInvoice(invoice)} // Pass a function reference
                          >
                            Print Invoice
                          </button>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billing;
