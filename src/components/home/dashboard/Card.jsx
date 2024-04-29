import React from 'react';

const Card = ({ number, title }) => {
  return (
    <div className="w-44 h-44 bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
      <h2 className="text-md font-medium relative top-1">{title}</h2>
      <div className="text-6xl font-bold">{number}</div>
    </div>
  );
};

export default Card;
