import Cookies from 'js-cookie';
import React, { createContext, useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [email, setEmail] = useState(null);
  const [id, setId] = useState(null);
  const login = (token, firstName, email, avatar) => {
    setToken(token);
    setFirstName(firstName);
    setEmail(email); // Cập nhật email
    setAvatar(avatar); // Cập nhật email
  };
  const logout = () => {
    // Xóa token khỏi cookie
    toast.success('Đăng xuất thành công!', {
      position: 'top-right',
      autoClose: 3000, // Thời gian hiển thị toast (3 giây)
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    Cookies.remove('token_user');

    // Đặt token và firstName thành null
    setToken(null);
    setFirstName(null);
    setEmail(null);
    setAvatar(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, firstName, setFirstName, email, setEmail, avatar, setAvatar, logout, login, id, setId }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
