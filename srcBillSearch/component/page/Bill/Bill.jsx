import { useState } from 'react';
import './Bill.scss';
import { Accordion, Button, Card, Col, Row } from 'react-bootstrap';


const Bill = () => {
    const initalHall = [
        {
            title: "Hall 1 ",
            img_url: require("../../../assets/assets/img_6.png"),
            desc: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            branch: "Chi nhánh 1",
            category: "1"

        },
        {
            title: "Hall 2 ",
            img_url: require("../../../assets/assets/img_5.png"),
            desc: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            branch: "Chi nhánh 1",
            category: "2"
        },
        {
            title: "Hall 3 ",
            img_url: require("../../../assets/assets/img_5.png"),
            desc: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            branch: "Chi nhánh 2",
            category: "3"
        },
        {
            title: "Hall 4 ",
            img_url: require("../../../assets/assets/img_7.png"),
            desc: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            branch: "Chi nhánh 3",
            category: "2"
        },
        {
            title: "Hall 5 ",
            img_url: require("../../../assets/assets/img_8.png"),
            desc: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            branch: "Chi nhánh 3",
            category: "1"
        },

    ]
    const [halls, setHalls] = useState(initalHall)


    const [selectedCheckbox, setSelectedCheckbox] = useState("null");

    // Hàm xử lý khi checkbox được chọn
    const handleCheckboxChange = (event, index) => {
        if (event.target.checked) {
            // Nếu checkbox được chọn, cập nhật selectedCheckbox
            setSelectedCheckbox(index);
        } else {
            // Nếu checkbox bị bỏ chọn, hủy chọn selectedCheckbox
            setSelectedCheckbox(null);
        }
    };
    return (

        <div className='bill'>
            <div className="bill-page">

                <div className="bill-form-container">
                    <h1 className="title">
                        Đơn Hàng
                    </h1>

                    <form >


                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Chi Nhánh</Accordion.Header>
                                <Accordion.Body className='body'>
                                    {halls.map((item, index) => {
                                        return <Card key={index} style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src={item.img_url} />
                                            <Card.Body>
                                                <Card.Title>{item.title}</Card.Title>
                                                <Card.Text>
                                                    {item.desc}
                                                </Card.Text>
                                                <Button variant="primary">Go somewhere</Button>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id={`flexCheckDefault-${index}`}
                                                        checked={selectedCheckbox === index}
                                                        onChange={(event) => handleCheckboxChange(event, index)} />
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    })}
                                </Accordion.Body>
                            </Accordion.Item>

                            {/* =================Sảnh Cưới=========== */}
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Sảnh Cưới</Accordion.Header>
                                <Accordion.Body className='body'>

                                    {halls.map((item, index) => {
                                        return <Card key={index} style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src={item.img_url} />
                                            <Card.Body>
                                                <Card.Title>{item.title}</Card.Title>
                                                <Card.Text>
                                                    {item.desc}
                                                </Card.Text>
                                                <Button variant="primary">Go somewhere</Button>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id={`flexCheckDefault-${index}`}
                                                        checked={selectedCheckbox === index}
                                                        onChange={(event) => handleCheckboxChange(event, index)} />
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    })}
                                </Accordion.Body>
                            </Accordion.Item>

                            {/* =====================================Thực Đơn */}
                            <div className="label-container">
                                <label>Thực Đơn</label>
                            </div>

                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Món Chính</Accordion.Header>
                                <Accordion.Body className='body'>

                                    {halls.map(item => {
                                        return <Card style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src={item.img_url} />
                                            <Card.Body>
                                                <Card.Title>{item.title}</Card.Title>
                                                <Card.Text>
                                                    {item.desc}
                                                </Card.Text>
                                                <Button variant="primary">Go somewhere</Button>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id="flexCheckDefault"
                                                    />
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    })}
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* ================================Món Tráng Miệng */}
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>Món Tráng Miệng</Accordion.Header>
                                <Accordion.Body className='body'>

                                    {halls.map(item => {
                                        return <Card style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src={item.img_url} />
                                            <Card.Body>
                                                <Card.Title>{item.title}</Card.Title>
                                                <Card.Text>
                                                    {item.desc}
                                                </Card.Text>
                                                <Button variant="primary">Go somewhere</Button>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id="flexCheckDefault"
                                                    />
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    })}
                                </Accordion.Body>
                            </Accordion.Item>
                            {/* ================Món Khai Vị */}


                            <Accordion.Item eventKey="4">
                                <Accordion.Header>Món Khai Vị</Accordion.Header>
                                <Accordion.Body className='body'>

                                    {halls.map(item => {
                                        return <Card style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src={item.img_url} />
                                            <Card.Body>
                                                <Card.Title>{item.title}</Card.Title>
                                                <Card.Text>
                                                    {item.desc}
                                                </Card.Text>
                                                <Button variant="primary">Go somewhere</Button>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id="flexCheckDefault"
                                                    />
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    })}
                                </Accordion.Body>
                            </Accordion.Item>

                            <div className="label-container">
                                <label>Dịch Vụ</label>
                            </div>
                            <Accordion.Item eventKey="5">
                                <Accordion.Header>Các Dịch Vụ</Accordion.Header>
                                <Accordion.Body className='body'>

                                    {halls.map(item => {
                                        return <Card style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src={item.img_url} />
                                            <Card.Body>
                                                <Card.Title>{item.title}</Card.Title>
                                                <Card.Text>
                                                    {item.desc}
                                                </Card.Text>
                                                <Button variant="primary">Go somewhere</Button>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id="flexCheckDefault"
                                                    />
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    })}
                                </Accordion.Body>
                            </Accordion.Item>


                        </Accordion>







                        <div>
                            <label >
                                First Name
                            </label>
                            <input
                                id="first-name"
                                className="form-control"
                                type="text"
                                name="firstName"
                            />
                        </div>

                        <div>
                            <label >
                                Last Name
                            </label>
                            <input
                                id="first-name"
                                className="form-control"
                                type="text"
                                name="firstName"
                            />
                        </div>
                        <div>
                            <label >
                                Địa Chỉ
                            </label>
                            <input
                                id="first-name"
                                className="form-control"
                                type="text"
                                name="firstName"
                            />
                        </div>



                        <button className="w-100 btn btn-lg btn-primary mt-3 custom-button" type="submit">
                            Register
                        </button>



                    </form>
                </div>

            </div>



        </div>

    );
};

export default Bill;