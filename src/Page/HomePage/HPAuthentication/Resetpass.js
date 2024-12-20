import React, { useState, useContext } from 'react';
import axios from 'axios';
import Fooster from '../../../components/Fooster';
import Banner from '../../../components/Banner';
import { AuthContext } from '../../../Context Status/AuthContext';

const Resetpass = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { apiUrl } = useContext(AuthContext);
    
    // Hàm để lấy token từ query parameters
    const getQueryParam = (param) => {
        const query = new URLSearchParams(window.location.search);
        return query.get(param);
    };

    // Lấy token từ URL
    const token = getQueryParam('token');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Kiểm tra xem mật khẩu và xác nhận mật khẩu có giống nhau không
        if (password !== confirmPassword) {
            setError('Mật khẩu không khớp. Vui lòng thử lại.');
            return;
        }
    
        const requestData = {
            token: token,
            email: email,
            password: password,
            password_confirmation: confirmPassword,
        };
    
        console.log('Gửi dữ liệu:', requestData);
    
        try {
            const response = await axios.post(`${apiUrl}/api/auth/reset-password`, requestData);
    
            console.log(response.data); // In ra phản hồi từ server
            // Xử lý phản hồi từ server
            if (response.data.message === "Password reset successfully.") {
                setSuccess('Mật khẩu đã được cập nhật thành công!');
                setError('');
            } else {
                setError('Đã xảy ra lỗi. Vui lòng thử lại.');
                setSuccess('');
            }
        } catch (err) {
            console.error('Lỗi:', err.response ? err.response.data : err.message); // In ra lỗi chi tiết
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
            } else {
                setError('Đã xảy ra lỗi. Vui lòng thử lại. lỗi hệ thống');
            }
            setSuccess('');
        }
    };
        

    return (
        <>
            <Banner />
            <div className="layout-login">
                <div className="registration-container">
                    <h2>Nhập lại mật khẩu mới</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Email <span className="required">*</span></label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Mật khẩu <span className="required">*</span></label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="confirm-password">Nhập lại mật khẩu <span className="required">*</span></label>
                            <input
                                type="password"
                                id="confirm-password"
                                name="confirm-password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        {error && <div className="text-danger">{error}</div>}
                        {success && <div className="text-success">{success}</div>}
                        <button type="submit" className="register-btn">Đặt lại mật khẩu</button>
                    </form>
                </div>
            </div>
            <Fooster />
        </>
    );
};

export default Resetpass;
