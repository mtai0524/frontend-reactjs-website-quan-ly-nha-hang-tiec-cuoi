import Cookies from 'js-cookie';
import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

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
        console.log('Phản hồi từ API:', data); // In ra dữ liệu từ API để kiểm tra

        const token = data.token;

        Cookies.set('token_user', token, { expires: 7 }); // expires: 7 là thời gian sống trong 7 ngày

        const decodedToken = jwt_decode(token);

        const username = decodedToken.name; // Lấy tên người dùng từ token
        const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
        console.log('Tên người dùng:', username);
        console.log('Email:', email);

        toast.success('Đăng nhập thành công!', {
          position: 'top-right',
          autoClose: 3000, // Thời gian hiển thị toast (3 giây)
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

      } else {
        toast.error('Đăng nhập không thành công á!', {
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
  function handleLogout() {
    // Xóa token khỏi cookie khi đăng xuất
    Cookies.remove('token_user');
    toast('Đã đăng xuất gòi á!', {
      position: 'top-right',
      autoClose: 3000, // Thời gian hiển thị toast (3 giây)
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    // Cập nhật trạng thái ứng dụng hoặc chuyển hướng đến trang đăng nhập
    // Ví dụ: bạn có thể sử dụng React Router để chuyển hướng đến trang đăng nhập
    // hoặc làm cho trạng thái của ứng dụng để hiển thị một giao diện người dùng chưa đăng nhập.
  }

  return (
    <div>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Mật khẩu:</label>
          <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">Đăng nhập</button>
      </form>
      {Cookies.get('token_user') && (
        <div>
          <button onClick={handleLogout}>Đăng xuất</button>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
