import { createContext, useContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Kiểm tra nếu có token trong localStorage hoặc sessionStorage
        const token = localStorage.getItem('token_user'); // Hoặc sử dụng sessionStorage

        if (token) {
            // Giải mã token để lấy thông tin email
            const decodedToken = jwt_decode(token);
            const userEmail = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];

            // Lưu thông tin đăng nhập vào state
            setIsLoggedIn(true);
            setEmail(userEmail);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, email }}>
            {children}
        </AuthContext.Provider>
    );
}