import './Bill.scss';
import { Accordion, Button, Card } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

const Bill = () => {
    const [branchs, setBranchs] = useState([]);
    const [halls, setHalls] = useState([]);
    const [selectedBranchId, setSelectedBranchId] = useState(null);
    const [selectedHallIndex, setSelectedHallIndex] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedHalls, setSelectedHalls] = useState([]);

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
        setSelectedHallIndex(null); // Đặt lại lựa chọn của hall khi chọn branch khác

        // Kiểm tra xem chi nhánh đã được chọn chưa
        if (selectedItems.includes(branchId)) {
            // Nếu đã chọn, loại bỏ khỏi danh sách
            setSelectedItems(selectedItems.filter(item => item !== branchId));
        } else {
            // Nếu chưa chọn, thêm vào danh sách
            setSelectedItems([...selectedItems, branchId]);
        }
    };

    const handleHallCheckboxChange = (hallIndex) => {
        setSelectedHallIndex(hallIndex);
    
        // Lấy thông tin hội trường đã chọn
        const selectedHall = halls[hallIndex];
    
        // Kiểm tra xem hội trường đã chọn có trùng với hội trường đã lưu hay không
        if (selectedHalls.some(hall => hall.hallId === selectedHall.hallId)) {
            setSelectedHalls([selectedHall]);
        } else {
            setSelectedHalls([selectedHall]);
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
        <div className='bill'>
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
                                                        checked={index === selectedHallIndex}
                                                        onChange={() => handleHallCheckboxChange(index)}
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
                    <h2>Danh sách chi nhánh đã chọn:</h2>
                    <p>{selectedBranch ? selectedBranch.name : 'Chưa chọn chi nhánh'}</p>
                    <h2>Danh sách hội trường đã chọn:</h2>
                    <p>{selectedHalls.length > 0 ? selectedHalls.map(hall => hall.name).join(', ') : 'Chưa chọn hội trường'}</p>
                </div>
            </div>
        </div>
    );
};

export default Bill;
