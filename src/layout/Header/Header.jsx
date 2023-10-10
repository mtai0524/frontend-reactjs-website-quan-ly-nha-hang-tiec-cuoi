
import Cookies from 'js-cookie';
import './Header.scss'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from "react-scroll";
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { BsClipboardFill, BsFillPersonFill } from 'react-icons/bs';



const Header = () => {

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        // Lấy token từ cookie
        const token = Cookies.get('token_user');

        if (token) {
            // Giải mã token để lấy thông tin email
            const decodedToken = jwt_decode(token);
            const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']; // lấy từ jwt.io phân giải token

            // Gọi API để lấy thông tin người dùng dựa trên email
            axios.post('https://localhost:7296/api/account/GetUserInfo', email, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Thêm token vào tiêu đề
                },
            })
                .then((response) => {
                    if (response.status === 200) {
                        setUserInfo(response.data);
                    } else {
                        console.error('Lỗi khi lấy thông tin người dùng.');
                    }
                })
                .catch((error) => {
                    console.error('Lỗi khi gửi yêu cầu:', error);
                });
        }
    }, []);


    // =======================
    const initalLink = [
        {
            title: "Home",
            active: true
        },

        {
            title: "Branch",
            active: false
        },
        {
            title: "Hall",
            active: false
        },
        {
            title: "Menu",
            active: false
        },
        {
            title: "Service",
            active: false
        },
        {
            title: "Contact",
            active: false
        }

    ]
    const [link, setLinks] = useState(initalLink)


    const activeLinks = (event) => {
        const title = event.currentTarget.textContent.trim();
        const newLinks = link.map(item => {
            if (item.title === title) {
                item.active = true;
            }
            else {
                item.active = false
            }

            return item;
        })
        setLinks(newLinks);
    }

    const handleLogout = () => {
        // Xóa token khỏi cookie
        Cookies.remove('token_user');

        // Đặt userInfo thành null để đăng xuất người dùng
        setUserInfo(null);
    };
    return (
        <div className="nav">
            <div className="nav__container container">
                <Link to="/" className="nav__logo text-gradient">Food.</Link>
                <ul className="nav__links">
                    {
                        link.map(item => {
                            return <li key={item.title}>
                                <ScrollLink className='nav-link text-black' activeClass="active" onClick={event => { activeLinks(event) }} to={item.title.toLowerCase()} spy={true} smooth={true} offset={-50} duration={500} delay={1}>

                                    {item.title}
                                </ScrollLink>
                                {
                                    item.active && <span></span>
                                }
                            </li>
                        })

                    }
                    <li>
                        {userInfo ? (
                            <>
                                <span className="nav-link text-black">{userInfo.email}</span>
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
                            <BsFillPersonFill />
                        </Link>



                    </li>
                    <li>
                        <Link className="nav-link text-black">
                            <BsClipboardFill />
                        </Link>

                    </li>
                </ul>
            </div>

        </div>


    )
}
export default Header;