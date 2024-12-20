import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Fooster from '../../../components/Fooster';
import Banner from '../../../components/Banner';
import { AuthContext } from '../../../Context Status/AuthContext';

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [organization, setOrganization] = useState("");
    const [phone, setPhone] = useState("");
    const [nationality, setNationality] = useState("Vietnam"); // Mặc định là Việt Nam
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(""); // Thêm trạng thái cho lỗi
    const navigate = useNavigate();
    const { apiUrl } = useContext(AuthContext); // Lấy apiUrl từ AuthContext

    const handleSubmit = async (event) => {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của form
        
        // Kiểm tra định dạng email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            setError("Email không hợp lệ.");
            return;
        }

        // Kiểm tra định dạng mật khẩu (ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số)
        const passwordRegex = /^.{8,}$/;
        if (!passwordRegex.test(password)) {
            setError("Mật khẩu phải có ít nhất 8 ký tự.");
            return;
        }

        // Kiểm tra xác nhận mật khẩu
        if (password !== confirmPassword) {
            setError("Mật khẩu xác nhận không khớp.");
            return;
        }

        // Kiểm tra số điện thoại chỉ chứa số
        const phoneRegex = /^\d+$/;
        if (!phoneRegex.test(phone)) {
            setError("Số điện thoại chỉ chứa các chữ số.");
            return;
        }


        // In các giá trị trước khi gửi
        console.log("Submitting registration with data:", {
            first_name: firstName,
            last_name: lastName,
            organization: organization,
            phone: phone,
            nationality: nationality,
            email: email,
            username: userName, 
            password: password,
            password_confirmation: confirmPassword,
        });
        
        try {
            const response = await axios.post(`${apiUrl}/api/auth/register`, {
                first_name: firstName,
                last_name: lastName,
                organization: organization,
                phone: phone,
                nationality: nationality,
                email: email,
                username: userName, 
                password: password,
                password_confirmation: confirmPassword,
            });
    
            // In ra phản hồi của server khi thành công
            console.log("Server response on success:", response.data);
            
            // Kiểm tra phản hồi từ server
            if (response.data.status === 201) {
                alert("Đăng ký thành công! Vui lòng xác nhận email của bạn.");
                navigate('/'); // Điều hướng đến trang chính
                setError();
            } else {
                setError('Đăng ký không thành công: ' + response.data.message);
            }
        } catch (error) {
            console.error("Error during registration:", error);
    
            // In chi tiết phản hồi lỗi
            if (error.response) {
                console.log("Error response data:", error.response.data);
                setError('Đã xảy ra lỗi khi đăng ký: ' + error.response.data.message );
            } else if (error.request) {
                console.log("Error request data:", error.request);
                setError('Không thể kết nối đến server. Vui lòng thử lại sau.');
            } else {
                console.log("General error message:", error.message);
                setError('Đã xảy ra lỗi không xác định.');
            }
        }
    };
    
    
    

    return (
        <div>
            <Banner />
            <div className="layout-login">
                <div className="registration-container">
                    <h2>Đăng Ký</h2>
                    {error && <p className="error-message">{error}</p>} {/* Hiển thị thông báo lỗi */}
                    <form onSubmit={handleSubmit} className='register-layout'>
                        <div className="register-col1">
                        <div className="input-group">
                            <label htmlFor="first-name">Tên <span className="required">*</span></label>
                            <input type="text" id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="last-name">Họ <span className="required">*</span></label>
                            <input type="text" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="organization">Cơ quan <span className="required">*</span></label>
                            <input type="text" id="organization" value={organization} onChange={(e) => setOrganization(e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="phone">Điện thoại</label>
                            <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        </div>
                        <div className="register-col2">
                        <div className="input-group">
                            <label htmlFor="nationality">Quốc tịch <span className="required">*</span></label>
                            <select id="nationality" value={nationality} onChange={(e) => setNationality(e.target.value)} required>
                                <option value="Vietnam">Việt Nam</option>
                                {/* Thêm các quốc gia khác tại đây */}
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email <span className="required">*</span></label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="username">Tên tài khoản <span className="required">*</span></label>
                            <input type="text" id="username" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Mật khẩu <span className="required">*</span></label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="confirm-password">Nhập lại mật khẩu <span className="required">*</span></label>
                            <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        </div>
                        </div>
                        
                        <div className="checkbox-group register-col12">
                            <input type="checkbox" id="agree-terms" required />
                            <label htmlFor="agree-terms">Tôi đồng ý để dữ liệu của tôi được thu thập và lưu trữ theo cam kết bảo mật.</label>
                        </div>
                        <div className="checkbox-group register-col12">
                            <input type="checkbox" id="subscribe"/>
                            <label htmlFor="subscribe">Có, tôi muốn được thông báo về các ấn phẩm và thông báo mới.</label>
                        </div>
                        <div className="checkbox-group register-col12">
                            <input type="checkbox" id="reviewer"/>
                            <label htmlFor="reviewer">Ông/Bà có sẵn sàng để làm phản biện cho tạp chí này? Có, yêu cầu vai trò Người phản biện.</label>
                        </div>
                        <button type="submit" className="register-btn register-col12">Đăng Ký</button>
                    </form>
                </div>
            </div>
            <Fooster />
        </div>
    );
}
