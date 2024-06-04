import { BsCartCheck } from 'react-icons/bs';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Modal, Row, Spinner } from 'react-bootstrap';
import Apis, { endpoint } from '../../../config/Apis';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';


const ListMenu = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHalls = async () => {
            try {
                let e = endpoint[`hall`];

                let res = await Apis.get(e)
                setHallData(res.data);

            } catch (error) {
                console.error(error);

            }
        }
        loadHalls();
    }, []);

    const [hallData, setHallData] = useState([]);
    // ======
    const [searchResult, setSearchResult] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault(); // Ngăn chặn sự kiện gửi form mặc định

        // Lấy giá trị từ input tìm kiếm
        const searchKeyword = e.target.kw.value.toLowerCase();

        // Sử dụng hàm filter để tìm kiếm trong danh sách menu
        const searchResults = hallData.filter(item =>
            item.name.toLowerCase().includes(searchKeyword)
        );

        // Cập nhật trạng thái searchResult với kết quả tìm kiếm
        setSearchResult(searchResults);
    };
    function formatPrice(price) {
        const formattedPrice = price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND"
        });
        return formattedPrice;
    }

    const [bookedHalls, setBookedHalls] = useState([]);
    const fetchBookedHalls = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://localhost:7296/api/invoice/booked-hall`);
            if (response.ok) {
                const data = await response.json();

                // Sắp xếp danh sách theo BookingDate tăng dần
                data.sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate));

                setBookedHalls(data);
                setLoading(false);

            } else {
                setLoading(false);
                console.error("Lỗi khi lấy danh sách sảnh đã đặt");
            }
        } catch (error) {
            console.error("Lỗi server:", error);
        }
    };

    useEffect(() => {
        fetchBookedHalls();
    }, []);
    const [selectedService, setSelectedService] = useState(null);

    const [showModal, setShowModal] = useState(false);

    // mở modal
    const openModal = () => {
        console.log('Opening modal with:', selectedService);
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const filteredHalls = bookedHalls.filter((hall) => {
        if (!selectedDate) {
            return true;
        }
        const bookingDate = new Date(hall.bookingDate);
        return (
            bookingDate.getFullYear() === selectedDate.getFullYear() &&
            bookingDate.getMonth() === selectedDate.getMonth() &&
            bookingDate.getDate() === selectedDate.getDate()
        );
    });

    return (
        <>

            <div className='tilte'>
                <h1>Danh Sách Sảnh Cưới</h1>
                {loading ? (
                    <div className="overlay">
                        <Spinner animation="border" />
                    </div>
                ) : null}

                <Form className="filter d-flex" onSubmit={handleSearch}>
                    <Form.Control
                        type="text"
                        placeholder="Nhập sảnh cưới bạn muốn tìm kiếm"
                        name="kw"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button type='submit'>Tìm</Button>
                </Form>
            </div>
            <Row className='listmenu'>
                {searchResult.length > 0 ? (
                    searchResult.map(hallItem => (
                        <Col xs={12} md={3} className='mt-3' key={hallItem.hallId}>
                            <Card className='card' style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={hallItem.image} className="custom-img" />
                                <Card.Body>
                                    <Card.Title>{hallItem.name}</Card.Title>
                                    <Card.Text>
                                        {hallItem.description}
                                    </Card.Text>
                                    <Card.Text>
                                        {hallItem.capacity}
                                    </Card.Text>
                                    <Card.Text>
                                        {formatPrice(hallItem.price)}
                                    </Card.Text>
                                    <Link to="/bill" >
                                        <Button className='btndetail' variant="primary" style={{ background: 'linear-gradient(90deg, #FE8E5C 0%, #F5576C 100%)', border: 'white', fontWeight: 'bold' }}>
                                            <BsCartCheck style={{marginBottom:'5px'}} />Đặt Đơn
                                        </Button>
                                    </Link>
                                    <Button
                                        className='btndetail'
                                        variant="primary"
                                        onClick={() => {
                                            setSelectedService(hallItem);
                                            openModal();
                                        }}
                                        style={{ background: 'linear-gradient(90deg, #FE8E5C 0%, #F5576C 100%)', border: 'white', fontWeight: 'bold' }}
                                    >
                                        Xem Chi Tiết
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    hallData.map(hallItem => (
                        <Col xs={12} md={3} className='mt-3' key={hallItem.hallId}>
                            <Card className='card' style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={hallItem.image} className="custom-img" />
                                <Card.Body>
                                    <Card.Title>{hallItem.name}</Card.Title>

                                    <Card.Text>
                                        Số khách tham gia tối đa: {hallItem.capacity}
                                    </Card.Text>
                                    <Card.Text>
                                        Giá sảnh cưới: {formatPrice(hallItem.price)}
                                    </Card.Text>
                                    <Link to="/bill" >
                                        <Button className='btndetail' variant="primary" style={{ background: 'linear-gradient(90deg, #FE8E5C 0%, #F5576C 100%)', border: 'white', fontWeight: 'bold' }}>
                                            <BsCartCheck style={{marginBottom:'5px'}} />Đặt Đơn
                                        </Button>
                                    </Link>
                                    <Button
                                        className='btndetail'
                                        variant="primary"
                                        onClick={() => {
                                            setSelectedService(hallItem);
                                            openModal();
                                        }}
                                        style={{ background: 'linear-gradient(90deg, #FE8E5C 0%, #F5576C 100%)', border: 'white', fontWeight: 'bold' }}
                                    >
                                        Xem Chi Tiết
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
            <Modal show={showModal} onHide={closeModal} style={{textAlign:'center'}}>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết sảnh cưới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedService && (
                        <div>
                            <img src={selectedService.image} className="custom-img"></img>
                            <h3>{selectedService.name}</h3>
                            <p>Giá sảnh cưới: {formatPrice(selectedService.price)}</p>
                            <p>Mô tả: {selectedService.description}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="container mt-4">
                <div className="title text-center mb-4">
                    <h1>Danh sách sảnh đã có người đặt</h1>
                </div>
                <div className="row mb-4">
                    <div className="col-md-12">
                        <label htmlFor="selectedDate" className="form-label">Chọn ngày:</label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            className="form-control"
                            placeholderText="Chọn ngày"
                            isClearable
                        />
                    </div>
                </div>
                <div className="row">
                    {filteredHalls.map((hall) => (
                        <div key={hall.HallId} className="col-md-4 mb-4">
                            <div className="card shadow-sm">
                                <div className="card-header bg-primary text-white" style={{ background: 'linear-gradient(90deg, #FE8E5C 0%, #F5576C 100%)' }}>
                                    <h5 className="mb-0" style={{ textAlign: 'center' }} >{hall.hallName}</h5>
                                </div>
                                <div className="card-body">
                                    <h6 className="card-subtitle mb-2 text-muted">Chi nhánh: {hall.branchName}</h6>
                                    <p className="card-text">Ngày đặt: {format(new Date(hall.bookingDate), 'dd/MM/yyyy')}</p>
                                </div>
                              
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default ListMenu;