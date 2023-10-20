import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

const Feedback = () => {
    const [invoices, setInvoices] = useState([]);

    const tokenFromCookie = Cookies.get('token_user');
    let id = null;
    if (tokenFromCookie) {
        const decodedToken = jwt_decode(tokenFromCookie);
        id = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    }

    const fetchInvoicesByUser = async () => {
        try {
            const response = await fetch(`https://localhost:7296/api/invoice/get-invoice/${id}`);
            if (response.ok) {
                const data = await response.json();
                setInvoices(data);
            } else {
                console.error("Lỗi khi lấy lịch sử đơn hàng");
            }
        } catch (error) {
            console.error("Lỗi server:", error);
        }
    };

    useEffect(() => {
        fetchInvoicesByUser();
    }, []);

    return (
        <div>
            cc j v
            <h1>vcl cc j</h1>
            {invoices.map((invoice) => (
                <Card key={invoice.invoiceID} style={{ marginBottom: '20px' }}>
                    <Card.Body>
                        <h5>Invoice ID: {invoice.invoiceID}</h5>
                        <p>User ID: {invoice.userId}</p>
                        <p>Branch ID: {invoice.branchId}</p>
                        <p>Attendance Date: {invoice.attendanceDate}</p>
                        <p>Total: {invoice.total} VNĐ</p>
                        <ul>
                            {invoice.orderMenus.map((orderMenu) => (
                                <li key={orderMenu.orderMenuId}>
                                    Menu: {orderMenu.menuEntity.name}, Price: {orderMenu.menuEntity.price} VNĐ
                                </li>
                            ))}
                        </ul>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default Feedback;
