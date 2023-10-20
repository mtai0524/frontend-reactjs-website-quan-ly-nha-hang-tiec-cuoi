import { BsCartCheck } from 'react-icons/bs';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import Apis, { endpoint } from '../../../config/Apis';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import './History.scss';

const History = () => {

  const [invoices, setInvoices] = useState([]);

  const tokenFromCookie = Cookies.get('token_user');
  let id = null;
  if (tokenFromCookie) {
    const decodedToken = jwt_decode(tokenFromCookie);
    id = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  }

  const fetchInvoicesByUser = async () => {
    try {
      const response = await fetch(`https://localhost:7296/api/invoice/get-invoice/${id}`);
      if (response.ok) {
        const data = await response.json();
        setInvoices(data);
      } else {
        console.error("Lỗi khi lấy lịch sử đơn hàng");
      }
    } catch (error) {
      console.error("Lỗi server:", error);
    }
  };

  useEffect(() => {
    fetchInvoicesByUser();
  }, []);
  function formatPrice(price) {
    const formattedPrice = price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND"
    });
    return formattedPrice;
}
  return (
    <>
      <div style={{ marginTop: '120px' }}>
      {invoices.map((invoice) => (
          <div className="invoice-card" key={invoice.invoiceID}>
          <Card>
              <Card.Body>
                  <h5>Invoice ID: {invoice.invoiceID}</h5>
                  <p>Họ và tên: {invoice.fullName}</p>
                  <p>Số điện thoại: {invoice.phoneNumber}</p>
      
                  <p>Chi nhánh: {invoice.branch.name}</p>
                  <p>Sảnh cưới: {invoice.hall.name}</p>
                  <p>Ngày tham dự: {format(new Date(invoice.attendanceDate), 'dd/MM/yyyy')}</p>
      
                  <p>Tổng tiền thanh toán: <span className="price">{formatPrice(invoice.total)}</span></p>

                  <ul>
                      {invoice.orderMenus.map((orderMenu) => (
                          <li key={orderMenu.orderMenuId}>
                              Thực đơn: {orderMenu.menuEntity.name}, Giá: <span className="price">{formatPrice(orderMenu.menuEntity.price)}</span>
                          </li>
                      ))}
                      {invoice.orderServices.map((orderService) => (
                          <li key={orderService.orderServiceId}>
                              Dịch vụ: {orderService.serviceEntity.name}, Giá: <span className="price">{formatPrice(orderService.serviceEntity.price)}</span>
                          </li>
                      ))}
                  </ul>
              </Card.Body>
          </Card>
      </div>
      
        ))}
      </div>
    </>
  )
}
export default History;