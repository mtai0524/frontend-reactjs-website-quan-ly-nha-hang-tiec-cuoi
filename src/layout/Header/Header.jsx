
import Cookies from 'js-cookie';
import './Header.scss'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { BsClipboardFill, BsFillPersonFill } from 'react-icons/bs';
import { useAuth } from "../../component/Context/AuthProvider";


const Header = () => {
    const { token, firstName, email, logout, login } = useAuth();
    const [userInfo, setUserInfo] = useState(null);
    // const [firstName, setFirstName] = useState(null);
    useEffect(() => {
        // Lấy token từ cookie
        const tokenFromCookie = Cookies.get('token_user');

        if (tokenFromCookie) {
            // Giải mã token để lấy thông tin email và firstName
            const decodedToken = jwt_decode(tokenFromCookie);
            const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
            const firstName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

            // Cập nhật trạng thái của ứng dụng với thông tin từ token
            login(tokenFromCookie, firstName, email);
        }
    }, [login]);




    const handleLogout = () => {
        // Gọi hàm logout từ context để đăng xuất
        logout();
    };

    // const handleLogout = () => {
    //     // Xóa token khỏi cookie
    //     Cookies.remove('token_user');

    //     // Đặt userInfo thành null để đăng xuất người dùng
    //     // setUserInfo(null);
    // };
    return (
        <div className="nav">
            <div className="nav__container container">
                <Link to="/" className="nav__logo text-gradient">Food.</Link>
                {/* <h1>{firstName}</h1> */}
                <ul className="nav__links">
                    {

                        <li className='header'>
                            <Link className="nav-link text-black" to="/">
                                Trang Chủ
                            </Link>
                            <Link className="nav-link text-black" to="/listbranch">
                                Chi Nhánh
                            </Link>
                            <Link className="nav-link text-black" to="/listhall">
                                Sảnh Cưới
                            </Link>
                            <Link className="nav-link text-black" to="/listmenu">
                                Thực Đơn
                            </Link>
                            <Link className="nav-link text-black" to="/listservice">
                                Dịch Vụ
                            </Link>
                            {/* {
                                    item.active && <span></span>
                                } */}
                        </li>
                    }


                    <li className='header'>
                        {token ? (
                            <>
                                <li className="nav-link ">Xin Chào! {email}</li>
                                <button onClick={handleLogout} className="nav-link text-black">Đăng Xuất</button>
                            </>
                        ) : (
                            <Link className="nav-link text-black" to="/login">
                                Đăng Nhập
                            </Link>

                        )}
                    </li>
                    <li>

                        <Link to='profile' className="nav-link text-black" >
                            <BsFillPersonFill className='header' />
                        </Link>

                    </li>
                    <li>
                        <Link to='history' className="nav-link text-black">
                            <BsClipboardFill className='header' />
                        </Link>
                    </li>
                </ul>
            </div>

        </div>


    )
}
export default Header;