import './Bill.scss';
import { Accordion, Button, Card } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

const Bill = () => {
    const [branchs, setBranchs] = useState([]);
    const [halls, setHalls] = useState([]);
    const [selectedBranchId, setSelectedBranchId] = useState(null);
    const [selectedHallId, setSelectedHallId] = useState(null);
    const [selectedHallIndex, setSelectedHallIndex] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedHalls, setSelectedHalls] = useState([]);
    const [scrollY, setScrollY] = useState(0);
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const selectedItemsStyle = {
        top: `${scrollY + 20}px`, // 20px là khoảng cách ban đầu từ đỉnh cửa sổ
    };
    // Tải dữ liệu từ API khi component được render
    useEffect(() => {
        fetch('https://localhost:7296/api/ApiBranch')
            .then(response => response.json())
            .then(data => setBranchs(data))
            .catch(error => console.error('Error fetching branch data:', error));
    }, []);

    useEffect(() => {
        fetch('https://localhost:7296/api/hall')
            .then(response => response.json())
            .then(data => setHalls(data))
            .catch(error => console.error('Error fetching hall data:', error));
    }, []);

    const handleBranchCheckboxChange = (branchId) => {
        setSelectedBranchId(branchId);
        setSelectedHallId(null); // Đặt hội trường về null khi thay đổi chi nhánh
        setSelectedHallIndex(null); // Đặt lại lựa chọn của hall khi chọn branch khác
        setSelectedHalls([]); // Xóa danh sách hội trường đã chọn

        // Kiểm tra xem chi nhánh đã được chọn chưa
        if (selectedItems.includes(branchId)) {
            // Nếu đã chọn, loại bỏ khỏi danh sách
            setSelectedItems(selectedItems.filter(item => item !== branchId));
        } else {
            // Nếu chưa chọn, thêm vào danh sách
            setSelectedItems([...selectedItems, branchId]);
        }
    };

    const handleHallCheckboxChange = (hallId) => {
        setSelectedHallId(hallId);

        // Lấy thông tin hội trường đã chọn
        const selectedHall = halls.find(hall => hall.hallId === hallId);

        if (selectedHall) {
            // Kiểm tra xem hội trường đã chọn có trùng với bất kỳ hội trường nào trong danh sách selectedHalls không
            const isHallSelected = selectedHalls.some(hall => hall.hallId === selectedHall.hallId);

            if (isHallSelected) {
                // Nếu trùng, loại bỏ khỏi danh sách
                setSelectedHalls(selectedHalls.filter(hall => hall.hallId !== selectedHall.hallId));
            } else {
                // Nếu không trùng, thêm vào danh sách
                setSelectedHalls([selectedHall]);
            }
        }
    };



    const selectedBranch = branchs.find(branch => branch.branchId === selectedBranchId);
    const selectedItemHall = halls.filter(hall => hall.branchName === selectedBranch?.name);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (selectedBranch && selectedHalls.length > 0) {
            console.log("Chi nhánh đã chọn:", selectedBranch.name);
            console.log("Hội trường đã chọn:", selectedHalls.map(hall => hall.name).join(', '));
        }
    };

    return (
        <div className="bill">
            <div className="bill-page">
                <div className="bill-form-container">
                    <h1 className="title">Đơn Hàng</h1>
                    <form onSubmit={handleFormSubmit}>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Chi Nhánh</Accordion.Header>
                                <Accordion.Body className='body'>
                                    {branchs.map((branch, index) => (
                                        <Card key={index} style={{ width: '18rem' }}>
                                            <Card.Img className="image-fixed-height" variant="top" src={branch.image} />
                                            <Card.Body>
                                                <Card.Title>{branch.name}</Card.Title>
                                                <Card.Text>
                                                    Mô tả: {branch.description}
                                                </Card.Text>
                                                <Card.Text>
                                                    Địa chỉ: {branch.address}
                                                </Card.Text>
                                                <Card.Text>
                                                    SDT: {branch.phone}
                                                </Card.Text>
                                                <Button variant="primary">Go somewhere</Button>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id={`flexCheckDefault-${index}`}
                                                        checked={branch.branchId === selectedBranchId}
                                                        onChange={() => handleBranchCheckboxChange(branch.branchId)}
                                                    />
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </Accordion.Body>
                            </Accordion.Item>

                            {/* =================Sảnh Cưới=========== */}
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Sảnh Cưới</Accordion.Header>
                                <Accordion.Body className='body'>
                                    {selectedItemHall.map((hall, index) => (
                                        <Card key={index} style={{ width: '18rem' }}>
                                            <Card.Img className='image-fixed-height' variant="top" src={hall.image} />
                                            <Card.Body>
                                                <Card.Title>{hall.name}</Card.Title>
                                                <Card.Text>
                                                    Mô tả: {hall.description}
                                                </Card.Text>
                                                <Card.Text>
                                                    Thuộc chi nhánh: {hall.branchName}
                                                </Card.Text>
                                                <Button variant="primary">Go somewhere</Button>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id={`flexCheckHall-${index}`}
                                                        checked={hall.hallId === selectedHallId}
                                                        onChange={() => handleHallCheckboxChange(hall.hallId)}
                                                    />
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <Button variant="primary" type="submit">Submit</Button>
                    </form>
                </div>
                <div className="selected-items">
                    <div className="selected-items-content" style={{ overflowY: 'auto', maxHeight: '800px' }}>
                        <h2>Chi nhánh đã chọn:</h2>
                        {selectedBranch ? (
                            <div className="center-content">
                                <img
                                    src={selectedBranch.image}
                                    alt={selectedBranch.name}
                                    style={{ width: '100%', height: '250px' }}
                                />
                                <p><b>{selectedBranch.name}</b></p> {/* Hiển thị tên chi nhánh */}
                            </div>
                        ) : 'Chưa chọn chi nhánh'}

                        <h2>Hội trường đã chọn:</h2>
                        {selectedHalls.length > 0 ? (
                            <div className="center-content">
                                {selectedHalls.map((hall, index) => (
                                    <div key={index}>
                                        <img
                                            src={hall.image}
                                            alt={hall.name}
                                            style={{ width: '100%', height: '250px' }}
                                        />
                                        <p><b>{hall.name}</b></p>
                                    </div>
                                ))}
                            </div>
                        ) : 'Chưa chọn hội trường'}

                        <h2>Hội trường đã chọn:</h2>
                        {selectedHalls.length > 0 ? (
                            <div className="center-content">
                                {selectedHalls.map((hall, index) => (
                                    <div key={index}>
                                        <img
                                            src={hall.image}
                                            alt={hall.name}
                                            style={{ width: '100%', height: '250px' }}
                                        />
                                        <p><b>{hall.name}</b></p>
                                    </div>
                                ))}
                            </div>
                        ) : 'Chưa chọn hội trường'}
                        <h2>Danh sách món ăn đã chọn:</h2>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Bill;
