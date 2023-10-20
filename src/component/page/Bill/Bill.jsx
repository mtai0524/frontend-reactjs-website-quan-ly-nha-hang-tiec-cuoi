import './Bill.scss';
import { Accordion, Button, Card } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import { useCookies } from 'react-cookie';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const Bill = () => {
    const [cookies] = useCookies(['token_user']);
    const [branchs, setBranchs] = useState([]);
    const [halls, setHalls] = useState([]);
    const [selectedBranchId, setSelectedBranchId] = useState(null);
    const [selectedHallId, setSelectedHallId] = useState(null);
    const [selectedHallIndex, setSelectedHallIndex] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedHalls, setSelectedHalls] = useState([]);
    const [scrollY, setScrollY] = useState(0);

    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [categorizedServices, setCategorizedServices] = useState({});
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [note, setNote] = useState('');
    const [phoneValid, setPhoneValid] = useState(true);

    // sdt phải đủ 10 số
    const isPhoneNumberValid = (phone) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone);
      };
      
    useEffect(() => {
        fetch('https://localhost:7296/api/service')
            .then(response => response.json())
            .then(data => {
                setServices(data);

                // Nhóm dịch vụ vào từng danh mục
                const categorized = data.reduce((categories, service) => {
                    if (!categories[service.categoryName]) {
                        categories[service.categoryName] = [];
                    }
                    categories[service.categoryName].push(service);
                    return categories;
                }, {});

                setCategorizedServices(categorized);
            })
            .catch(error => console.error('Error fetching service data:', error));
    }, []);

    const handleServiceCheckboxChange = (serviceId) => {
        if (selectedServices.includes(serviceId)) {
            // Nếu đã chọn, loại bỏ dịch vụ khỏi danh sách
            setSelectedServices(selectedServices.filter(id => id !== serviceId));
        } else {
            // Nếu chưa chọn, thêm dịch vụ vào danh sách
            setSelectedServices([...selectedServices, serviceId]);
        }
    };


    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const selectedItemsStyle = {
        top: `${scrollY + 20}px`, // 20px là khoảng cách ban đầu từ đỉnh cửa sổ
    };
    // Tải dữ liệu từ API khi component được render
    useEffect(() => {
        fetch('https://localhost:7296/api/ApiBranch')
            .then(response => response.json())
            .then(data => setBranchs(data))
            .catch(error => console.error('Error fetching branch data:', error));
    }, []);

    useEffect(() => {
        fetch('https://localhost:7296/api/hall')
            .then(response => response.json())
            .then(data => setHalls(data))
            .catch(error => console.error('Error fetching hall data:', error));
    }, []);

    const handleBranchCheckboxChange = (branchId) => {
        setSelectedBranchId(branchId);
        setSelectedHallId(null); // Đặt hội trường về null khi thay đổi chi nhánh
        setSelectedHallIndex(null); // Đặt lại lựa chọn của hall khi chọn branch khác
        setSelectedHalls([]); // Xóa danh sách hội trường đã chọn

        if (selectedItems.includes(branchId)) {
            setSelectedItems(selectedItems.filter(item => item !== branchId));

        } else {
            setSelectedItems([...selectedItems, branchId]);
            toast.success(`Đã chọn chi nhánh: ${branchs.find(branch => branch.branchId === branchId).name}`, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    const handleHallCheckboxChange = (hallId) => {
        setSelectedHallId(hallId);

        // Lấy thông tin hội trường đã chọn
        const selectedHall = halls.find(hall => hall.hallId === hallId);

        if (selectedHall) {
            // Kiểm tra xem hội trường đã chọn có trùng với bất kỳ hội trường nào trong danh sách selectedHalls không
            const isHallSelected = selectedHalls.some(hall => hall.hallId === selectedHall.hallId);

            if (isHallSelected) {
                // Nếu trùng, loại bỏ khỏi danh sách
                setSelectedHalls(selectedHalls.filter(hall => hall.hallId !== selectedHall.hallId));
            } else {
                // Nếu không trùng, thêm vào danh sách
                setSelectedHalls([selectedHall]);
                toast.success(`Đã chọn sảnh: ${selectedHall.name}`, {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        }
    };



    const selectedBranch = branchs.find(branch => branch.branchId === selectedBranchId);
    const selectedItemHall = halls.filter(hall => hall.branchName === selectedBranch?.name);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra token_user trong cookie
        const tokenFromCookie = Cookies.get('token_user');
        let id = null;
        if (tokenFromCookie) {
            const decodedToken = jwt_decode(tokenFromCookie);
            id = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        }

        if (!id) {
            // Người dùng chưa đăng nhập hoặc không có token hợp lệ
            toast.error('Bạn phải đăng nhập để đặt nhà hàng', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        if (selectedBranch && selectedHalls.length > 0) {
            // Kiểm tra số lượng món ăn đã chọn
            if (selectedMenus.length < 3) {
                toast.error('Bạn phải chọn ít nhất 3 món ăn.', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                return;
            }

            // Kiểm tra attendanceDate
            const currentDate = new Date();
            const twentyDaysFromNow = new Date();
            twentyDaysFromNow.setDate(currentDate.getDate() + 20);

            if (selectedDate <= twentyDaysFromNow) {
                toast.error('Ngày đến tham dự phải cách ít nhất 20 ngày kể từ ngày hiện tại.', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                return;
            }


            if (!fullName || !phoneNumber) {
                // Kiểm tra xem các trường dữ liệu đã nhập đủ hay chưa
                toast.error('Vui lòng điền đầy đủ thông tin nha!', {
                  position: 'top-right',
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                });
                return;
              }

              if (!isPhoneNumberValid(phoneNumber)) {
                toast.error('Số điện thoại không hợp lệ - Phải đủ 10 số', {
                  position: 'top-right',
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                });
                setPhoneValid(false);
                return;
              }
            // Tất cả điều kiện đều đúng và người dùng đã đăng nhập
            console.log("Chi nhánh đã chọn:", selectedBranch.name);
            console.log("Hội trường đã chọn:", selectedHalls.map(hall => hall.name).join(', '));
            console.log("Danh sách món ăn đã chọn:", selectedMenus.map(menuId => {
                const selectedMenu = menus.find(menu => menu.menuId === menuId);
                return selectedMenu ? selectedMenu.name : '';
            }).join(', '));

            // Gửi đơn hàng
            console.log('orderData:', orderData);
            toast.success('Đặt nhà hàng thành công gòi á !', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            sendOrderData();
        } else {
            toast.error('Chi nhánh hoặc sảnh chưa được chọn á !', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };



    const [menus, setMenus] = useState([]);
    const [selectedMenus, setSelectedMenus] = useState([]);
    // Tải dữ liệu từ API khi component được render
    useEffect(() => {
        fetch('https://localhost:7296/api/menu')
            .then(response => response.json())
            .then(data => setMenus(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);
    // Sử dụng reduce để nhóm món ăn vào từng danh mục
    const categorizedMenus = menus.reduce((categories, menu) => {
        if (!categories[menu.categoryName]) {
            categories[menu.categoryName] = [];
        }
        categories[menu.categoryName].push(menu);
        return categories;
    }, {});

    const handleMenuCheckboxChange = (menuId) => {
        const selectedMenu = menus.find(menu => menu.menuId === menuId);

        if (selectedMenus.includes(menuId)) {
            // Nếu đã chọn, loại bỏ món ăn khỏi danh sách
            setSelectedMenus(selectedMenus.filter(id => id !== menuId));
            toast.error(`Đã hủy món: ${selectedMenu.name}`, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } else {
            // Nếu chưa chọn, thêm món ăn vào danh sách
            setSelectedMenus([...selectedMenus, menuId]);
            toast.success(`Đã chọn món: ${selectedMenu.name}`, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    const calculateTotalPrice = () => {
        const menuTotal = selectedMenus.reduce((acc, menuId) => {
            const selectedMenu = menus.find(menu => menu.menuId === menuId);
            return acc + selectedMenu.price;
        }, 0);

        const serviceTotal = selectedServices.reduce((acc, serviceId) => {
            const selectedService = services.find(service => service.serviceId === serviceId);
            return acc + selectedService.price;
        }, 0);

        // Tính giá cho sảnh cưới (hall.price) và định dạng nó bằng hàm formatPrice
        let hallTotal = 0;
        if (selectedHallId) {
            const selectedHall = halls.find(hall => hall.hallId === selectedHallId);
            if (selectedHall) {
                hallTotal = selectedHall.price;
            }
        }

        // Cộng tất cả các tổng lại để tính tổng tổng cộng
        const total = menuTotal + serviceTotal + hallTotal;

        return total;
    };


    const tokenFromCookie = Cookies.get('token_user');
    let id = null;
    if (tokenFromCookie) {
        const decodedToken = jwt_decode(tokenFromCookie);
        id = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    }

    // Lấy ID của sảnh (hall) đã chọn
    const selectedHallIdDo = selectedHalls.length > 0 ? selectedHalls[0].hallId : null;

    const [selectedDate, setSelectedDate] = useState(new Date()); // Khởi tạo giá trị mặc định

    const handleDateChange = (date) => {
        setSelectedDate(date); // Cập nhật giá trị ngày khi người dùng chọn
    };

    const total = calculateTotalPrice();
    const orderData = {
        UserId: id, // Thay bằng ID người dùng đang đăng nhập
        BranchId: selectedBranch ? selectedBranch.branchId : null, // ID của chi nhánh đã chọn
        HallId: selectedHallIdDo, // ID của sảnh đã chọn
        OrderMenus: selectedMenus.map(menuId => ({
            Price: 0, // Thêm giá trị theo đúng yêu cầu của OrderMenuRequest
            Quantity: 0, // Thêm giá trị theo đúng yêu cầu của OrderMenuRequest
            MenuID: menuId
        })), // Danh sách các món ăn đã chọn dưới dạng danh sách OrderMenuRequest // Danh sách ID của các món ăn đã chọn
        OrderServices: selectedServices.map(serviceId => ({
            Price: 0, // Thêm giá trị theo đúng yêu cầu của OrderMenuRequest
            Quantity: 0, // Thêm giá trị theo đúng yêu cầu của OrderMenuRequest
            ServiceID: serviceId
        })), // Danh sách các món ăn đã chọn dưới dạng danh sách OrderMenuRequest // Danh sách ID của các món ăn đã chọn
        AttendanceDate: selectedDate,
        Total: total, // tổng tiền cần thanh toán
        FullName: fullName,
        PhoneNumber: phoneNumber,
        Note: note
    };

    const sendOrderData = () => {
        fetch('https://localhost:7296/api/invoice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Đã gửi đơn hàng thành công:', data);
                // Thực hiện xử lý hoặc hiển thị thông báo tùy ý sau khi gửi đơn hàng thành công.
            })
            .catch(error => {
                console.error('Lỗi khi gửi đơn hàng:', error);
                // Xử lý lỗi hoặc hiển thị thông báo lỗi nếu có.
            });
    };
    function formatPrice(price) {
        const formattedPrice = price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND"
        });
        return formattedPrice;
    }
    return (
        <div className="bill">
            <div className="bill-page">
                <div className="bill-form-container">
                    <h1 className="title">Đơn Hàng</h1>
                    <form onSubmit={handleFormSubmit}>
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Chi Nhánh</Accordion.Header>
                                <Accordion.Body className='body'>
                                    {branchs.map((branch, index) => (
                                        <Card key={index} style={{ width: '18rem' }}>
                                            <Card.Img className="image-fixed-height" variant="top" src={branch.image} />
                                            <Card.Body>
                                                <Card.Title>{branch.name}</Card.Title>
                                                <Card.Text>
                                                    Mô tả: {branch.description}
                                                </Card.Text>
                                                <Card.Text>
                                                    Địa chỉ: {branch.address}
                                                </Card.Text>
                                                <Card.Text>
                                                    SDT: {branch.phone}
                                                </Card.Text>
                                                <Button variant="primary">Go somewhere</Button>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id={`flexCheckDefault-${index}`}
                                                        checked={branch.branchId === selectedBranchId}
                                                        onChange={() => handleBranchCheckboxChange(branch.branchId)}
                                                    />
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </Accordion.Body>
                            </Accordion.Item>

                            {/* =================Sảnh Cưới=========== */}
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Sảnh Cưới</Accordion.Header>
                                <Accordion.Body className='body'>
                                    {selectedItemHall.map((hall, index) => (
                                        <Card key={index} style={{ width: '18rem' }}>
                                            <Card.Img className='image-fixed-height' variant="top" src={hall.image} />
                                            <Card.Body>
                                                <Card.Title>{hall.name}</Card.Title>


                                                <Card.Text>Sức chứa: {hall.capacity}</Card.Text>
                                                <Card.Text>
                                                    Giá sảnh: {formatPrice(hall.price)}
                                                </Card.Text>
                                                <Card.Text>
                                                    Thuộc chi nhánh: {hall.branchName}
                                                </Card.Text>
                                                <Button variant="primary">Go somewhere</Button>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id={`flexCheckHall-${index}`}
                                                        checked={hall.hallId === selectedHallId}
                                                        onChange={() => handleHallCheckboxChange(hall.hallId)}
                                                    />
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </Accordion.Body>
                            </Accordion.Item>

                            {Object.entries(categorizedMenus).map(([categoryName, categoryMenus]) => (
                                <Accordion.Item key={categoryName} eventKey={categoryName}>
                                    <Accordion.Header>{categoryName}</Accordion.Header>
                                    <Accordion.Body className='body'>
                                        {categoryMenus.map(menu => (
                                            <Card key={menu.menuId} style={{ width: '18rem' }}>
                                                <Card.Img className='image-fixed-height' variant="top" src={menu.image} />
                                                <Card.Body>
                                                    <Card.Title>{menu.name}</Card.Title>
                                                    <Card.Text>{menu.description}</Card.Text>
                                                    <Card.Text>{menu.categoryName}</Card.Text>
                                                    <Card.Text>{formatPrice(menu.price)}</Card.Text>

                                                    <Button variant="primary">Go somewhere</Button>
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            value=""
                                                            id={`flexCheckDefault-${menu.menuId}`}
                                                            checked={selectedMenus.includes(menu.menuId)}
                                                            onChange={() => handleMenuCheckboxChange(menu.menuId)}
                                                        />
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}

                            {Object.entries(categorizedServices).map(([categoryName, categoryServices]) => (
                                <Accordion.Item key={categoryName} eventKey={categoryName}>
                                    <Accordion.Header>{categoryName}</Accordion.Header>
                                    <Accordion.Body className='body'>
                                        {categoryServices.map(service => (
                                            <Card key={service.serviceId} style={{ width: '18rem' }}>
                                                <Card.Img className='image-fixed-height' variant="top" src={service.image} />
                                                <Card.Body>
                                                    <Card.Title>{service.name}</Card.Title>
                                                    <Card.Text>{formatPrice(service.price)}</Card.Text>

                                                    <Card.Text>{service.description}</Card.Text>
                                                    <Button variant="primary">Chọn dịch vụ</Button>
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            value=""
                                                            id={`flexCheckDefault-${service.serviceId}`}
                                                            checked={selectedServices.includes(service.serviceId)}
                                                            onChange={() => handleServiceCheckboxChange(service.serviceId)}
                                                        />
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                            <h1 style={{marginTop:'20px'}} className="title">Thông tin người đặt</h1>
                            <div style={{marginTop:'20px'}} className="mb-2">
                                <label>Họ và Tên:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Họ và tên"
                                />
                            </div>

                            <div className="mb-2">
                                <label>Số Điện Thoại:</label>
                                <input
                                    className="form-control"
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="Số điện thoại"
                                />
                            </div>

                            <div className="mb-2">
                                <label>Ghi Chú cho Nhà Hàng:</label>
                                <textarea
                                    className="form-control"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="Ghi chú nếu có"
                                />
                            </div>

                            <div className="mb-2">
                                <label>Ngày đến tham dự: </label>
                                <DatePicker
                                    className="custom-date-picker"
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    dateFormat="dd/MM/yyyy" // Định dạng ngày tháng
                                    isClearable // Cho phép xóa ngày
                                    showYearDropdown // Hiển thị dropdown năm
                                    showMonthDropdown // Hiển thị dropdown tháng
                                    dropdownMode="select" // Chế độ dropdown
                                    placeholderText="Chọn ngày" // Văn bản mặc định
                                />
                            </div>

                        </Accordion>
                        <button style={{ marginTop: '20px' }} className='btn btn-success' variant="primary" type="submit">Xác nhận đặt nhà hàng</button>

                    </form>
                </div>
                <div className="selected-items">
                    <div className="selected-items-content" style={{ overflowY: 'auto', maxHeight: '800px' }}>
                        {selectedBranch && (
                            <div>
                                <h2>Chi nhánh đã chọn:</h2>
                                <div className="center-content">
                                    <img
                                        src={selectedBranch.image}
                                        alt={selectedBranch.name}
                                        style={{ width: '100%', height: '250px' }}
                                    />
                                    <h3><b>{selectedBranch.name}</b></h3>
                                </div>
                                <hr />
                            </div>
                        )}

                        {selectedHalls.length > 0 && (
                            <div>
                                <h2>Hội trường đã chọn:</h2>
                                <div className="center-content">
                                    {selectedHalls.map((hall, index) => (
                                        <div key={index}>
                                            <img
                                                src={hall.image}
                                                alt={hall.name}
                                                style={{ width: '100%', height: '250px' }}
                                            />
                                            <h3><b>{hall.name}</b></h3>
                                            <h3><b>{formatPrice(hall.price)}</b></h3>
                                        </div>
                                    ))}
                                </div>
                                <hr />
                            </div>
                        )}

                        <h2>Danh sách món ăn đã chọn:</h2>
                        {selectedMenus.length > 0 ? (
                            <div className="selected-menus">
                                {selectedMenus.map((menuId, index) => {
                                    const selectedMenu = menus.find(menu => menu.menuId === menuId);
                                    return (
                                        <div key={index} className="selected-menu">
                                            <div className="menu-image">
                                                <img src={selectedMenu.image} alt={selectedMenu.name} />
                                            </div>
                                            <div className="menu-details">
                                                <h4>{selectedMenu.name}</h4>
                                                <p>Giá: {formatPrice(selectedMenu.price)}</p>

                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : 'Chưa chọn món ăn'}

                        <h2>Dịch vụ đã chọn:</h2>
                        {selectedServices.length > 0 ? (
                            <div className="selected-menus">
                                {selectedServices.map(serviceId => {
                                    const selectedService = services.find(service => service.serviceId === serviceId);
                                    return (
                                        <div key={serviceId} className="selected-menu">
                                            <div className="menu-image">
                                                <img src={selectedService.image} alt={selectedService.name} />
                                            </div>
                                            <div className="menu-details">
                                                <h4>{selectedService.name}</h4>
                                                <p>Giá: {formatPrice(selectedService.price)}</p>

                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            'Chưa chọn dịch vụ'
                        )}
                    </div>


                    <div className="total-row">
                        <h5 className="total-label">Tổng tiền cần thanh toán: {formatPrice(calculateTotalPrice())}</h5>
                        <span className="total-amount"></span>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default Bill;
