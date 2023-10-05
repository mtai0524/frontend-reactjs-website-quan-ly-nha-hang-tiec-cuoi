import React, { Component } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

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
            toast.error('Bạn đã bỏ chọn món ăn!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme:'colored'
            });
        } else {
            this.setState({
                selectedItems: [...selectedItems, itemId],
            });
            toast.success('Bạn đã chọn món ăn!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme:'colored'
            });
        }
    };

    handleOrderSubmit = () => {
        const { selectedItems } = this.state;
    
        // Lấy thông tin người dùng từ cookie
        const token = Cookies.get('token_user');
        if (token) {
            const decodedToken = jwt_decode(token);
            const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
    
            console.log('Thông tin người dùng đăng nhập:');
            console.log('Email người dùng:', email);
    
            // Gửi yêu cầu GET để lấy thông tin người dùng từ API
            fetch(`https://localhost:7296/api/account/GetUserInfo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(email), // Gửi email trong body
            })
            .then((response) => response.json())
            .then((userData) => {
                // Kiểm tra xem userData có thông tin người dùng nào không
                if (userData && userData.id) {
                    // Tạo một đối tượng request để gửi lên API
                    const request = {
                        UserId: userData.id, // Sử dụng id từ API để thay thế UserId
                        OrderMenus: selectedItems.map(menuId => ({ MenuID: menuId }))
                    };
                    console.log(userData.id);
                    console.log(userData.email);
                    // Xuất request ra console để kiểm tra
                     console.log('Request:', request);

                    // Gửi yêu cầu POST đến API ASP.NET Core
                    fetch('https://localhost:7296/api/invoice', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(request), // Gửi dữ liệu theo đúng định dạng của API
                    })
                    .then((response) => response.json())
                    .then((data) => {
                        // Xử lý phản hồi từ API (nếu cần)
                        console.log(data);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
                } else {
                    console.error('Không thể lấy thông tin người dùng từ API.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        } else {
            console.log('Người dùng chưa đăng nhập.');
        }
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
                            <Card className="custom-card">
                                <Card.Img variant="top" src={menuItem.image} style={customImageStyle} />
                                <label className="custom-checkbox">
                                    <input
                                    type="checkbox"
                                    value={menuItem.menuId}
                                    checked={this.state.selectedItems.includes(menuItem.menuId)}
                                    onChange={() => this.handleItemSelection(menuItem.menuId)}
                                    />
                                </label>
                                <Card.Body>
                                    {menuItem.categoryName}
                                    <br/>
                                    {menuItem.name}
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
