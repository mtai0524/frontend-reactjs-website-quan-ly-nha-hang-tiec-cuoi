import { useState } from 'react';
import './Register.scss'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const nav = useNavigate()

    const initFormValue = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        avatar: "",
        phoneNumber: "",
    };
    const [formValue, setformValue] = useState(initFormValue);
    //check error
    const [formError, setformError] = useState({});


    const isEmptyValue = (value) => {
        return !value || value.trim().length < 1;
    };


    const isEmailVaild = (email) => {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
    };

    const validateForm = () => {
        const error = {};

        if (isEmptyValue(formValue.firstName)) {
            error["firstName"] = "First Name is required";
        }

        if (isEmptyValue(formValue.lastName)) {
            error["lastName"] = "Last Name is required";
        }

        if (isEmptyValue(formValue.email)) {
            error["email"] = "Email is required";
        } else if (!isEmailVaild(formValue.email)) {
            error["email"] = "Email is invalid";
        }

        if (isEmptyValue(formValue.password)) {
            error["password"] = "Password is required";
        }

        if (isEmptyValue(formValue.confirmPassword)) {
            error["confirmPassword"] = "Confirm Password is required";
        } else if (formValue.confirmPassword !== formValue.password) {
            error["confirmPassword"] = "Passwords do not match";
        }
        if (isEmptyValue(formValue.phoneNumber)) {
            error["phoneNumber"] = "Phone is required";
        }
        setformError(error);
        return Object.keys(error).length === 0;
    };

    //được sử dụng để cập nhật trạng thái của một thành phần (component)
    //  trong ứng dụng React khi người dùng tương tác với nó, chẳng hạn như khi họ nhập dữ liệu vào một trường nhập liệu (input field).
    const handleChange = (event) => {
        const { value, name } = event.target;
        setformValue({
            ...formValue,
            [name]: value,
        });
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Lấy tệp đầu tiên trong danh sách tệp đã chọn

        if (file) {
            // Đọc tệp hình ảnh và chuyển đổi nó thành đường dẫn dạng URL
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageURL = event.target.result;
                setformValue({ ...formValue, avatar: imageURL });
            };
            reader.readAsDataURL(file); // Đọc tệp dưới dạng URL

            // Bạn có thể thêm logic xử lý tệp ở đây, ví dụ: tải lên máy chủ
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://localhost:7296/api/account/SignUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValue),
            });

            if (response.ok && validateForm()) {
                toast.success('Đăng ký thành công!'); // Hiển thị thông báo thành công
                console.log("form value", formValue);
                nav('/login')

            }
            else {
                toast.error('Đăng ký thất bại. Vui lòng kiểm tra lại thông tin đăng ký.');
                console.log("form invalue")
            }
        } catch (error) {
            console.error('Lỗi khi đăng ký:', error);
            // Xử lý khi xảy ra lỗi
        }
    };

    console.log(formError);
    return (
        <div className="register-page">

            <div className="register-form-container">
                <h1 className="title">
                    Đăng kí tài khoản
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="first-name" className="form-label">
                            First Name
                        </label>
                        <input
                            id="first-name"
                            className="form-control"
                            type="text"
                            name="firstName"
                            value={formValue.firstName}
                            onChange={handleChange}
                        />
                        {formError.firstName && (
                            <div className='error'>{formError.firstName}</div>
                        )}
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="last-name" className="form-label">
                            Last Name
                        </label>
                        <input
                            id="last-name"
                            className="form-control"
                            type="text"
                            name="lastName"
                            value={formValue.lastName}
                            onChange={handleChange}

                        />
                        {formError.lastName && (
                            <div className='error'>{formError.lastName}</div>
                        )}
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            id="email"
                            className="form-control"
                            type="text"
                            name="email"
                            value={formValue.email}
                            onChange={handleChange}

                        />
                        {formError.email && (
                            <div className='error'>{formError.email}</div>
                        )}
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            id="password"
                            className="form-control"
                            type="password"
                            name="password"

                            value={formValue.password}
                            onChange={handleChange}

                        />
                        {formError.password && (
                            <div className='error'>{formError.password}</div>
                        )}
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="confirm-password" className="form-label">
                            Confirm Password
                        </label>
                        <input
                            id="confirm-password"
                            className="form-control"
                            type="password"
                            name="confirmPassword"
                            value={formValue.confirmPassword}
                            onChange={handleChange}

                        />
                        {formError.confirmPassword && (
                            <div className='error'>{formError.confirmPassword}</div>
                        )}
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="phoneNumber" className="form-label">
                            Phone Number
                        </label>
                        <input
                            id="phoneNumber"
                            className="form-control"
                            type="text"
                            name="phoneNumber"
                            value={formValue.phoneNumber}
                            onChange={handleChange}

                        />
                        {formError.phoneNumber && (
                            <div className='error'>{formError.phoneNumber}</div>
                        )}
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="avatar" className="form-label">
                            Avatar
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
                        {formError.avatar && (
                            <div className='error'>{formError.avatar}</div>
                        )}
                    </div>
                    <button className="w-100 btn btn-lg btn-primary mt-3 custom-button" type="submit">
                        Đăng kí
                    </button>



                </form>
            </div>

        </div>

    )
}
export default Register;