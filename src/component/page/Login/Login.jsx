import { Link, useNavigate } from "react-router-dom";
import './login.scss';
import { useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from 'jwt-decode';
import { useAuth } from "../../Context/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const { setToken, setFirstName, setEmail, setId } = useAuth();
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleLoginSuccess = (token, firstName, email, id) => {
        // Sau khi đăng nhập thành công
        // Lưu token và firstName vào Context
        setToken(token); // Lưu token vào trạng thái toàn cục
        setFirstName(firstName); // Lưu firstName vào trạng thái toàn cục
        setEmail(email); // Lưu firstName vào trạng thái toàn cục
        setId(id); // Lưu firstName vào trạng thái toàn cục
        toast.success('Đăng nhập thành công!', {
            position: 'top-right',
            autoClose: 3000, // Thời gian hiển thị toast (3 giây)
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          console.log("Id nè nha: " + id);
        // Chuyển hướng người dùng về trang home hoặc bất kỳ trang nào bạn muốn
        nav('/');
      }
      
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://localhost:7296/api/account/SignIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Phản hồi từ API:', data);

                const token = data.token;
                Cookies.set('token_user', token, { expires: 7 });

                const decodedToken = jwt_decode(token);

                const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']; // lấy từ jwt.io phân giải token
                const firstName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
                const id = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
                handleLoginSuccess(token, firstName, email, id);

            } else {
                toast.error('Đăng nhập thất bại!', {
                    position: 'top-right',
                    autoClose: 3000, // Thời gian hiển thị toast (3 giây)
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });
                console.error('Đăng nhập không thành công.');
            }
        } catch (error) {
            console.error('Lỗi khi đăng nhập:', error);
        }

    };

    return (
        <div className=" login container col-xl-10 col-xxl-8 px-4 py-5 mt-4">
            <div className="row align-items-center g-lg-5 py-5">
            <img style={{width:'50%'}} src={require("../../../assets/assets/login.png")} alt="" />
                <div className=" col-md-10 mx-auto col-lg-5">
                    <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={handleLogin}>
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                id="email"

                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <label htmlFor="email">Địa chỉ email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <label htmlFor="password">Mật khẩu</label>
                        </div>
                        <div className="checkbox mb-3">
                            <label>
                                <input type="checkbox" defaultValue="remember-me" /> Remember me
                            </label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">
                            Đăng nhập
                        </button>
                        <Link to="register">
                            <button className="w-100 btn btn-lg btn-primary mt-3 custom-button" type="submit">
                                Đăng kí
                            </button>
                        </Link>

                        <hr className="my-4" />
                        <small className="text-body-secondary">
                            <Link to="register">Quên Mật Khẩu</Link>
                        </small>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login;
