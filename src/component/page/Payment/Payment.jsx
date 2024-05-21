import React from 'react';

const Payment = () => {
  // Định nghĩa các đối tượng style trực tiếp
  const cardStyle = {
    background: 'white',
    padding: '60px',
    borderRadius: '4px',
    boxShadow: '0 2px 3px #C8D0D8',
    display: 'inline-block',
    margin: '0 auto',
boxShadow: '9px 4px 7px -5px rgba(0,0,0,0.47)',
boxShadow: '-0.6rem 0.6rem 0 rgba(29, 30, 28, 0.26)',
border: '3px solid black',
    marginBottom:'7px',
  };

  const checkmarkStyle = {
    display: 'flex',
justifyContent:'center',
    borderRadius: '200px',
    height: '200px',
    width: '200px',
    backgroundColor: '#F8FAF5',
    margin: '0 auto'
  };

  const iconStyle = {
    color: '#9ABC66',
    fontSize: '100px',
    lineHeight: '200px',
    marginLeft: '-15px'
  };

  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center",height:"90vh", marginTop:"100px"}}>
      <div style={cardStyle}>
        <div style={checkmarkStyle}>
          <i className="checkmark" style={iconStyle}>✓</i>
        </div>
        <h1>Thành công</h1>
        <p>Cảm ơn đã thanh toán<br/>chúc một ngày tốt lành!</p>
      </div>
    </div>
  );
};

export default Payment;
