import React, { Component } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

class MenuSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItems: [], // Danh sách các món ăn đã chọn
            menuItems: [], // Danh sách các món ăn từ API
        };
    }

    componentDidMount() {
        // Gửi yêu cầu GET đến API để lấy danh sách các món ăn
        fetch('https://localhost:7296/api/menu')
            .then((response) => response.json())
            .then((data) => {
                // Cập nhật trạng thái menuItems với dữ liệu từ API
                this.setState({ menuItems: data });
            })
            .catch((error) => {
                console.error('Lỗi khi lấy danh sách món ăn:', error);
            });
    }

    handleItemSelection = (itemId) => {
        const { selectedItems } = this.state;
        if (selectedItems.includes(itemId)) {
            this.setState({
                selectedItems: selectedItems.filter((id) => id !== itemId),
            });
        } else {
            this.setState({
                selectedItems: [...selectedItems, itemId],
            });
        }
    };

    handleOrderSubmit = () => {
        const { selectedItems, menuItems } = this.state;

        // Lọc ra các món ăn đã chọn từ danh sách món ăn
        const selectedMenuItems = menuItems.filter((menuItem) => selectedItems.includes(menuItem.menuId));

        // Lấy danh sách tên của các món ăn đã chọn
        const selectedMenuNames = selectedMenuItems.map((menuItem) => menuItem.name);

    console.log('Danh sách món ăn đã chọn:', selectedMenuNames);
        // Gửi danh sách món ăn đã chọn đến API ASP.NET Core
        fetch('/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ selectedItems: this.state.selectedItems }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Xử lý phản hồi từ API (nếu cần)
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    render() {
        const { menuItems } = this.state;
    
        // Lớp CSS tùy chỉnh để định kích thước cho hình ảnh
        const customImageStyle = {
            width: '100%', // Đặt chiều rộng 100%
            height: '20rem', // Để tỷ lệ khung hình ảnh tự điều chỉnh
        };
    
        // Hiển thị danh sách món ăn và checkbox dưới dạng thẻ Card View
        return (
            <Container>
                <Row>
                    {menuItems.map((menuItem) => (
                        <Col key={menuItem.menuId} md={3}>
                            <Card>
                                <Card.Img variant="top" src={menuItem.image} style={customImageStyle} />
                                <Card.Body>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value={menuItem.menuId}
                                            checked={this.state.selectedItems.includes(menuItem.menuId)}
                                            onChange={() => this.handleItemSelection(menuItem.menuId)}
                                        />
                                        {menuItem.name}
                                    </label>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <button onClick={this.handleOrderSubmit}>Xác nhận đặt hàng</button>
            </Container>
        );
    }
}

export default MenuSelection;
