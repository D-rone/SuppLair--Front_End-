import React from 'react';
import Card from './Card';

function Dashboard() {
  return (
    <div className="flex flex-col w-full">
      <h1 className=" w-fit py-2 px-4 rounded-lg text-4xl m-5 bg-white text-gray-800 font-bold shadow-lg dark:shadow-2x">
        Dashboard
      </h1>
      
      
      <div className=" ml-5">
        <h1 className="w-fit py-2 px-4 rounded-lg text-2xl  bg-white text-gray-800 font-bold shadow-lg dark:shadow-2x mb-3">Orders</h1>
        <div className="flex flex-wrap justify-center">
          <Card number={17} title="New Orders" />
          <Card number={285} title="Total Orders" />
          <Card number={34} title="Orders per Month" />
          <Card number={3} title="Not Delivered" />
        </div>
      </div>
      <div className=" ml-5">
        <h1 className="w-fit py-2 px-4 rounded-lg text-2xl m-5 bg-white text-gray-800 font-bold shadow-lg dark:shadow-2x mb-3">Annoucements and deals </h1>
        <p className="w-fit py-2 px-4 rounded-lg text-xl mx-14 bg-supplair-secondary text-white font-medium shadow-lg dark:shadow-2x mb-3">Sagittis scelerisque suspendisse eu pellentesque feugiat pellentesque. Lacinia leo elit posuere pretium ullamcorper sagittis.
        Sagittis scelerisque suspendisse eu pellentesque feugiat pellentesque. Lacinia leo elit posuere pretium ullamcorper sagittis.
         </p>
        
      </div>
      <div className=" ml-5">
        <h1 className="w-fit py-2 px-4 rounded-lg text-2xl m-5 bg-white text-gray-800 font-bold shadow-lg dark:shadow-2x mb-3">Products</h1>
        <div className="flex flex-wrap justify-center">
          <Card className=" ml-5" number={17} title="Products to restock" />
          <Card className=" ml-5" number={285} title="All products" />
          <Card className=" ml-5" number={34} title="Products Group " />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
