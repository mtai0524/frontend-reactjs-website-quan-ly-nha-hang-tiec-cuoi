import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Modal } from 'react-bootstrap';
import './ListBranch.scss';
import StarRating from '../../Context/Rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import Rating from 'react-rating';
const ListBranch = () => {
    const [branches, setBranches] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [feedbackData, setFeedbackData] = useState([]);
    const [userFeedback, setUserFeedback] = useState('');
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(0);
    const [branchId, setBranchId] = useState(0);
    const [branchName, setBranchName] = useState('');
    const [currentModalBranchId, setCurrentModalBranchId] = useState(null); // State để lưu branchId của modal hiện tại

    const openModal = (branchId, branchName) => {
        // Gán branchId của modal hiện tại vào state
        setCurrentModalBranchId(branchId);
        // Gọi hàm fetchFeedbacksByBranch để tải dữ liệu phản hồi và lưu vào feedbackData state.
        fetchFeedbacksByBranch(branchId);
        setBranchName(branchName);
        setShowModal(true);
    };
    function formatDate(dateString) {
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        };
        const formattedDate = new Date(dateString).toLocaleString(undefined, options);
        return formattedDate;
    }
    useEffect(() => {
        fetch('https://localhost:7296/api/ApiBranch')
            .then((response) => response.json())
            .then((data) => {
                setBranches(data);
            })
            .catch((error) => {
                console.error('Lỗi khi tải danh sách chi nhánh:', error);
            });
    }, []);
    const fetchFeedbacksByBranch = (branchId) => {
        fetch(`https://localhost:7296/api/feedback/${branchId}`)
            .then((response) => response.json())
            .then((data) => {
                setFeedbackData(data);
            })
            .catch((error) => {
                console.error('Lỗi khi tải danh sách phản hồi của chi nhánh:', error);
            });
    };
    const renderStarRating = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStars = Math.ceil(rating - fullStars);
        const emptyStars = 5 - fullStars - halfStars;

        const starArray = [];

        // Add full stars with a yellow color
        for (let i = 0; i < fullStars; i++) {
            starArray.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: 'gold' }} />);
        }

        // Add half stars with a yellow color
        if (halfStars === 1) {
            starArray.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} style={{ color: 'gold' }} />);
        }

        // Add empty stars with a gray color
        for (let i = 0; i < emptyStars; i++) {
            starArray.push(<FontAwesomeIcon key={`empty${i}`} icon={faStar} style={{ color: 'gray' }} />);
        }

        return starArray;
    };
    const tokenFromCookie = Cookies.get('token_user');
    let id = null;
    if (tokenFromCookie) {
        const decodedToken = jwt_decode(tokenFromCookie);
        id = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    }
    const submitFeedback = () => {
        console.log(id);

        const feedbackData = {
            userId: id, // Lấy userId từ token
            content: content, // Lấy content từ state
            rating: rating, // Lấy rating từ state
            branchId: currentModalBranchId, // Lấy branchId từ state
        };

        fetch('https://localhost:7296/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenFromCookie}`
            },
            body: JSON.stringify(feedbackData),
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Phản hồi đã được tạo thành công');
                    // Đóng modal hoặc làm điều gì đó khác sau khi gửi phản hồi thành công
                    setShowModal(false);
                } else {
                    console.error('Lỗi khi tạo phản hồi');
                }
            });
    };


    return (
        <>
            <Row className='branch'>
                {branches.map((branch) => (
                    <Col xs={12} md={3} key={branch.branchId}>
                        <Card style={{ width: '18rem' }}>
                            <div className="image-container">
                                <Card.Img variant="top" src={branch.image} className="fixed-height-image" />
                            </div>
                            <Card.Body>
                                <Card.Title>{branch.name}</Card.Title>
                                <Card.Title>{branch.description}</Card.Title>
                                <Card.Title>{branch.address}</Card.Title>
                                <Card.Title>{branch.phone}</Card.Title>
                                <Button
                                    variant="primary"
                                    onClick={() => openModal(branch.branchId, branch.name)}
                                >
                                    Xem phản hồi
                                </Button>
            
                            </Card.Body>
                        </Card>
                    </Col>
                ))}

            </Row>
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Danh sách phản hồi {branchName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="feedback-list-container">
                        {feedbackData.map((feedback) => (
                            <div key={feedback.feedbackId} className="feedback-item">
                                <Card.Img className="avatar" variant="top" src={feedback.id.avatar} />
                                <div className="email-info">
                                    <p className="email">{feedback.id.email}</p>
                                    <p className="content">{feedback.content}</p>
                                    <p className="rating">
                                        <Rating
                                            initialRating={feedback.rating} // Sử dụng giá trị rating từ dữ liệu
                                            emptySymbol={<FontAwesomeIcon icon={faStar} style={{ color: 'gray' }} />}
                                            fullSymbol={<FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />}
                                            fractions={2} // Cho phép rating với nửa ngôi sao
                                            readonly // Để ngăn người dùng thay đổi rating trong danh sách phản hồi
                                        />
                                    </p>
                                </div>
                                <p className="feedback-date">{formatDate(feedback.feedbackDate)}</p>
                                {/* Và bất kỳ thông tin nào khác bạn muốn hiển thị */}
                            </div>
                        ))}
                    </div>

                    {/* Vùng nhập phản hồi */}
                    <div className="feedback-input">
                        <h4>Nhập phản hồi của bạn</h4>
                        <textarea
                            placeholder="Nhập phản hồi của bạn..."
                            rows="4"
                            cols="50"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>

                        <Rating
                            initialRating={rating}
                            emptySymbol={<FontAwesomeIcon icon={faStar} style={{ color: 'gray' }} />}
                            fullSymbol={<FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />}
                            fractions={2} // Cho phép chọn 1 nửa ngôi sao
                            onClick={(value) => setRating(value)}
                        />
                      
                        <button className='btn btn-success' onClick={submitFeedback}>Gửi phản hồi</button>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
};

export default ListBranch;
