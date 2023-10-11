import { Link, useNavigate } from "react-router-dom";
import './login.scss';
import { useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from 'jwt-decode';
import { useAuth } from "../../Context/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const { setToken, setFirstName, setEmail } = useAuth();
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleLoginSuccess = (token, firstName, email) => {
        // Sau khi đăng nhập thành công
        // Lưu token và firstName vào Context
        setToken(token); // Lưu token vào trạng thái toàn cục
        setFirstName(firstName); // Lưu firstName vào trạng thái toàn cục
        setEmail(email); // Lưu firstName vào trạng thái toàn cục
        toast.success('Đăng nhập thành công!', {
            position: 'top-right',
            autoClose: 3000, // Thời gian hiển thị toast (3 giây)
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
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
                handleLoginSuccess(token, firstName, email);

            } else {
                console.error('Đăng nhập không thành công.');
            }
        } catch (error) {
            console.error('Lỗi khi đăng nhập:', error);
        }

    };

    return (
        <div className=" login container col-xl-10 col-xxl-8 px-4 py-5 mt-4">
            <div className="row align-items-center g-lg-5 py-5">
                <div className="col-lg-7 text-center text-lg-start">
                    <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">
                        Vertically centered hero sign-up form
                    </h1>
                    <p className="col-lg-10 fs-4">
                        Below is an example form built entirely with Bootstrap’s form controls.
                        Each required form group has a validation state that can be triggered by
                        attempting to submit the form without completing it.
                    </p>
                </div>
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
                            <label htmlFor="email">Email address</label>
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
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="checkbox mb-3">
                            <label>
                                <input type="checkbox" defaultValue="remember-me" /> Remember me
                            </label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">
                            Sign up
                        </button>
                        <Link to="register">
                            <button className="w-100 btn btn-lg btn-primary mt-3 custom-button" type="submit">
                                Register
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
