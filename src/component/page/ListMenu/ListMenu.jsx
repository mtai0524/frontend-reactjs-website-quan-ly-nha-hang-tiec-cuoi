
import './ListMenu.scss'
import { BsCartCheck } from 'react-icons/bs';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
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
                    <Button type='submit'>Search</Button>
                </Form>
            </div>
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
                                    <Button className='btndetail' variant="primary">Xem Chi Tiết</Button>
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
                                    <Button className='btndetail' variant="primary">Xem Chi Tiết</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </>
        // <div className='listmenu' id='listmenu'>
        //     <div className='menu__container container'>
        //         <span className='text-gradient'>Thực Đơn</span>
        // <h1>Danh Sách Thực Đơn</h1>
        // <Form className="filter d-flex">
        //     <Form.Control
        //         type="search"
        //         placeholder="Search"
        //         className="me-2"
        //         aria-label="Search"
        //     />
        //     <Button variant="outline-success">Search</Button>
        // </Form>

        //         <ul className='menu__list'>{
        //             menu.map(item => {
        //                 return <li className='menu__item' key={item.name}>
        //                     <div className='menu__item--img'>
        //                         <img className='menu__item--img-content' src={item.image} alt=''></img>
        //                     </div>
        //                     <div className='menu__item--content'>
        //                         <h3>{item.name}</h3>
        //                         <p>{item.price}</p>
        //                         <Button><BsCartCheck />Order Here</Button>
        //                     </div>
        //                 </li>
        //             })
        //         }</ul>
        //     </div>
        // </div >
    )
}
export default ListMenu;