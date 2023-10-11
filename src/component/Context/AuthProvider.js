import Cookies from 'js-cookie';
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [email, setEmail] = useState(null);
  const login = (token, firstName, email) => {
    setToken(token);
    setFirstName(firstName);
    setEmail(email); // Cập nhật email
  };
  const logout = () => {
    // Xóa token khỏi cookie
    Cookies.remove('token_user');

    // Đặt token và firstName thành null
    setToken(null);
    setFirstName(null);
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, firstName, setFirstName, email, setEmail, logout ,login}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
