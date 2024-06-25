import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Table ,Spinner} from 'react-bootstrap';
import { format } from 'date-fns';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';

import './History.scss';
const History = () => {
  const [invoices, setInvoices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);  
  const [loading, setLoading] = useState(true);
  const tokenFromCookie = Cookies.get('token_user');
  const [isProcessingPaymentWallet, setIsProcessingPaymentWallet] = useState(false);

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


  const repaymentInvoiceCoin = async (invoiceId) => {
    localStorage.setItem('invoiceId', invoiceId);

    try {
      const response = await fetch(`https://localhost:7296/api/invoice/check-repayment/${invoiceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ invoiceId: invoiceId }),
      });
      if (response.ok) {
        afterPaymentCoint();
       openModalPaymentCoin();
        // Cập nhật trạng thái của component sau khi hủy đơn hàng thành công
      } else {
          // Hóa đơn trùng lặp
          const data = await response.json();
          toast.error(data.message, {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
          });
          localStorage.removeItem('invoiceId');
      }
    } catch (error) {
      
    }
  };


  const repaymentInvoice = async (invoiceId) => {
    localStorage.setItem('invoiceId', invoiceId);

    try {
      const response = await fetch(`https://localhost:7296/api/invoice/check-repayment/${invoiceId}`, {
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
          // Hóa đơn trùng lặp
          const data = await response.json();
          toast.error(data.message, {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
          });
          localStorage.removeItem('invoiceId');
      }
    } catch (error) {
      
    }
  };
  const demoPayment = async (e) => {
    try {
      localStorage.removeItem('orderData');
        const paymentCompelete = selectedInvoice.total - selectedInvoice.depositPayment ;
        const amount = paymentCompelete +"00";
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
        closeModal();
      } else {
        alert('Có lỗi xảy ra khi hủy đơn hàng.');
      }
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
    }
  };

  const [wallet, setWallet] = useState(null);

  const [paymentCoin, setPaymentCoin] = useState([]);
  const afterPaymentCoint = async () => {
      if(wallet != null){

          var coin = wallet.coin ;
          var orderTolal = selectedInvoice.total / 2;
          if((coin - orderTolal) < 0){
              setPaymentCoin("Không đủ số dư");
          }
          else{
              setPaymentCoin(coin - orderTolal);
          }
      }

  }  
  const [showModalPaymentWallet, setShowModalPaymentWallet] = useState(false);

  

  const openModalPaymentCoin = () => {
    closeModal();
          setShowModalPaymentWallet(true);
          fetchWallet();
          afterPaymentCoint();
  }
  const closeModalPaymentCoin = () => {
    afterPaymentCoint();

      fetchWallet();
      setShowModalPaymentWallet(false);
  }
 
  const fetchWallet = async () => {
      try {
        const response = await fetch(`https://localhost:7296/api/wallet/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch wallet info');
        }
        const data = await response.json();
        setWallet(data);
      } catch (error) {
        console.error('Error fetching wallet info:', error);
      }
    };
    const handlePaymentWalletOrderData = () => {
      paymentCompeleteWallet();
    };

    const paymentCompeleteWallet = () => {
      setIsProcessingPaymentWallet(true);
    
      setTimeout(() => {
        const storedInvoiceId = localStorage.getItem('invoiceId');
    
        if (storedInvoiceId) {
          const invoiceId = JSON.parse(storedInvoiceId);
    
          fetch(`https://localhost:7296/api/invoice/repayment-compelete-wallet/${invoiceId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(invoiceId),
          })
          .then(response => {
             if (!response.ok) {
               throw new Error('Bad Request');
             }
             return response.json();
           })
          .then(data => {
              setIsProcessingPaymentWallet(false);
              closeModalPaymentCoin();
              fetchInvoicesByUser();
              localStorage.removeItem('invoiceId'); // Xóa dữ liệu đơn hàng trong localStorage
              toast.success('Thanh toán bằng ví thành công', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
            })
          .catch(error => {
              setIsProcessingPaymentWallet(false);
    
              if (error.message === 'Bad Request') {
                console.error('số dư không đủ:', error);
                toast.error('Thanh toán thất bại. Vui lòng thử lại sau.', {
                  position: 'top-right',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                });
              } else {
                console.error('Lỗi không xác định:', error);
              }
              localStorage.removeItem('invoiceId'); // Xóa dữ liệu đơn hàng trong localStorage khi gặp lỗi
            });
        } else {
          setIsProcessingPaymentWallet(false);
          toast.error('Thanh toán thất bại. Vui lòng thử lại sau.', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          console.error('Không có dữ liệu đơn hàng trong localStorage');
        }
      }, 2000);
    };
    
    
  return (
    <>
      <div style={{marginTop: '120px', marginLeft:'60px',}} className='title'>
        <h1>Lịch sử đặt nhà hàng</h1>
    </div>
    {loading? (
        <div className="overlay">
            <Spinner animation="border" />
        </div>
    ) : invoices.length > 0? (
        <div style={{ marginTop: '50px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {invoices.map((invoice) =>
                <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }} className="invoice-card" key={invoice.invoiceID} onClick={() => openModal(invoice)}>
                    <Card style={{ backgroundColor: invoice.orderStatus === 'Đã hủy đơn hàng'? '#dbdbdb' : 'transparent', width: '90%',  borderRadius: '8px', border: '3px solid black' }}>
                    <Card.Body>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h5>Mã hóa đơn: {invoice.invoiceID}</h5>
                            <h8 style={{ color: 'red', fontWeight: 'bolder' }}>{invoice.orderStatus}</h8>
                        </div>
                        <p>Họ và tên: {invoice.fullName}</p>
                        <p>Số điện thoại: {invoice.phoneNumber}</p>
                        <p>Chi nhánh: {invoice.branch.name}</p>
                        <p>Sảnh cưới: {invoice.hall.name}</p>
                        <p>Thời gian đã đặt: {format(new Date(invoice.invoiceDate), 'dd/MM/yyyy')}</p>
                        <p>Ngày tham dự: {format(new Date(invoice.attendanceDate), 'dd/MM/yyyy')}</p>
                        <p>Tổng tiền cần thanh toán: <span className="price">{formatPrice(invoice.total)}</span></p>
                        <p>Tổng tiền đã đặt cọc: <span className="price">{ invoice.depositPayment? formatPrice(invoice.depositPayment) : 'Chưa đặt cọc'}</span></p>
                        <p>
                            {invoice.paymentStatus === false && <span style={{ color: 'white', backgroundColor:'black', padding:'10px', borderRadius:'6px' }}>{invoice.paymentWallet? 'Đã đặt cọc bằng ví' : 'Đã đặt cọc bằng vnpay'} </span>}
                            {invoice.paymentStatus === true && <span style={{ color: 'white', backgroundColor:'green', padding:'10px', borderRadius:'6px' }}> <i style={{marginRight:'5px', fontWeight:'900'}} className="checkmark">✓</i> {invoice.paymentCompleteWallet === true? 'Đã hoàn tất thanh toán bằng ví' : 'Đã hoàn tất thanh toán bằng VNPAY'}</span>}
                        </p>
                    </Card.Body>
                    </Card>
                </div>
            )}
        </div>
    ) : (
        <div className="container emp-profile" style={{ marginTop:'40px' ,border: '3px solid black'}}>
            <p style={{textAlign:'center', verticalAlign:'center',padding:'20px', marginTop:'10px',fontWeight:'bolder'}}>Người dùng chưa đăng nhập hoặc không có hóa đơn nào</p>
        </div>
    )}

      {/* Modal */}
      <Modal scrollable size="lg" centered show={showModal} onHide={closeModal} >
        <Modal.Header closeButton>
          <Modal.Title>Chi tiết hóa đơn</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          {selectedInvoice && (
            <div>
              <h5>Mã hóa đơn: {selectedInvoice.invoiceID}</h5>
              <p>Họ và tên: {selectedInvoice.fullName}</p>
              <p>Số điện thoại: {selectedInvoice.phoneNumber}</p>
              <p>Ghi chú: {selectedInvoice.note}</p>

              <p>Chi nhánh: {selectedInvoice.branch.name}</p>
              <p>Thòi gian đã đặt: {format(new Date(selectedInvoice.invoiceDate), 'dd/MM/yyyy')}</p>
              <p>Ngày tham dự: {format(new Date(selectedInvoice.attendanceDate), 'dd/MM/yyyy')}</p>
              <p>Sảnh cưới: {selectedInvoice.hall.name}</p>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={{ width: '150px'}}>Hình</th>
                    <th  style={{ width: '300px'}}>Tên</th>
                    <th>Giá</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={selectedInvoice.hall.id}>
                  <td style={{ width: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <img
    style={{
      borderRadius: '7px',
      maxWidth: '120px',
      maxHeight: '120px',
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
                    <th style={{ width: '150px'}}>Hình</th>
                    <th  style={{ width: '300px'}}>Tên</th>
                    <th>Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.orderMenus.map((orderMenu) => (
                    <tr key={orderMenu.orderMenuId}>
                      <td style={{ width: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img
                          style={{
                            borderRadius: '7px',
                            maxWidth: '120px',
                            maxHeight: '120px',
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
                    <th style={{ width: '150px'}}>Hình</th>
                    <th  style={{ width: '300px'}}>Tên</th>

                    <th>Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.orderServices.map((orderService) => (
                    <tr key={orderService.orderServiceId}>
                    <td style={{ width: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img
                          style={{
                            borderRadius: '7px',
                            maxWidth: '120px',
                            maxHeight: '120px',
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
        <Modal.Footer style={{display:'flex', justifyContent:'space-between'}}>
        
        <div>

        <Button variant="secondary" onClick={closeModal}>
            Đóng
          </Button>
          <Button style={{marginLeft:'5px'}} variant="danger" onClick={() => {
            if (selectedInvoice.orderStatus === 'Đã hủy đơn hàng') {
              alert("Đơn hàng đã bị hủy trước đó");
            }
            else if (window.confirm("Xác nhận hủy đơn hàng?\n\nSố tiền đối với đơn hàng đã thanh toán sẽ được hoàn về dạng coin trong phần thông tin cá nhân")) {
              cancelInvoice(selectedInvoice.invoiceID);
              toast.success(`Đã hoàn tiền về dạng coin`, {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
        });
            }
          }}>
            Hủy đơn
          </Button>
        </div>
<div>

          <Button className='btn btn-success' style={{marginRight:'5px'}} variant="secondary" onClick={() => {
            if (selectedInvoice.paymentStatus === true) {
              alert("Đơn hàng đã thanh toán rồi");
            }
            else  {
              repaymentInvoice(selectedInvoice.invoiceID);
            }
          }}>
                    Thanh toán đầy đủ với <b>VNPAY</b>
          </Button>

          <Button className='btn btn-dark' style={{marginRight:'5px'}} variant="secondary" onClick={() => {
            if (selectedInvoice.paymentStatus === true) {
              alert("Đơn hàng đã thanh toán rồi");
            }
            else  {
              repaymentInvoiceCoin(selectedInvoice.invoiceID);
            }
          }}>
                    Thanh toán đầy đủ với <b> coin</b>
          </Button>
         
         
</div>

        </Modal.Footer>
      </Modal>



      <Modal scrollable size="lg" centered show={showModalPaymentWallet} onHide={closeModalPaymentCoin}>
    <Modal.Header closeButton>
        <Modal.Title>Thanh toán bằng wallet coin</Modal.Title>
    </Modal.Header>
    <Modal.Body style={{height:'200px'}} >
    {wallet ? (
        <>
            <h2>Số coin trong wallet: <b style={{color:'red'}}>{wallet.coin ? formatPrice(wallet.coin) : "0đ"}</b></h2>
            <h2>Đơn hàng có giá trị: {formatPrice(selectedInvoice.total / 2)}</h2>
            <h2>Số coin sau khi thanh toán:  
     {wallet.coin >= selectedInvoice.total / 2? 
         formatPrice(wallet.coin - (selectedInvoice.total / 2)) : 
        " Không đủ coin"}
</h2>

        </>
                ): <h2><b style={{color:'red'}}>Không thể thanh toán do không có wallet</b></h2>}
        
     </Modal.Body>
    <Modal.Footer>
<button onClick={closeModalPaymentCoin} className='btn btn-secondary'>Đóng</button>
<Button className='btn btn-primary' onClick={handlePaymentWalletOrderData} disabled={isProcessingPaymentWallet} >
        {isProcessingPaymentWallet ? (
          <>
            <div className="spinner-border spinner-border-sm" role="status">
              <span className="visually-hidden">Đang thanh toán...</span>
            </div>
            <span className="ms-2">Thanh toán...</span>
          </>
        ) : (
          'Xác nhận thanh toán'
        )}
      </Button>

    </Modal.Footer>
    </Modal>
    </>
  );
};

export default History;
