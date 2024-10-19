import React, { useState } from 'react';
import Fooster from './Fooster';
import Banner from './Banner';
import { event } from 'jquery';

const initForm = {
    fristName:"",
    lastName:"",
    organization:"",
    phone:"",
    nationality:"",
    email:"",
    userName:"",
    password:"",
    confirm_password:"",

}

export default function Register() {
    const [formValue,SetformValue] = useState(initForm);
    const [formError,SetformError] = useState({});


    const validateForm = () => {
        const error = {};

        
        return Object.keys(error).length === 0;

    }

    const handleChange = (event) => {
        const {value,name} = event.target;
        SetformValue({
            ...formValue,
            [name]: value,
        });
    };


    const handleSubmit = (event) => {

        if(validateForm()){
            console.log("form value", formValue);
        }else{
            console.log("form invalid");
        }

    }

    return (
        <div>
        <Banner/>
        <div className="layout-login">
            <div className="registration-container">
                <h2>Đăng Ký</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="first-name">Tên đệm và tên <span className="required">*</span></label>
                        <input type="text" id="first-name" name="fristName" value={formValue.fristName} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="last-name">Họ <span className="required">*</span></label>
                        <input type="text" id="last-name" name="lastName" value={formValue.lastName} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="organization">Cơ quan <span className="required">*</span></label>
                        <input type="text" id="organization" name="organization" value={formValue.organization} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="phone">Điện thoại</label>
                        <input type="tel" id="phone" name="phone" value={formValue.phone} onChange={handleChange} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="nationality">Quốc tịch <span className="required">*</span></label>
                        <select id="nationality" name="nationality" value={formValue.nationality} onChange={handleChange} required>
                            <option value="Vietnam">Việt Nam</option>
                            {/* Thêm các quốc gia khác tại đây */}
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email <span className="required">*</span></label>
                        <input type="email" id="email" name="email" value={formValue.email} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="username">Tên tài khoản <span className="required">*</span></label>
                        <input type="text" id="username" name="userName" value={formValue.userName} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Mật khẩu <span className="required">*</span></label>
                        <input type="password" id="password" name="password" value={formValue.password} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirm-password">Nhập lại mật khẩu <span className="required">*</span></label>
                        <input type="password" id="confirm-password" name="confirm_password" value={formValue.confirm_password} onChange={handleChange} required />
                    </div>
                    <div className="checkbox-group">
                        <input type="checkbox" id="agree-terms" name="agree-terms" required />
                        <label htmlFor="agree-terms">Tôi đồng ý để dữ liệu của tôi được thu thập và lưu trữ theo cam kết bảo mật.</label>
                    </div>
                    <div className="checkbox-group">
                        <input type="checkbox" id="subscribe" name="subscribe" />
                        <label htmlFor="subscribe">Có, tôi muốn được thông báo về các ấn phẩm và thông báo mới.</label>
                    </div>
                    <div className="checkbox-group">
                        <input type="checkbox" id="reviewer" name="reviewer" />
                        <label htmlFor="reviewer">Ông/Bà có sẵn sàng để làm phản biện cho tạp chí này? Có, yêu cầu vai trò Người phản biện.</label>
                    </div>
                    <button type="submit" className="register-btn">Đăng Ký</button>
                </form>
            </div>
        </div>
        <Fooster/>
      </div>

    );
};


