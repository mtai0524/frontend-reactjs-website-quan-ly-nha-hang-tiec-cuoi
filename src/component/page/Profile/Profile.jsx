import React, { useState, useEffect } from "react";
import { Button, Card, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import "./Profile.scss";
import avatar from "../../../assets/assets/img_6.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState("");
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameUpdate, setFirstNameUpdate] = useState("");
  const [lastNameUpdate, setLastNameUpdate] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const tokenFromCookie = Cookies.get("token_user");
    let decodedToken = null;

    if (tokenFromCookie) {
      decodedToken = jwt_decode(tokenFromCookie);
      setIsLoggedIn(true);
    }

    if (!decodedToken) {
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }

    const userId =
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
    setId(userId);
    setFirstName(
      decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
    );
    setLastName(
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"
      ]
    );
    setEmail(
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ]
    );
    setPhoneNumber(
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/mobilephone"
      ]
    );

    if (userId !== "") {
      const fetchAvatar = async () => {
        try {
          const response = await fetch(
            `https://api-wedding-palace.somee.com/api/account/GetAvatar?id=${userId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch avatar");
          }
          const data = await response.json();
          setAvatar(data.avatar);
        } catch (error) {
          console.error("Error fetching avatar:", error);
          setError(error.message);
        }
      };

      const fetchInfo = async () => {
        try {
          const response = await fetch(
            `https://api-wedding-palace.somee.com/api/account/GetInFoUserById?id=${userId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch user info");
          }
          const data = await response.json();
          setFirstName(data.firstName);
          setPhoneNumber(data.phone);
          setLastName(data.lastName);
        } catch (error) {
          console.error("Error fetching user info:", error);
          setError(error.message);
        }
      };

      const fetchWallet = async () => {
        try {
          const response = await fetch(
            `https://api-wedding-palace.somee.com/api/wallet/${userId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch wallet info");
          }
          const data = await response.json();
          setWallet(data);
        } catch (error) {
          console.error("Error fetching wallet info:", error);
          setError(error.message);
        }
      };

      fetchAvatar();
      fetchInfo();
      fetchWallet();
    }

    setLoading(false);
  }, [id]);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSubmit = async () => {
    const profileData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      avatar: avatar,
    };
    try {
      // Send the updated profile information to the server using fetch
      const response = await fetch(
        "https://api-wedding-palace.somee.com/api/account/Update",
        {
          method: "POST", // Specify the method
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
            // Include any necessary authentication headers here
          },
          body: JSON.stringify(profileData), // Convert the profileData object to a JSON string
        }
      );

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      // Parse the response body as JSON
      const data = await response.json();
      toast.success("Cập nhật thành công!", {
        position: "top-right",
        autoClose: 3000, // Thời gian hiển thị toast (3 giây)
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Update the state with the new data from the server
      setId(data.id); // Assuming the server response includes the updated id
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setPhoneNumber(data.phoneNumber);
      setAvatar(data.avatar); // Update the avatar if the server response includes it

      // Close the modal after successful update
      closeModal();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Lấy tệp đầu tiên trong danh sách tệp đã chọn

    if (file) {
      // Đọc tệp hình ảnh và chuyển đổi nó thành đường dẫn dạng URL
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageURL = event.target.result;
        setAvatar(imageURL);
      };
      reader.readAsDataURL(file); // Đọc tệp dưới dạng URL

      // Bạn có thể thêm logic xử lý tệp ở đây, ví dụ: tải lên máy chủ
    }
  };
  function formatPrice(price) {
    const formattedPrice = price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formattedPrice;
  }

  return (
    <div className="profile">
      {loading ? (
        <div className="overlay">
          <Spinner animation="border" />
        </div>
      ) : isLoggedIn ? (
        <div
          className="container emp-profile"
          style={{
            borderRadius: "8px",
            border: "3px solid black",
            marginBottom: "7px",
          }}
        >
          <form method="">
            <div className="profile_avatar">
              <div className="col-md-4">
                <h5>Ảnh đại diện</h5>
                <img src={avatar} alt="avatar" />
              </div>
              <div className="profile_detail">
                <div>
                  <label htmlFor="first-name" className="form-label">
                    <b>Tên</b>
                  </label>
                  <p>{firstName}</p>
                </div>
                <div>
                  <label htmlFor="last-name" className="form-label">
                    <b>Họ</b>
                  </label>
                  <p>{lastName}</p>
                </div>
                <div>
                  <label htmlFor="email" className="form-label">
                    <b>Email</b>
                  </label>
                  <p>{email}</p>
                </div>
                <div style={{ width: "200px" }}>
                  <label htmlFor="phone-number" className="form-label">
                    <b>Số điện thoại</b>
                  </label>
                  <p>{phoneNumber ? phoneNumber : "Chưa nhập số điện thoại"}</p>
                </div>
                <div>
                  <label htmlFor="wallet" className="form-label">
                    <b>Ví điện tử</b>
                  </label>
                  {wallet ? (
                    <p>
                      Coin:{" "}
                      <b style={{ color: "red" }}>
                        {wallet.coin ? formatPrice(wallet.coin) : "0đ"}
                      </b>
                    </p>
                  ) : (
                    <p>
                      Coin: <b style={{ color: "red" }}>Chưa có ví</b>
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="col-md-2">
                <Button
                  style={{ width: "200px" }}
                  variant="dark"
                  onClick={openModal}
                >
                  Cập nhật thông tin
                </Button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div
          className="container emp-profile"
          style={{ border: "3px solid black" }}
        >
          <p
            style={{
              textAlign: "center",
              verticalAlign: "center",
              marginTop: "10px",
            }}
          >
            Người dùng chưa đăng nhập.
          </p>
        </div>
      )}
      <Modal
        show={showModal}
        onHide={closeModal}
        backdrop="true"
        keyboard={false}
        style={{ border: "3px solid black" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật thông tin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="firstName">Tên</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Họ</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Số điện thoại</label>
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="avatar" className="form-label">
                Ảnh đại diện
              </label>
              <input
                id="avatar"
                className="form-control"
                type="file"
                name="avatar"
                accept="image/*"
                // value={formValue.password}
                onChange={handleImageChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Đóng
          </Button>

          <Button variant="primary" onClick={handleSubmit}>
            Cập nhật
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
