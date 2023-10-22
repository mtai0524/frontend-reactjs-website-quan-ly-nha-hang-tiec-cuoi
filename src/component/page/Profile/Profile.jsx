import React, { useState, useEffect } from 'react';

import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import './Profile.scss';
import avatar from '../../../assets/assets/img_6.png';
import axios from 'axios';
const Profile = () => {
    const [avatar, setAvatar] = useState(''); // Khai báo avatar và setAvatar bằng useState
    const [id, setId] = useState(''); // Khai báo id bằng useState
    const [firstName, setFirstName] = useState(''); // Khai báo firstName bằng useState
    const [lastName, setLastName] = useState(''); // Khai báo lastName bằng useState
    const [email, setEmail] = useState(''); // Khai báo email bằng useState
    const [phoneNumber, setPhoneNumber] = useState('');
    useEffect(() => {
         // Lấy token từ cookie
    const tokenFromCookie = Cookies.get('token_user');
    let decodedToken = null;

    if (tokenFromCookie) {
        // Giải mã token
        decodedToken = jwt_decode(tokenFromCookie);
    }

    if (!decodedToken) {
        // Xử lý trường hợp không có token
        return (
            <div className="profile">
                <div className="container emp-profile">
                    <p>Người dùng chưa đăng nhập.</p>
                </div>
            </div>
        );
    }

    // Lấy thông tin người dùng từ token
    setId(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
    setFirstName(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
    setLastName(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname']);
    setEmail(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']);
    setPhoneNumber(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone']);
        if (id !== '') {
          async function getAvatar() {
            try {
              const response = await axios.get(`https://localhost:7296/api/account/GetAvatar?id=${id}`);
              setAvatar(response.data.avatar);
            } catch (error) {
              console.error('Error:', error);
            }
          }
    
          // Gọi hàm lấy avatar khi id thay đổi
          getAvatar();
        }
      }, [id]);

    return (
        <div className="profile">
            <div className="container emp-profile">
                <form method="">
                    <div className="profile_avatar">
                        <div className="col-md-4">
                            <h5>Avatar</h5>
                            <img src={avatar} alt="avatar" />
                        </div>
                        <div className="profile_detail">
                            <div>
                                <label htmlFor="first-name" className="form-label">
                                    <b>First Name</b>
                                </label>
                                <p>{firstName}</p>
                            </div>
                            <div>
                                <label htmlFor="last-name" className="form-label">
                                    <b>Last Name</b>
                                </label>
                                <p>{lastName}</p>
                            </div>
                            <div>
                                <label htmlFor="email" className="form-label">
                                    <b>Email</b>
                                </label>
                                <p>{email}</p>
                            </div>
                            <div>
                                <label htmlFor="phone-number" className="form-label">
                                    <b>Phone number</b>
                                </label>
                                <p>{phoneNumber}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="col-md-2">
                            <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
