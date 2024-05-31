import Cookies from 'js-cookie';
import './Header.scss'
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { BsClipboardFill, BsFillPersonFill,BsCartCheck } from 'react-icons/bs';
import { useAuth } from "../../component/Context/AuthProvider";

const Header = () => {
    const { token, firstName, email, logout, login, avatar } = useAuth(); // lưu trạng thái hoạt động
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate(); // Sử dụng useNavigate

    useEffect(() => {
        const tokenFromCookie = Cookies.get('token_user');

        if (tokenFromCookie) {
            const decodedToken = jwt_decode(tokenFromCookie);
            const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
            const firstName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
            const avatar = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/country'];

            login(tokenFromCookie, firstName, email, avatar);
        }
    }, [login]);

    const handleLogout = () => {
        logout(); // Gọi hàm logout từ context
        Cookies.remove('token_user'); // Xóa token khỏi cookie
        navigate('/'); // Điều hướng về trang home
    };
    return (
        <Navbar expand="lg" className="bg-body-tertiary fixed-top">
            <Container>
                <Navbar.Brand className="nav__logo text-gradient" href="/">Food.</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className="nav-link text-black me-3 fw-bold mt-1" to="/">Trang Chủ</Link>
                        <Link className="nav-link text-black me-3 fw-bold mt-1" to="/listbranch">Chi Nhánh</Link>
                        <Link className="nav-link text-black me-3 fw-bold mt-1" to="/listhall">Sảnh Cưới</Link>
                        <Link className="nav-link text-black me-3 fw-bold mt-1" to="/listmenu">Thực Đơn</Link>
                        <Link className="nav-link text-black me-3 fw-bold mt-1" to="/listservice">Dịch Vụ</Link>
                        {token ? (
                            <>
                                <span className="nav-link text-black me-3 mt-1">{email}</span>
                                <img style={{ width: '40px', height: '40px', marginTop: '5px', borderRadius: '50%' }} src={avatar} alt="avatar" className="me-3 mt-1" />
                                <button style={{width:'100px',marginLeft:'-6px'}} onClick={handleLogout} className="nav-link text-black me-3 fw-bold mt-1">Đăng Xuất</button>
                            </>
                        ) : (
                            <Link className="nav-link text-black me-3 fw-bold mt-1" to="/login">
                                Đăng Nhập
                            </Link>
                        )}
                        <Link to='/profile' className="nav-link text-black me-3 fw-bold mt-1">
                            <BsFillPersonFill className='header' />
                        </Link>
                        <Link to='/history' className="nav-link text-black fw-bold mt-1">
                            <BsClipboardFill className='header' />
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
