
import { BsCartCheck } from 'react-icons/bs';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import Apis, { endpoint } from '../../../config/Apis';
import { Link } from 'react-router-dom';



const ListMenu = () => {


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
    return (

        <>
            <div className='tilte'>
                <h1>Danh Sách Sảnh Cưới</h1>


                <Form className="filter d-flex" onSubmit={handleSearch}>
                    <Form.Control
                        type="text"
                        placeholder="Nhập món ăn bạn muốn tìm kiếm"
                        name="kw"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button type='submit'>Search</Button>
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
                                    <Link to="/bill"><Button variant="primary"><BsCartCheck />Đặt Đơn</Button></Link>
                                    <Button className='btndetail' variant="primary">Xem Chi Tiết</Button>
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
                                    <Link to="/bill"><Button variant="primary"><BsCartCheck />Đặt Đơn</Button></Link>
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
export default ListMenu;