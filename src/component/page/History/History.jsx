import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Table ,Spinner} from 'react-bootstrap';
import { format } from 'date-fns';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import './History.scss';
const History = () => {
  const [invoices, setInvoices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);  
  const [loading, setLoading] = useState(true);
  const tokenFromCookie = Cookies.get('token_user');
  let id = null;
  if (tokenFromCookie) {
    const decodedToken = jwt_decode(tokenFromCookie);
    id = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  }

  const fetchInvoicesByUser = async () => {
    setLoading(true); 
  
    try {
      const response = await fetch(`https://localhost:7296/api/invoice/get-invoice/${id}`);
      if (response.ok) {
        const data = await response.json();
        const sortedData = data.sort((a, b) => new Date(b.invoiceDate) - new Date(a.invoiceDate));
        setInvoices(sortedData);
        setLoading(false); 
      } else {
        console.error("Lỗi khi lấy lịch sử đơn hàng");
      }
    } catch (error) {
      console.error("Lỗi server:", error);
      setLoading(false); 
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

  const openModal = (invoice) => {
    setSelectedInvoice(invoice);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const repaymentInvoice = async (invoiceId) => {
    try {
      const response = await fetch(`https://localhost:7296/api/invoice/repayment/${invoiceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ invoiceId: invoiceId }),
      });
      if (response.ok) {
        demoPayment();

        // Cập nhật trạng thái của component sau khi hủy đơn hàng thành công
      } else {
      }
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
    }
  };
  const demoPayment = async (e) => {
    try {
        const amount = "9999999900"; 
        const response = await fetch(`https://localhost:7296/api/Payment?amount=${amount}`);
        if (!response.ok) {
            throw new Error('Failed to fetch payment URL');
        }
        const paymentUrl = await response.text(); // URL thanh toán từ API
        window.location.href = paymentUrl; // Chuyển hướng người dùng đến URL thanh toán
    } catch (error) {
        console.error('Error creating payment URL: ', error);
    }
}
  const cancelInvoice = async (invoiceId) => {
    try {
      const response = await fetch(`https://localhost:7296/api/invoice/cancel/${invoiceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ invoiceId: invoiceId }),
      });
      if (response.ok) {
        setInvoices(prevInvoices => prevInvoices.map(invoice => invoice.invoiceID === invoiceId ? { ...invoice, orderStatus: 'Đã hủy đơn hàng' } : invoice));
        alert('Đơn hàng đã được hủy thành công.');
      } else {
        alert('Có lỗi xảy ra khi hủy đơn hàng.');
      }
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
    }
  };

 
  return (
    <>
      <div style={{marginTop: '120px',marginLeft:'60px',}} className='title'>
        <h1>Lịch sử đặt nhà hàng</h1>
      </div>
      {loading? (
      <div className="overlay">
        <Spinner animation="border" />
      </div>
    ) : null}
      <div style={{ marginTop: '50px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {invoices.map((invoice) => (
          <div style={{ display: 'flex', flex: '0 0 30%', margin: '10px' }} className="invoice-card" key={invoice.invoiceID} onClick={() => openModal(invoice)}>
            <Card style={{ backgroundColor: invoice.orderStatus === 'Đã hủy đơn hàng' ? '#dbdbdb' : 'transparent', width: '100%', boxShadow: '-0.6rem 0.6rem 0 rgba(29, 30, 28, 0.26)', borderRadius: '8px', border: '3px solid black' }}>
              <Card.Body>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h5>Invoice ID: {invoice.invoiceID}</h5>
                  <h8 style={{ color: 'red', fontWeight: 'bolder' }}>{invoice.orderStatus}</h8>
                </div>
                <p>Họ và tên: {invoice.fullName}</p>
                <p>Số điện thoại: {invoice.phoneNumber}</p>
                <p>Chi nhánh: {invoice.branch.name}</p>
                <p>Sảnh cưới: {invoice.hall.name}</p>
                <p>Thòi gian đã đặt: {format(new Date(invoice.invoiceDate), 'dd/MM/yyyy')}</p>
                <p>Ngày tham dự: {format(new Date(invoice.attendanceDate), 'dd/MM/yyyy')}</p>
                <p>Tổng tiền thanh toán: <span className="price">{formatPrice(invoice.total)}</span></p>
                <p>
  {invoice.paymentStatus === false && <span style={{ color: 'red' }}>Chưa thanh toán</span>}
  {invoice.paymentStatus === true && <span style={{ color: 'white', backgroundColor:'green', padding:'10px', borderRadius:'6px' }}> <i style={{marginRight:'5px', fontWeight:'900'}} className="checkmark">✓</i>  Đã thanh toán</span>}
</p>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết hóa đơn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInvoice && (
            <div>
              <h5>Invoice ID: {selectedInvoice.invoiceID}</h5>
              <p>Họ và tên: {selectedInvoice.fullName}</p>
              <p>Số điện thoại: {selectedInvoice.phoneNumber}</p>
              <p>Chi nhánh: {selectedInvoice.branch.name}</p>
              <p>Thòi gian đã đặt: {format(new Date(selectedInvoice.invoiceDate), 'dd/MM/yyyy')}</p>
              <p>Ngày tham dự: {format(new Date(selectedInvoice.attendanceDate), 'dd/MM/yyyy')}</p>
              <p>Sảnh cưới: {selectedInvoice.hall.name}</p>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Hình</th>
                    <th>Tên</th>
                    <th>Giá</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={selectedInvoice.hall.id}>
                    <td style={{ maxWidth: '74px' }}>
                      <img
                        style={{
                          borderRadius: '7px',
                          maxWidth: '100px',
                          maxHeight: '100px',
                          objectFit: 'cover'
                        }}
                        src={selectedInvoice.hall.image}
                      />
                    </td>
                    <td>{selectedInvoice.hall.name}</td>
                    <td><span className="price">{formatPrice(selectedInvoice.hall.price)}</span></td>
                  </tr>
                </tbody>
              </Table>

              <p>Danh sách thực đơn:</p>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Hình</th>
                    <th>Tên</th>
                    <th>Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.orderMenus.map((orderMenu) => (
                    <tr key={orderMenu.orderMenuId}>
                      <td style={{ maxWidth: '100px' }}>
                        <img
                          style={{
                            borderRadius: '7px',
                            maxWidth: '100px',
                            maxHeight: '100px',
                            objectFit: 'cover'
                          }}
                          src={orderMenu.menuEntity.image}
                        />
                      </td>
                      <td>{orderMenu.menuEntity.name}</td>
                      <td><span className="price">{formatPrice(orderMenu.menuEntity.price)}</span></td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <p>Danh sách dịch vụ:</p>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Hình</th>
                    <th>Tên</th>
                    <th>Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.orderServices.map((orderService) => (
                    <tr key={orderService.orderServiceId}>
                      <td style={{ maxWidth: '100px' }}>
                        <img
                          style={{
                            borderRadius: '7px',
                            maxWidth: '100px',
                            maxHeight: '100px',
                            objectFit: 'cover'
                          }}
                          src={orderService.serviceEntity.image}
                        />
                      </td>
                      <td>{orderService.serviceEntity.name}</td>
                      <td><span className="price">{formatPrice(orderService.serviceEntity.price)}</span></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <p>Tổng tiền thanh toán: <span className="price">{formatPrice(selectedInvoice.total)}</span></p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            if (selectedInvoice.paymentStatus === true) {
              alert("Đơn hàng đã thanh toán rồi");
            }
            else  {
              repaymentInvoice(selectedInvoice.invoiceID);
            }
          }}>
                    Thanh toán lại
          </Button>
          <Button variant="secondary" onClick={closeModal}>
            Đóng
          </Button>
          <Button variant="danger" onClick={() => {
            if (selectedInvoice.orderStatus === 'Đã hủy đơn hàng') {
              alert("Đơn hàng đã bị hủy trước đó");
            }
            else if (window.confirm("Xác nhận hủy đơn hàng?")) {
              cancelInvoice(selectedInvoice.invoiceID);
            }
          }}>
            Hủy đơn
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default History;
