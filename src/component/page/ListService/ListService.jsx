import './ListService.scss';
import { BsCartCheck } from 'react-icons/bs';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import Apis, { endpoint } from '../../../config/Apis';
import { Link } from 'react-router-dom';

const ListService = () => {
    useEffect(() => {
        const loadServices = async () => {
            try {
                let e = endpoint.service;

                let res = await Apis.get(e);
                setServices(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        loadServices();
    }, []);

    const [services, setServices] = useState([]);
    const [searchResult, setSearchResult] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();

        const searchKeyword = e.target.kw.value.toLowerCase();

        const searchResults = services.filter(item =>
            item.name.toLowerCase().includes(searchKeyword)
        );

        setSearchResult(searchResults);
    };

    function formatPrice(price) {
        const formattedPrice = price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND"
        });
        return formattedPrice;
    }

    return (
        <>
            <div className='tilte'>
                <h1>Danh Sách Dịch Vụ</h1>
                <Form className="filter d-flex" onSubmit={handleSearch}>
                    <Form.Control
                        type="text"
                        placeholder="Nhập dịch vụ bạn muốn tìm kiếm"
                        name="kw"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button type='submit'>Tìm</Button>
                </Form>
            </div>
            <Row className='listservice'>
                {searchResult.length > 0 ? (
                    searchResult.map(serviceItem => (
                        <Col xs={12} md={3} className='mt-3'>
                            <Card className='rounded shadow' style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={serviceItem.image} className="custom-img" />
                                <Card.Body>
                                    <Card.Title>{serviceItem.name}</Card.Title>
                                    <Card.Text>
                                        Giá dịch vụ: {formatPrice(serviceItem.price)}
                                    </Card.Text>
                                    <Link to="/bill"><Button variant="primary"><BsCartCheck />Đặt Dịch Vụ</Button></Link>
                                    <Button className='btndetail' variant="primary">Xem Chi Tiết</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    services.map(serviceItem => (
                        <Col xs={12} md={3} className='mt-3'>
                            <Card className='rounded shadow' style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={serviceItem.image} className="custom-img" />
                                <Card.Body>
                                    <Card.Title>{serviceItem.name}</Card.Title>
                                    <Card.Text>
                                        Giá dịch vụ: {formatPrice(serviceItem.price)}
                                    </Card.Text>
                                    <Link to="/bill"><Button variant="primary"><BsCartCheck />Đặt Dịch Vụ</Button></Link>
                                    <Button className='btndetail' variant="primary">Xem Chi Tiết</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </>
    )
}

export default ListService;
