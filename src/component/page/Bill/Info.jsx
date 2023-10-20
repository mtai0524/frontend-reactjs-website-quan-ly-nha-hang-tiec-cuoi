// OrderModal.js

import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Info = ({
    fullName,
    setFullName,
    phoneNumber,
    setPhoneNumber,
    note,
    setNote,
    selectedDate,
    handleDateChange,
}) => {
    return (
        <div className="order-modal">
            <div className="form-group">
                <label>Họ và Tên:</label>
                <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Họ và Tên"
                />
            </div>

            <div className="form-group">
                <label>Số Điện Thoại:</label>
                <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Số Điện Thoại"
                />
            </div>

            <div className="form-group">
                <label>Ghi Chú cho Nhà Hàng:</label>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Ghi Chú"
                />
            </div>

            <div className="form-group">
                <label>Ngày đến tham dự: </label>
                <DatePicker
                    className="custom-date-picker"
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    isClearable
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    placeholderText="Chọn ngày"
                />
            </div>
        </div>
    );
};

export default Info;
