import './ListMenu.scss';
import { BsCartCheck } from 'react-icons/bs';
import { MdDescription } from "react-icons/md";
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Modal, Spinner, Row } from 'react-bootstrap';
import Apis, { endpoint } from '../../../config/Apis';
import { Link } from 'react-router-dom';

const ListMenu = () => {
    const [loading, setLoading] = useState(true);
    const [menus, setMenus] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchResult, setSearchResult] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const loadMenus = async () => {
            try {
                setLoading(true);
                const menuEndpoint = endpoint[`menu`];
                const categoryEndpoint = endpoint[`category`];
                let menuRes = await Apis.get(menuEndpoint);
                let categoryRes = await Apis.get(categoryEndpoint);
                setMenus(menuRes.data);
                setCategories(categoryRes.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(error);
            }
        };
        loadMenus();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const searchKeyword = e.target.kw.value.toLowerCase();
        const searchResults = menus.filter(item =>
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
                let res = await Apis.get(`${endpoint[`menu`]}/byCategory/${categoryId}`);
                setMenus(res.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error(error);
            }
        } else {
            // Reload all menus if no category is selected
            const res = await Apis.get(endpoint[`menu`]);
            setMenus(res.data);
        }
    };

    function formatPrice(price) {
        const formattedPrice = price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND"
        });
        return formattedPrice;
    }

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <>
               <div className='tilte '>
                <h1 className='text-gradient'>DANH SÁCH THỰC ĐƠN</h1>
                {loading? (
      <div className="overlay">
        <Spinner animation="border" />
      </div>
    ) : null}

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
                <Form.Select className='filter1 d-flex' style={{width:'20%'}} aria-label="Chọn thể loại" onChange={handleCategoryChange}>
                    <option value="">Lọc món ăn</option>
                   
                    {categories.map(category => (
                        <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
                    ))}
                </Form.Select>
            </div>
            <Modal show={showModal} onHide={closeModal} size="sm">
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết dịch vụ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedService && (
                        <div>
                            <img src={selectedService.image} className="custom-img" alt={selectedService.name} />
                            <h3>{selectedService.name}</h3>
                            <p>Giá thực đơn: {formatPrice(selectedService.price)}</p>
                            <p>Mô tả: {selectedService.description}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Đóng</Button>
                </Modal.Footer>
            </Modal>

            <Row className='listmenu'>
                {searchResult.length > 0 ? (
                    searchResult.map(menuItem => (
                        <Col xs={12} md={3} className='mt-3' key={menuItem.menuId}>
                            <Card className='card' style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={menuItem.image} className="custom-img" alt={menuItem.name} />
                                <Card.Body >
                                    <Card.Title>{menuItem.name}</Card.Title>
                                    <Card.Text>Giá món ăn: {formatPrice(menuItem.price)}</Card.Text>
                                    <Link to="/bill">
                                        <Button variant="primary"><BsCartCheck /> Đặt Đơn</Button>
                                    </Link>
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
                    menus.map(menuItem => (
                        <Col xs={12} md={3} className='mt-3' key={menuItem.menuId}>
                            <Card className='card' style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={menuItem.image} className="custom-img" alt={menuItem.name} />
                                <Card.Body>
                                    <Card.Title style={{ fontWeight: 'bold', textAlign: 'center' }}>{menuItem.name}</Card.Title>
                                    <hr></hr>
                                    <h4 className='detail'>
                                    <Card.Text style={{ fontWeight: 'bold',fontSize:'19px', marginTop:'15px' }}>{formatPrice(menuItem.price)}</Card.Text>
                                    {/* <Link to="/bill">
                                        <Button variant="primary"><BsCartCheck /> Đặt Đơn</Button>
                                    </Link> */}
                                    <Button style={{padding: '10px 15px',fontWeight: 'bold', textAlign: 'center',border:'black' }}
                                        className='btndetail'
                                        variant="primary"
                                        onClick={() => {
                                            setSelectedService(menuItem);
                                            openModal();
                                        }}
                                    >
                                       
                                        Chi Tiết
                                         <MdDescription style={{ marginTop: '-5px',marginLeft:'6px' }} />
                                    </Button>
                                    </h4>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </>
    );
};

export default ListMenu;
