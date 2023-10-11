import './Bill.scss';
import { Accordion, Button, Card } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

const Bill = () => {
    const [branchs, setBranchs] = useState([]);
    const [halls, setHalls] = useState([]);
    const [selectedBranchId, setSelectedBranchId] = useState(null);
    const [selectedHallId, setSelectedHallId] = useState(null);
    const [selectedHallIndex, setSelectedHallIndex] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedHalls, setSelectedHalls] = useState([]);
    const [scrollY, setScrollY] = useState(0);
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

        if (selectedBranch && selectedHalls.length > 0) {

            console.log("Chi nhánh đã chọn:", selectedBranch.name);
            console.log("Hội trường đã chọn:", selectedHalls.map(hall => hall.name).join(', '));
            console.log("Danh sách món ăn đã chọn:", selectedMenus.map(menuId => {
                const selectedMenu = menus.find(menu => menu.menuId === menuId);
                return selectedMenu ? selectedMenu.name : '';
            }).join(', '));

            // Gửi đơn hàng nếu các điều kiện đều đúng
    console.log('orderData:', orderData);

            sendOrderData();
        }
        else {
            toast.error('Chi nhánh hoặc sảnh chưa được chọn á !', {
                position: 'top-right',
                autoClose: 3000, // Thời gian hiển thị toast (3 giây)
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
        const total = selectedMenus.reduce((acc, menuId) => {
            const selectedMenu = menus.find(menu => menu.menuId === menuId);
            return acc + selectedMenu.price;
        }, 0);

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

    const orderData = {
        userId: id, // Thay bằng ID người dùng đang đăng nhập
        branch: selectedBranch ? selectedBranch.branchId : null, // ID của chi nhánh đã chọn
        halls: selectedHallIdDo, // ID của sảnh đã chọn
        selectedMenus: selectedMenus, // Danh sách ID của các món ăn đã chọn
    };
    const sendOrderData = () => {
        fetch('https://your-api-endpoint.com/submit-order', {
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
                                                <Card.Text>
                                                    Mô tả: {hall.description}
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
                                                    <Card.Text>{menu.price}</Card.Text>
                                                    <Card.Text>{menu.description}</Card.Text>
                                                    <Card.Text>{menu.categoryName}</Card.Text>
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


                        </Accordion>
                        <Button variant="primary" type="submit">Submit</Button>
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
                                                <p>Giá: {selectedMenu.price} VND</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : 'Chưa chọn món ăn'}
                    </div>
                    <div className="total-row">
                        <h5 className="total-label">Tổng tiền các món ăn: {calculateTotalPrice()} VND</h5>
                        <span className="total-amount"></span>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default Bill;
