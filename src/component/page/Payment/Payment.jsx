import React, { useEffect, useState } from "react";

const Payment = () => {
  const [orderSent, setOrderSent] = useState(false); // kiểm tra xem đơn hàng đã được gửi chưa
  const [loading, setLoading] = useState(true); //  trạng thái loading
  const [error, setError] = useState(false); //  trạng thái lỗi

  const cardStyle = {
    background: "white",
    padding: "60px",
    borderRadius: "4px",
    boxShadow: "0 2px 3px #C8D0D8",
    display: "inline-block",
    margin: "0 auto",
    border: "5px solid black",
    marginBottom: "7px",
    textAlign: "center",
  };

  const checkmarkStyle = {
    display: "flex",
    justifyContent: "center",
    borderRadius: "200px",
    height: "200px",
    width: "200px",
    backgroundColor: "#F8FAF5",
    margin: "0 auto",
  };

  const iconStyle = {
    color: "#9ABC66",
    fontSize: "100px",
    lineHeight: "200px",
    marginLeft: "-15px",
  };

  const errorIconStyle = {
    color: "#D9534F",
    fontSize: "100px",
    lineHeight: "200px",
    marginLeft: "-15px",
  };

  useEffect(() => {
    if (!orderSent) {
      const timer = setTimeout(() => {
        const storedInvoiceId = localStorage.getItem("invoiceId");
        if (storedInvoiceId != null) {
          paymentCompelete();
        } else {
          sendOrderData();
        }
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [orderSent]);

  const paymentCompelete = () => {
    const storedInvoiceId = localStorage.getItem("invoiceId");

    if (storedInvoiceId) {
      const invoiceId = JSON.parse(storedInvoiceId);

      fetch(
        `https://api-wedding.runasp.net/api/invoice/repayment-compelete/${invoiceId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(invoiceId),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Đã gửi đơn hàng thành công:", data);
          setOrderSent(true);
          setLoading(false);
          localStorage.removeItem("invoiceId");
        })
        .catch((error) => {
          console.error("Lỗi khi gửi đơn hàng:", error);
          setLoading(false);
          setError(true);
          localStorage.removeItem("invoiceId");
        });
    } else {
      console.error("Không có dữ liệu đơn hàng trong localStorage");
      setLoading(false);
      setError(true);
    }
  };

  const sendOrderData = () => {
    const storedOrderData = localStorage.getItem("orderData");
    if (storedOrderData) {
      const orderData = JSON.parse(storedOrderData);

      fetch("https://api-wedding.runasp.net/api/invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Đã gửi đơn hàng thành công:", data);
          setOrderSent(true);
          setLoading(false);
          localStorage.removeItem("orderData");
          localStorage.removeItem("selectedBranchId");
          localStorage.removeItem("fullName");
          localStorage.removeItem("selectedValue");
          localStorage.removeItem("selectedHalls");
          localStorage.removeItem("selectedHallId");
          localStorage.removeItem("selectedServices");
          localStorage.removeItem("selectedMenus");
          localStorage.removeItem("note");
          localStorage.removeItem("selectedDate");
          localStorage.removeItem("phoneNumber");
        })
        .catch((error) => {
          console.error("Lỗi khi gửi đơn hàng:", error);
          setLoading(false);
          setError(true);
          localStorage.removeItem("orderData");
        });
    } else {
      console.error("Không có dữ liệu đơn hàng trong localStorage");
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        marginTop: "100px",
      }}
    >
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
              <i className="checkmark" style={errorIconStyle}>
                ✗
              </i>
            </div>
            <h1>Thanh toán thất bại</h1>
            <h4>Đã xảy ra lỗi, vui lòng thử lại.</h4>
          </>
        ) : (
          <>
            <div style={checkmarkStyle}>
              <i className="checkmark" style={iconStyle}>
                ✓
              </i>
            </div>
            <h1>Thành công</h1>
            <h4>
              Cảm ơn đã thanh toán
              <br />
              chúc một ngày tốt lành!
            </h4>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
