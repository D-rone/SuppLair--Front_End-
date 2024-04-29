import React from 'react';

const Card = ({ number, title }) => {
  return (
    <div className="ml-5 w-64 h-64 bg-white rounded-lg shadow-md flex flex-col justify-center items-center border-2 border-supplair-secondary">
      <h2 className="text-md font-medium relative top-0">{title}</h2>
      <div className="text-6xl font-bold">{number}</div>
    </div>
  );
};

export default Card;
