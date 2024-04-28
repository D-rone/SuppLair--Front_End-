import React from 'react';

const TitleCard = ({ title, subtitle, children }) => {
  const cardStyle = {
    backgroundColor: '#fff',
    boxShadow: '10 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '20px',
    padding: '16px',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '0',
    marginBottom: '0',
  };



  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>{title}</h2>
      
    </div>
  );
};

export default TitleCard;
