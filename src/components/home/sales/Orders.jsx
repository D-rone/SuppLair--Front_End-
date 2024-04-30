import React from 'react'
import OrdersTable from './OrdersTable'

function Orders() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center w-full pb-5">
      <h1 className="py-2 px-4 rounded-lg text-4xl m-5 bg-white text-gray-800 font-bold shadow-lg dark:shadow-2x">
        Orders
      </h1>
     
    </div>
      <OrdersTable></OrdersTable>
    </div>
  )
}

export default Orders