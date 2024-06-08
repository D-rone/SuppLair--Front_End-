import React, { useState, useEffect } from "react";
import BillingTable from "./BillingTable";

function SuperAdminBilling() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [maxMonth, setMaxMonth] = useState("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const previousMonthDate = new Date(year, month);
    const previousMonth = previousMonthDate.toISOString().substring(0, 7); // Format YYYY-MM

    setMaxMonth(previousMonth);
    setSelectedMonth(previousMonth);
  }, []);

  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div className="absolute top-8 left-0 right-0 mx-auto w-[95%]">
      <div className="flex items-center justify-start gap-x-2">
        <div className="flex items-center relative">
          <h2 className="text-2xl font-bold mr-2">Billing</h2>
        </div>
        <div>
          <label htmlFor="monthPicker"></label>
          <input
            className="color-supplair-primary font-semibold border-2 border-gray-400 rounded p-px"
            type="month"
            id="monthPicker"
            max={maxMonth}
            value={selectedMonth}
            onChange={handleChange}
          />
        </div>
      </div>
      <BillingTable selectedMonth={selectedMonth} />
    </div>
  );
}

export default SuperAdminBilling;
