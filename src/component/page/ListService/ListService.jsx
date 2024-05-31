import './ListService.scss';
import { BsCartCheck } from 'react-icons/bs';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Modal, Spinner, Row } from 'react-bootstrap';
import Apis, { endpoint } from '../../../config/Apis';
import { Link } from 'react-router-dom';

const ListService = () => {
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchResult, setSearchResult] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const loadServices = async () => {
            try {
                setLoading(true);
                const serviceEndpoint = endpoint[`service`];
                const categoryEndpoint = endpoint[`categoryService`];
                let serviceRes = await Apis.get(serviceEndpoint);
                let categoryRes = await Apis.get(categoryEndpoint);
                setServices(serviceRes.data);
                setCategories(categoryRes.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(error);
            }
        };
        loadServices();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const searchKeyword = e.target.kw.value.toLowerCase();
        const searchResults = services.filter(item =>
            item.name.toLowerCase().includes(searchKeyword)
        );
        setSearchResult(searchResults);
    };

    const handleCategoryChange = async (e) => {
        const categoryId = e.target.value;
        setSelectedCategory(categoryId);
        if (categoryId) {
            setLoading(true);
            try {
                let res = await Apis.get(`${endpoint[`service`]}/byCategoryService/${categoryId}`);
                setServices(res.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(error);
            }
        } else {
            // neu chon tat ca thi nap lai toan bo service
            const res = await Apis.get(endpoint[`service`]);
            setServices(res.data);
        }
    };

    function formatPrice(price) {
        if (price === undefined || price === null) {
            return "N/A";
        }
        return price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND"
        });
    }

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <>
            <div className='tilte'>
                <h1 className='text-gradient'>DANH SÁCH DỊCH VỤ</h1>
                {loading ? (
                    <div className="overlay">
                        <Spinner animation="border" />
                    </div>
                ) : null}

                <Form className="filter d-flex" onSubmit={handleSearch}>
                    <Form.Control
                        type="text"
                        placeholder="Nhập dịch vụ bạn muốn tìm kiếm"
                        name="kw"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button type='submit' >Tìm</Button>
                </Form>
                <Form.Select className='filter1 d-flex' style={{ width: '20%' }} aria-label="Chọn thể loại" onChange={handleCategoryChange}>
                    <option value="">Tất cả</option>
                    {categories.map(category => (
                        <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
                    ))}
                </Form.Select>
            </div>

            <Modal show={showModal} onHide={closeModal} size="sm">
                <Modal.Header closeButton>
                    <Modal.Title >Chi tiết dịch vụ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedService && (
                        <div>
                            <img src={selectedService.image} className="custom-img" alt={selectedService.name} />
                            <h3>{selectedService.name}</h3>
                            <p>Giá dịch vụ: {formatPrice(selectedService.price)}</p>
                            <p>Mô tả: {selectedService.description}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Đóng</Button>
                </Modal.Footer>
            </Modal>

            <Row className='listservice'>
                {searchResult.length > 0 ? (
                    searchResult.map(serviceItem => (
                        <Col xs={12} md={3} className='mt-3' key={serviceItem.serviceId}>
                            <Card className='card' style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={serviceItem.image} className="custom-img" alt={serviceItem.name} />
                                <Card.Body>
                                    <Card.Title >{serviceItem.name}</Card.Title>
                                    <Card.Text>Giá dịch vụ: {formatPrice(serviceItem.price)}</Card.Text>
                                    <Link to="/bill">
                                        <Button variant="primary" ><BsCartCheck /> Đặt Đơn</Button>
                                    </Link>
                                    <Button
                                        className='btndetail'
                                        variant="primary"
                                        onClick={() => {
                                            setSelectedService(serviceItem);
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
                    services.map(serviceItem => (
                        <Col xs={12} md={3} className='mt-3' key={serviceItem.serviceId}>
                            <Card className='card' style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={serviceItem.image} className="custom-img" alt={serviceItem.name} />
                                <Card.Body>
                                    <Card.Title>{serviceItem.name}</Card.Title>
                                    <Card.Text>Giá dịch vụ: {formatPrice(serviceItem.price)}</Card.Text>
                                    <Link to="/bill">
                                    <Button className='btndetail' variant="primary" style={{ background: 'linear-gradient(90deg, #FE8E5C 0%, #F5576C 100%)', border: 'white', fontWeight: 'bold' }}>
                                            <BsCartCheck style={{marginBottom:'5px'}} />Đặt Đơn
                                        </Button>
                                    </Link>
                                    <Button
                                        className='btndetail'
                                        variant="primary"
                                        onClick={() => {
                                            setSelectedService(serviceItem);
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
        </>
    );
};

export default ListService;
