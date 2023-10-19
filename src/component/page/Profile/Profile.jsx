import React from 'react';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import './Profile.scss';
import avatar from '../../../assets/assets/img_6.png';

const Profile = () => {
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
    const firstName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    const lastName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'];
    const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
    const phoneNumber = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone'];
    const avatar = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/uri'];

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
