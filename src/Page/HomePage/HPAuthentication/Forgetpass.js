import React, { useState , useContext} from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import Fooster from '../../../components/Fooster';
import Banner from '../../../components/Banner';
import { AuthContext } from '../../../Context Status/AuthContext';



//Chưa xong cc gì hết đừng có đụng
const Forgetpass = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { apiUrl } = useContext(AuthContext);
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Gọi API để gửi mã OTP đến email
            const response = await axios.post(`${apiUrl}/api/auth/forget-password`, {
                email: email,
            });
            
            if (response.data.status === 200) {
                // Xử lý phản hồi từ server
                setSuccess('Mã OTP đã được gửi đến email của bạn!');
                alert('Mã OTP đã được gửi đến email của bạn!')
                setError('');
            }

        } catch (err) {
            // Xử lý lỗi nếu có
            setError('Đã xảy ra lỗi. Vui lòng kiểm tra lại email của bạn.');
            setSuccess('');
        }
    };

    
    return (
        <>
        <Banner/>
        <div className="layout-login">
            <div className="login-container">
                <h2>Quên mật khẩu</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Email của người dùng đã đăng ký</label>
                        <input
                            type="email"
                            id="username"
                            name="username"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {error && <div className="text-danger">{error}</div>}
                    {success && <div className="text-success">{success}</div>}

                    <button type="submit" className="login-btn">Gửi mã OTP</button>
                    <span></span>
                    <Link to={"/Register"}>
                        <button type="button" className="forget-pass-btn">Đăng ký</button>
                    </Link>
                </form>
            </div>
        </div>
        <Fooster/>
        </>

    );
};

export default Forgetpass;
