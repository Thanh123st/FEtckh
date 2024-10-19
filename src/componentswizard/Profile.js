import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './Wizard.css';
import HeaderSub, { SlideBar } from './HeaderSub';


function Profile() {
    const [activeTab, setActiveTab] = useState('1');

    const showContext = (contextId) => {
        setActiveTab(contextId);
    };

    return (

        <div>
              <style>
        {`
          .btn {
            margin-right: 10px;
          }
          .font-width-bold{
            font-weight: bold;
          }
        `}
      </style>
        <HeaderSub/>
        <div className="pkp_structure_main">
            <SlideBar></SlideBar>
            <div className="pkp_structure_content">
            <div className="pkp_details">
                <div className="pkp_page_title">
                    <h3>Thông tin cá nhân</h3>
                </div>
            </div>
            <div className="pkp_structure_content">
                <div className="pkpTabs">
                    <div className="tabs-list">
                        <button 
                            id="btn-1" 
                            className={activeTab === '1' ? 'selected-button' : ''} 
                            onClick={() => showContext('1')}
                        >
                            Thông tin
                        </button>
                        <button 
                            id="btn-2" 
                            className={activeTab === '2' ? 'selected-button' : ''} 
                            onClick={() => showContext('2')}
                        >
                            Liên hệ
                        </button>
                        <button 
                            id="btn-3" 
                            className={activeTab === '3' ? 'selected-button' : ''} 
                            onClick={() => showContext('3')}
                        >
                            Quyền
                        </button>
                        <button 
                            id="btn-4" 
                            className={activeTab === '4' ? 'selected-button' : ''} 
                            onClick={() => showContext('4')}
                        >
                            Hồ sơ cá nhân
                        </button>
                        <button 
                            id="btn-5" 
                            className={activeTab === '5' ? 'selected-button' : ''} 
                            onClick={() => showContext('5')}
                        >
                            Mật khẩu
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div id="1" className={`context ${activeTab === '1' ? 'active' : ''}`}>
                        <div className="pkpListPanel__content">
                            <form>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="chucDanh" className="form-label"><strong>Chức danh</strong></label>
                                            <select id="chucDanh" className="form-select">
                                                <option selected>Ông</option>
                                                <option value="1">Bà</option>
                                                <option value="2">Cô</option>
                                                <option value="3">Thạc sĩ</option>
                                                <option value="4">Tiến sĩ</option>
                                                <option value="5">Phó Giáo Sư</option>
                                                <option value="6">Giáo sư</option>
                                            </select>
                                            <small className="form-text text-muted">Chức danh *</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6 text-start">
                                        <p><strong>Tài khoản</strong></p>
                                        <p>hoctrohoangthanh</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="firstName" className="form-label"><strong>Họ và tên</strong></label>
                                            <input type="text" className="form-control" id="firstName" placeholder="Chữ đệm và tên" value="Thanh" />
                                            <small className="form-text text-muted">Chữ đệm và tên *</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="lastName" className="form-label">&nbsp;</label>
                                            <input type="text" className="form-control" id="lastName" placeholder="Họ" value="Nguyễn" />
                                            <small className="form-text text-muted">Họ *</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="gioiTinh" className="form-label"><strong>Giới tính</strong></label>
                                            <select id="gioiTinh" className="form-select">
                                                <option selected>Nam</option>
                                                <option value="1">Nữ</option>
                                                <option value="2">Khác</option>
                                            </select>
                                            <small className="form-text text-muted">Giới tính *</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12" style={{ gridColumn: 'span 2' }}>
                                        <small className="form-text text-muted">Dữ liệu của bạn được lưu trữ theo <a href="#">cam kết bảo mật</a> của chúng tôi.</small>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <button type="submit" className="btn btn-primary">Lưu lại</button>
                                        <button type="reset" className="btn btn-danger">Hủy bỏ</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div id="2" className={`context ${activeTab === '2' ? 'active' : ''}`}>
                        <div className="pkpListPanel__content">
                            <form>
                                <div className="row">
                                    <div className="mb-3 full-width">
                                        <label htmlFor="email" className="form-label font-width-bold">Email</label>
                                        <input type="email" className="form-control" id="email" value="hoctrohoangthanh@gmail.com" readOnly />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-3 full-width">
                                        <label htmlFor="organization" className="form-label font-width-bold">Đơn vị tổ chức</label>
                                        <textarea className="form-control" id="organization" rows="3" style={{ maxHeight: '120px' }}></textarea>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12" style={{ gridColumn: 'span 2' }}>
                                        <small className="form-text text-muted">Dữ liệu của bạn được lưu trữ theo <a href="#">cam kết bảo mật</a> của chúng tôi.</small>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <button type="submit" className="btn btn-primary">Lưu lại</button>
                                        <button type="reset" className="btn btn-danger">Hủy bỏ</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div id="3" className={`context ${activeTab === '3' ? 'active' : ''}`}>
                        <div className="pkpListPanel__content">
                            <form>
                                <div className="row">
                                    <div className="mb-3 full-width">
                                        <legend className="col-form-label font-width-bold">Quyền</legend>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="reader" checked />
                                            <label className="form-check-label" htmlFor="reader">Đọc giả</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="author" checked />
                                            <label className="form-check-label" htmlFor="author">Tác giả</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="reviewer" />
                                            <label className="form-check-label" htmlFor="reviewer">Phản biện</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-3 full-width">
                                        <label htmlFor="researchField" className="form-label font-width-bold">Lĩnh vực nghiên cứu</label>
                                        <input type="text" className="form-control" id="researchField" placeholder="Nhập lĩnh vực nghiên cứu" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 full-width">
                                        <small className="form-text text-muted">Dữ liệu của bạn được lưu trữ theo <a href="#">cam kết bảo mật</a> của chúng tôi.</small>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <button type="submit" className="btn btn-primary">Lưu lại</button>
                                        <button type="reset" className="btn btn-danger">Hủy bỏ</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div id="4" className={`context ${activeTab === '4' ? 'active' : ''}`}>
                        <div className="pkpListPanel__content">
                            <form>
                                <div className="row">
                                    <div className="mb-3 full-width">
                                        <label htmlFor="address" className="form-label font-width-bold">Địa chỉ</label>
                                        <input type="text" className="form-control" id="address" placeholder="Nhập địa chỉ" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-10">
                                        <div className="mb-3">
                                            <label htmlFor="phone" className="form-label font-width-bold">Số điện thoại</label>
                                            <input type="text" className="form-control" id="phone" placeholder="Nhập số điện thoại" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="dob" className="form-label font-width-bold">Ngày sinh</label>
                                            <input type="date" className="form-control" id="dob" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 full-width">
                                        <small className="form-text text-muted">Dữ liệu của bạn được lưu trữ theo <a href="#">cam kết bảo mật</a> của chúng tôi.</small>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <button type="submit" className="btn btn-primary">Lưu lại</button>
                                        <button type="reset" className="btn btn-danger">Hủy bỏ</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div id="5" className={`context ${activeTab === '5' ? 'active' : ''}`}>
                        <div className="pkpListPanel__content">
                            <form>
                                <div className="row">
                                    <div className="mb-3 ">
                                        <label htmlFor="currentPassword" className="form-label font-width-bold">Mật khẩu hiện tại</label>
                                        <input type="password" className="form-control" id="currentPassword" placeholder="Nhập mật khẩu hiện tại" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-3">
                                        <label htmlFor="newPassword" className="form-label font-width-bold">Mật khẩu mới</label>
                                        <input type="password" className="form-control" id="newPassword" placeholder="Nhập mật khẩu mới" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-3">
                                        <label htmlFor="confirmPassword" className="form-label font-width-bold">Xác nhận mật khẩu mới</label>
                                        <input type="password" className="form-control" id="confirmPassword" placeholder="Xác nhận mật khẩu mới" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 full-width">
                                        <small className="form-text text-muted">Dữ liệu của bạn được lưu trữ theo <a href="#">cam kết bảo mật</a> của chúng tôi.</small>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <button type="submit" className="btn btn-primary">Lưu lại</button>
                                        <button type="reset" className="btn btn-danger">Hủy bỏ</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>

        </div>

    );
}

export default Profile;
