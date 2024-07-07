import React, { useEffect, useState } from 'react';

const Payment = () => {
  const [orderSent, setOrderSent] = useState(false); // State để kiểm tra xem đơn hàng đã được gửi chưa
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái loading
  const [error, setError] = useState(false); // State để quản lý trạng thái lỗi

  // Định nghĩa các đối tượng style trực tiếp
  const cardStyle = {
    background: 'white',
    padding: '60px',
    borderRadius: '4px',
    boxShadow: '0 2px 3px #C8D0D8',
    display: 'inline-block',
    margin: '0 auto',
    border: '5px solid black',
    marginBottom: '7px',
    textAlign: 'center'
  };

  const checkmarkStyle = {
    display: 'flex',
    justifyContent: 'center',
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

  const errorIconStyle = {
    color: '#D9534F',
    fontSize: '100px',
    lineHeight: '200px',
    marginLeft: '-15px'
  };

  useEffect(() => {
    if (!orderSent) { 
      const timer = setTimeout(() => {
      const storedInvoiceId = localStorage.getItem('invoiceId');
      if(storedInvoiceId != null){
        paymentCompelete();
      }
      else{
        sendOrderData();
      }
      }, 5000);

      
      return () => clearTimeout(timer);
    }
  }, [orderSent]);


  const paymentCompelete = () => {
    const storedInvoiceId = localStorage.getItem('invoiceId');

    if (storedInvoiceId) {
      const invoiceId = JSON.parse(storedInvoiceId);

      fetch(`https://webapi-netcore.azurewebsites.net/api/invoice/repayment-compelete/${invoiceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceId),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Đã gửi đơn hàng thành công:', data);
          setOrderSent(true); // Cập nhật state khi gửi đơn hàng thành công
          setLoading(false); // Cập nhật state để ẩn loading
          localStorage.removeItem('invoiceId'); // Xóa dữ liệu đơn hàng trong localStorage
        })
        .catch(error => {
          console.error('Lỗi khi gửi đơn hàng:', error);
          setLoading(false); //  ẩn loading khi gặp lỗi
          setError(true); // Cập nhật state để hiển thị lỗi
          localStorage.removeItem('invoiceId'); // Xóa dữ liệu đơn hàng trong localStorage khi gặp lỗi
        });
    } else {
      console.error('Không có dữ liệu đơn hàng trong localStorage');
      setLoading(false); // Cập nhật state để ẩn loading ngay cả khi không có dữ liệu
      setError(true); // Cập nhật state để hiển thị lỗi
    }
  };


  const sendOrderData = () => {
    const storedOrderData = localStorage.getItem('orderData');
    if (storedOrderData) {
      const orderData = JSON.parse(storedOrderData);

      fetch('https://webapi-netcore.azurewebsites.net/api/invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Đã gửi đơn hàng thành công:', data);
          setOrderSent(true); // Cập nhật state khi gửi đơn hàng thành công
          setLoading(false); // Cập nhật state để ẩn loading
          localStorage.removeItem('orderData'); // Xóa dữ liệu đơn hàng trong localStorage
        })
        .catch(error => {
          console.error('Lỗi khi gửi đơn hàng:', error);
          setLoading(false); //  ẩn loading khi gặp lỗi
          setError(true); // Cập nhật state để hiển thị lỗi
          localStorage.removeItem('orderData'); // Xóa dữ liệu đơn hàng trong localStorage khi gặp lỗi
        });
    } else {
      console.error('Không có dữ liệu đơn hàng trong localStorage');
      setLoading(false); // Cập nhật state để ẩn loading ngay cả khi không có dữ liệu
      setError(true); // Cập nhật state để hiển thị lỗi
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh", marginTop: "100px" }}>
      <div style={cardStyle}>
        {loading ? (
          <div>
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
            <h3>Đang xử lý thanh toán, vui lòng đợi...</h3>
          </div>
        ) : error ? (
          <>
            <div style={checkmarkStyle}>
              <i className="checkmark" style={errorIconStyle}>✗</i>
            </div>
            <h1>Thanh toán thất bại</h1>
            <h4>Đã xảy ra lỗi, vui lòng thử lại.</h4>
          </>
        ) : (
          <>
            <div style={checkmarkStyle}>
              <i className="checkmark" style={iconStyle}>✓</i>
            </div>
            <h1>Thành công</h1>
            <h4>Cảm ơn đã thanh toán<br />chúc một ngày tốt lành!</h4>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
