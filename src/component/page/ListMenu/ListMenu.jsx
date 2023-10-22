import './ListMenu.scss'
import { BsCartCheck } from 'react-icons/bs';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
import Apis, { endpoint } from '../../../config/Apis';
import { Link } from 'react-router-dom';



const ListMenu = () => {


    useEffect(() => {
        const loadMenus = async () => {
            try {
                let e = endpoint[`menu`];

                let res = await Apis.get(e)
                setMenus(res.data);

            } catch (error) {
                console.error(error);

            }
        }
        loadMenus();
    }, []);

    const [menu, setMenus] = useState([])
    // ======
    const [searchResult, setSearchResult] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault(); // Ngăn chặn sự kiện gửi form mặc định

        // Lấy giá trị từ input tìm kiếm
        const searchKeyword = e.target.kw.value.toLowerCase();

        // Sử dụng hàm filter để tìm kiếm trong danh sách menu
        const searchResults = menu.filter(item =>
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
    return (

        <>
            <div className='tilte'>
                <h1>Danh Sách Thực Đơn</h1>


                <Form className="filter d-flex" onSubmit={handleSearch}>
                    <Form.Control
                        type="text"
                        placeholder="Nhập món ăn bạn muốn tìm kiếm"
                        name="kw"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button type='submit'>Tìm</Button>
                </Form>
            </div>

            <Modal show={showModal} onHide={closeModal} size="sm">
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết dịch vụ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedService && (
                        <div>
                            <img src={selectedService.image} className="custom-img"></img>
                            <h3>{selectedService.name}</h3>
                            <p>Giá thực đơn: {formatPrice(selectedService.price)}</p>
                            <p>Mô tả: {selectedService.description}</p>
                            {/* Add more service details as needed */}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row className='listmenu'>
                {searchResult.length > 0 ? (
                    searchResult.map(menuItem => (
                        <Col xs={12} md={3} className='mt-3'>
                            <Card className='card' style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={menuItem.image} className="custom-img" />
                                <Card.Body>
                                    <Card.Title>{menuItem.name}</Card.Title>
                                    <Card.Text>
                                    Giá món ăn: {formatPrice(menuItem.price)}
                                    </Card.Text>
                                    <Link to="/bill"><Button variant="primary"><BsCartCheck />Đặt Đơn</Button></Link>
                                    <Button
                                        className='btndetail'
                                        variant="primary"
                                        onClick={() => {
                                            setSelectedService(menuItem);
                                            openModal();
                                        }}
                                    >
                                        Xem Chi Tiết
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    menu.map(menuItem => (
                        <Col xs={12} md={3} className='mt-3'>
                            <Card className='card' style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={menuItem.image} className="custom-img" />
                                <Card.Body>
                                <Card.Title>{menuItem.name}</Card.Title>
                                    <Card.Text>
                                    Giá món ăn: {formatPrice(menuItem.price)}
                                    </Card.Text>
                                    <Link to="/bill"><Button variant="primary"><BsCartCheck />Đặt Đơn</Button></Link>
                                    <Button
                                        className='btndetail'
                                        variant="primary"
                                        onClick={() => {
                                            setSelectedService(menuItem);
                                            openModal();
                                        }}
                                    >
                                        Xem Chi Tiết
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </>
    )
}
export default ListMenu;