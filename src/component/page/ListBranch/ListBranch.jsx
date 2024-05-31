import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Modal, Form, Spinner } from 'react-bootstrap';
import './ListBranch.scss';
import StarRating from '../../Context/Rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import Rating from 'react-rating';
import { ToastContainer, toast } from 'react-toastify';
import { FaMapMarkerAlt, FaPhone,FaComment } from "react-icons/fa";

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
    const [loading, setLoading] = useState(true);
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
        setLoading(true);
        fetch('https://localhost:7296/api/ApiBranch')
            .then((response) => response.json())
            .then((data) => {
                setBranches(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
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


        // một ngôi sao
        for (let i = 0; i < fullStars; i++) {
            starArray.push(<FontAwesomeIcon key={i} icon={faStar} style={{ color: 'gold' }} />);
        }

        // một nửa ngôi sao
        if (halfStars === 1) {
            starArray.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} style={{ color: 'gold' }} />);
        }

        // ngôi sao trống
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
                    toast.success('Đă gửi phản hồi !', {
                        position: 'top-right',
                        autoClose: 3000, // Thời gian hiển thị toast (3 giây)
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                } else {
                    toast.error('Hãy đăng nhập để gửi phản hồi !', {
                        position: 'top-right',
                        autoClose: 3000, // Thời gian hiển thị toast (3 giây)
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                }
            });
    };
    const [selectedService, setSelectedService] = useState(null);

    const [showModalBranch, setShowModalBranch] = useState(false);

    // mở modal
    const openModalBranch = () => {
        console.log('Opening modal with:', selectedService);

        setShowModalBranch(true);
    };
    const closeModalBranch = () => {
        setShowModalBranch(false);
    };

    return (
        <>

            <div className='tilte' style={{maxWidth:'100%'}}>
                <h1 className='text-gradient' style={{ fontWeight: 'bold' }}>DANH SÁCH CHI NHÁNH</h1>
                {loading ? (
                    <div className="overlay">
                        <Spinner animation="border" />
                    </div>
                ) : null}

                <Form className="filter d-flex" >
                    <Form.Control
                        type="text"
                        placeholder="Nhập chi nhánh bạn muốn tìm kiếm"
                        name="kw"
                        className="me-2"
                        aria-label="Search"
                    />
                    <Button style={{maxWidth:'100%'}} type='submit' >Tìm</Button>
                </Form>
            </div>
            <Row style={{ marginTop: '-7px' }} className="branch">
                {branches.map((branch) => (
                    <Col xs={12} md={3} key={branch.branchId}>
                        <Card className="branch-card" style={{ width: '18rem',maxWidth:'100%' }}>
                            <Card.Img variant="top" src={branch.image} className="custom-img" />

                            <Card.Body style={{background:'rgb(245, 244, 244)'}}>
                                <Card.Title style={{ fontWeight: 'bold', textAlign: 'center' }} >{branch.name}</Card.Title>
                                <Card.Text style={{ fontWeight: 'bold' }} >
                                    <FaMapMarkerAlt style={{ marginBottom: '5px' }} />
                                    {branch.address}

                                    <hr></hr>

                                    {branch.description}

                                </Card.Text>
                                <h4 className='detail' style={{ maxWidth:'100%' }}>
                               
                                    <Button style={{padding: '10px 20px',fontWeight: 'bold', textAlign: 'center',border:'black',maxWidth:'100%' }} onClick={() => openModal(branch.branchId, branch.name)} className='btn btn-success '>
                                    
                                       Phản hồi
                                    </Button>
                                    <Button
                                    style={{fontWeight: 'bold', textAlign: 'center',padding: '10px 20px',maxWidth:'100%'}}
                                        className='btndetail'
                                        variant="primary"
                                        onClick={() => {
                                            setSelectedService(branch);
                                            openModalBranch();
                                        }}
                                    >
                                        Chi Tiết
                                    </Button>
                                </h4>

                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Modal show={showModalBranch} onHide={closeModalBranch} style={{textAlign:'center'}}>
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết chi nhánh</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedService && (
                        <div>
                            <img src={selectedService.image} className="custom-img"></img>
                            <h3>{selectedService.name}</h3>
                            <p>Mô tả: {selectedService.description}</p>
                            <p>Số điện thoại: {selectedService.phone}</p>
                            <p>Địa chỉ: {selectedService.address}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ float: 'right' }} variant="secondary" onClick={closeModalBranch}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
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
                                    <p className="feedback-date">{formatDate(feedback.feedbackDate)}</p>

                                    <div className="content">
                                        <textarea
                                            style={{ width: '100%' }}
                                        >{feedback.content}</textarea>
                                    </div>
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
                                {/* Và bất kỳ thông tin nào khác bạn muốn hiển thị */}
                            </div>
                        ))}
                    </div>

                    {/* Vùng nhập phản hồi */}
                    <div className="feedback-input">
                        <div className="content">
                            <h4>Nhập phản hồi của bạn</h4>
                            <textarea
                                placeholder="Nhập phản hồi của bạn..."
                                rows="4"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                style={{ width: '100%' }}
                            ></textarea>
                        </div>

                        <div className="rating-button-container">
                            <div className="rating">
                                <Rating
                                    initialRating={rating}
                                    emptySymbol={<FontAwesomeIcon icon={faStar} style={{ color: 'gray' }} />}
                                    fullSymbol={<FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} />}
                                    fractions={2}
                                    onClick={(value) => setRating(value)}
                                />
                            </div>

                            <div className="button-container">
                                <button className='btn btn-success' onClick={submitFeedback}>Gửi phản hồi</button>
                            </div>
                        </div>
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
//helloo 