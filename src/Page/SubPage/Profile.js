import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import '../../Css/Wizard.css'; 
import HeaderSub, { SlideBar } from '../../components/HeaderSub';
import axios from 'axios';
import { AuthContext } from '../../Context Status/AuthContext';
import Editor from '../../components/Editor';
import LoadingComponent from '../../components/loading';



function Profile() {
        const [activeTab, setActiveTab] = useState('1');
        const { token, apiUrl } = useContext(AuthContext);
        const [userData, setUserData] = useState({
            avatar: null,
            bio: "",
            chucdanh: "",
            created_at: "",
            email: "",
            first_name: "",
            gioitinh: "",
            homepage_url: "",
            id: null,
            last_name: "",
            research_field: null,
            linkurl: null,
            nationality: "",
            organization: "",
            phone: "",
            quyen: 0,
            status: "",
            tieusu: null,
            token: null,
            updated_at: "",
            username: ""
        });

        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(true); // Trạng thái loading
        const [loadingtime, setLoadingtime] = useState(true);

        useEffect(() => {
            setTimeout(() => {
            setLoadingtime(false);  // Giả lập thời gian tải trang
            }, 1500);
        }, []);

        const showContext = (contextId) => {
            setActiveTab(contextId);
        };


        const getUserData = async () => {
            setLoading(true); // Bắt đầu tải dữ liệu
            try {
                const response = await axios.get(`${apiUrl}/api/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserData(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                setError('Lỗi khi lấy dữ liệu: ' + error.message);
                console.error('Lỗi khi lấy dữ liệu:', error);
            } finally {
                setLoading(false); // Kết thúc tải dữ liệu
            }
        };





        const [imgavt, setImgavt] = useState("");
        const fetchAvatar = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiUrl}/api/auth/avatar`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log(response.data);
                // Giả sử response.data chứa tên tệp hoặc ID của hình ảnh đại diện
                const avatarUrl = `${apiUrl}/api/avatar/${response.data.avatar}`;
    
                // Cập nhật imgavt thay vì userData.avatar
                
                setImgavt(avatarUrl);
                
            } catch (error) {
                console.error('Error fetching avatar:', error);
            }
            finally {
                setLoading(false); 
            }
        };




        useEffect(() => {
            if (token) {
                getUserData();
                fetchAvatar();
            }
        }, [token]);

        


    //Resetpass
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [success, setSuccess] = useState('');


    const handleSubmit5 = async (event) => {
        event.preventDefault();
        // Kiểm tra xem mật khẩu mới và xác nhận mật khẩu có khớp nhau không
        if (newPassword !== confirmPassword) {
            setError('Mật khẩu mới và xác nhận mật khẩu không khớp.');
            return;
        }
        try {
            // Gọi API với địa chỉ endpoint chính xác và thêm token vào header
            const response = await axios.put(`${apiUrl}/api/user/update5`, {
                current_password: currentPassword,
                new_password: newPassword,
                new_password_confirmation: confirmPassword,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Thêm token vào header
                },
            });
            if(response.status===200){
                // Hiển thị thông báo thành công
                setSuccess('Mật khẩu đã được thay đổi thành công!');
                setError('');
            }
        } catch (err) {
            // Hiển thị thông báo lỗi
            setError('Đã xảy ra lỗi. Vui lòng thử lại.');
            setSuccess('');
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
            setUserData(prevData => ({
                ...prevData,
                [name]: value // Cập nhật các trường khác
            }));
    };


    //UPDATE 1
    const handleSubmit1 = async (e) => {
        e.preventDefault(); 
        try {
            const response = await axios.put(`${apiUrl}/api/user/update1`, {
                first_name: userData.first_name,
                last_name: userData.last_name,
                title: userData.chucdanh,
                gender: userData.gioitinh
            }, {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            });
            console.log('Kết quả trả về:', response.data);
            alert(response.data.message);
        } catch (error) {
            console.error('Lỗi khi cập nhật dữ liệu:', error);
            alert('Có lỗi xảy ra khi cập nhật thông tin.');
        }
    };
    

    //UPDATE2
    const handleSubmit2 = async (e) => {
        e.preventDefault(); // Ngăn chặn reload trang
        console.log("thông tin gửi đi",userData.organization);

        try {
            const response = await axios.put(`${apiUrl}/api/user/update2`, {
                organization: userData.organization
            }, {
                headers: {
                    'Authorization': `Bearer ${token}` // Thêm token vào header
                }
            });
            console.log('Thông tin gửi đi',userData.organization);
            console.log('Kết quả trả về:', response.data);
            // Bạn có thể hiển thị thông báo thành công cho người dùng tại đây
            alert(response.data.message);
        } catch (error) {
            console.error('Lỗi khi cập nhật dữ liệu:', error);
            // Bạn có thể hiển thị thông báo lỗi cho người dùng tại đây
            alert('Có lỗi xảy ra khi cập nhật thông tin.');
        }
    };


    //UPDATE3
    const handleSubmit3 = async (e) => {
        e.preventDefault(); // Ngăn chặn reload trang
        try {
            const response = await axios.put(`${apiUrl}/api/user/update3`, {
                research_field: userData.research_field
            }, {
                headers: {
                    'Authorization': `Bearer ${token}` // Thêm token vào header
                }
            });
            console.log('Kết quả trả về:', response.data);
            alert(response.data.message);
        } catch (error) {
            console.error('Lỗi khi cập nhật dữ liệu:', error);
            alert('Có lỗi xảy ra khi cập nhật thông tin.');
        }
    };


    //UPDATE4
    const [file, setFile] = useState(null);
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit4 = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("bio", userData.bio);
        formData.append("homepage_url", userData.homepage_url);
        formData.append("profile_image", file);
    
        console.log('Dữ liệu gửi đi:');
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        try {
            const response = await axios.post(`${apiUrl}/api/user/update4`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data', // Đặt Content-Type cho FormData
                }
            });
    
            if (response.status === 200) {
                // Hiển thị thông báo thành công
                alert(response.data.message);
                fetchAvatar();
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật dữ liệu:', error);
            alert('Có lỗi xảy ra khi cập nhật thông tin.');
        }
    };



    
    

    


    return (
        <div>
        {loadingtime ? (
          <LoadingComponent></LoadingComponent>
        ) : (
          
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
                            Hồ sơ
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
                            <form onSubmit={handleSubmit1}>
                                <div className="row_subs">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="chucDanh" className="form-label"><strong>Chức danh</strong></label>
                                            <select id="chucDanh" name="chucdanh" className="form-select" value={userData.title} onChange={handleChange}>
                                                <option selected value="Ông">Ông</option>
                                                <option value="Bà">Bà</option>
                                                <option value="Cô">Cô</option>
                                                <option value="Thạc sĩ">Thạc sĩ</option>
                                                <option value="Tiến sĩ">Tiến sĩ</option>
                                                <option value="Phó giáo sư">Phó Giáo Sư</option>
                                                <option value="Giáo sư">Giáo sư</option>
                                            </select>
                                            <small className="form-text text-muted">Chức danh *</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6 text-start">
                                        <p><strong>Tài khoản</strong></p>
                                        <p>{userData.username}</p>
                                    </div>
                                </div>
                                <div className="row_subs">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="firstName" className="form-label"><strong>Họ và tên</strong></label>
                                            <input type="text" className="form-control" id="firstName" name="first_name" placeholder="Chữ đệm và tên" value={userData.first_name} onChange={handleChange}/>
                                            <small className="form-text text-muted">Tên *</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="lastName" className="form-label">&nbsp;</label>
                                            <input type="text" className="form-control" id="lastName" name="last_name" placeholder="Họ" value={userData.last_name} onChange={handleChange}/>
                                            <small className="form-text text-muted">Họ *</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="row_subs">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="gioiTinh" className="form-label"><strong>Giới tính</strong></label>
                                            <select id="gioiTinh" className="form-select" name="gioitinh" value={userData.gender} onChange={handleChange}>
                                                <option selected value="Nam">Nam</option>
                                                <option value="Nữ">Nữ</option>
                                                <option value="Khác">Khác</option>
                                            </select>
                                            <small className="form-text text-muted">Giới tính *</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="row_subs">
                                    <div className="col-12" style={{ gridColumn: 'span 2' }}>
                                        <small className="form-text text-muted">Dữ liệu của bạn được lưu trữ theo <a href="#">cam kết bảo mật</a> của chúng tôi.</small>
                                    </div>
                                </div>
                                <div className="row_subs">
                                    <div className="col-md-12 full-width">
                                        <button type="submit" className="btn btn-primary">Lưu lại</button>
                                        <button type="reset" className="btn btn-danger">Hủy bỏ</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div id="2" className={`context ${activeTab === '2' ? 'active' : ''}`}>
                            <div className="pkpListPanel__content">
                                <form onSubmit={handleSubmit2}>
                                    <div className="row_subs">
                                        <div className="mb-3 full-width">
                                            <label htmlFor="email" className="form-label font-width-bold">Email</label>
                                            <input type="email" className="form-control" id="email" name="email" value={userData.email} />
                                        </div>
                                    </div>
                                    <div className="row_subs">
                                        <div className="mb-3 full-width">
                                            <label htmlFor="organization" className="form-label font-width-bold">Đơn vị tổ chức</label>
                                            {/* <textarea className="form-control" id="organization" rows="3" style={{ maxHeight: '120px' }} name="organization" value={userData.organization} onChange={handleChange}></textarea> */}
                                            <Editor value={userData.organization} setContent={(content) => setUserData(prevData => ({ ...prevData, organization: content }))} ></Editor>
                                        </div>
                                    </div>
                                    <div className="row_subs">
                                        <div className="col-12" style={{ gridColumn: 'span 2' }}>
                                            <small className="form-text text-muted">Dữ liệu của bạn được lưu trữ theo <a href="#">cam kết bảo mật</a> của chúng tôi.</small>
                                        </div>
                                    </div>
                                    <div className="row_subs">
                                        <div className="col-md-12 full-width">
                                            <button type="submit"  className="btn btn-primary">Lưu lại</button>
                                            <button type="reset" className="btn btn-danger">Hủy bỏ</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                    </div>

                    <div id="3" className={`context ${activeTab === '3' ? 'active' : ''}`}>
                        <div className="pkpListPanel__content">
                            <form onSubmit={handleSubmit3}>
                                <div className="row_subs">
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
                                    </div>
                                </div>
                                <div className="row_subs">
                                    <div className="mb-3 full-width">
                                        <label htmlFor="researchField" className="form-label font-width-bold">Lĩnh vực nghiên cứu</label>
                                        <input type="text" className="form-control" id="researchField" placeholder="Nhập lĩnh vực nghiên cứu" name="research_field" value={userData.research_field} onChange={handleChange}/>
                                    </div>
                                </div>
                                <div className="row_subs">
                                    <div className="col-12 full-width">
                                        <small className="form-text text-muted">Dữ liệu của bạn được lưu trữ theo <a href="#">cam kết bảo mật</a> của chúng tôi.</small>
                                    </div>
                                </div>
                                <div className="row_subs">
                                    <div className="col-md-12 full-width">
                                        <button type="submit" className="btn btn-primary">Lưu lại</button>
                                        <button type="reset" className="btn btn-danger">Hủy bỏ</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div id="4" className={`context ${activeTab === '4' ? 'active' : ''}`}>
                        <div className="pkpListPanel__content">
                            <form onSubmit={handleSubmit4}>
                                <div className="row_subs_prf">
                                    <div>
                                        <div className="mb-3 ">
                                            <div className='circle-container'> 
                                                
                                                <img   src={imgavt ? imgavt : "https://img6.thuthuatphanmem.vn/uploads/2022/11/18/anh-avatar-don-gian-cho-nu_081757692.jpg"} 
                                                alt="Hỉnh ảnh cá nhân" className="circle" />
                                            </div>
                                            
                                        </div>
                                        
                                    </div>
                                    <div>
                                        <div className="row_subs">
                                            <div className="mb-3 full-width">
                                                <label htmlFor="avatar" className="form-label font-width-bold ">Hình ảnh</label>
                                                <input type="file" className="form-control" onChange={handleFileChange}  />
                                            </div>
                                        </div>
                                        <div className="row_subs">
                                            <div className="mb-3 full-width">
                                                <label htmlFor="homepage_url" className="form-label font-width-bold">Trang chủ URL </label>
                                                <input type="url" className="form-control" id="homepage_url" name="homepage_url" onChange={handleChange}  value={userData.homepage_url} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row_subs">
                                    <div className="mb-3 full-width">
                                        <label htmlFor="phone" className="form-label font-width-bold">Trình bày tiểu sử</label>
                                        <Editor value={userData.bio} setContent={(content) => setUserData(prevData => ({ ...prevData, bio: content }))}></Editor>
                                    </div>
                                </div>

                                <div className="row_subs">
                                    <div className="col-12 full-width">
                                        <small className="form-text text-muted">Dữ liệu của bạn được lưu trữ theo <a href="#">cam kết bảo mật</a> của chúng tôi.</small>
                                    </div>
                                </div>
                                <div className="row_subs">
                                    <div className="col-md-12 full-width">
                                        <button type="submit" className="btn btn-primary">Lưu lại</button>
                                        <button type="reset" className="btn btn-danger">Hủy bỏ</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div id="5" className={`context ${activeTab === '5' ? 'active' : ''}`}>
                        <div className="pkpListPanel__content">
                            <form onSubmit={handleSubmit5}>
                                <div className="row_subs">
                                    <div className="mb-3 full-width ">
                                        <label htmlFor="currentPassword" className="form-label font-width-bold">Mật khẩu hiện tại</label>
                                        <input type="password" className="form-control " id="currentPassword" placeholder="Nhập mật khẩu hiện tại"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="row_subs">
                                    <div className="mb-3 full-width ">
                                        <label htmlFor="newPassword" className="form-label font-width-bold">Mật khẩu mới</label>
                                        <input type="password" className="form-control" id="newPassword" placeholder="Nhập mật khẩu mới" 
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="row_subs">
                                    <div className="mb-3 full-width">
                                        <label htmlFor="confirmPassword" className="form-label font-width-bold">Xác nhận mật khẩu mới</label>
                                        <input type="password" className="form-control" id="confirmPassword" placeholder="Xác nhận mật khẩu mới" 
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="row_subs">
                                    <div className="col-12 full-width">
                                        <small className="form-text text-muted">Dữ liệu của bạn được lưu trữ theo <a href="#">cam kết bảo mật</a> của chúng tôi.</small>
                                    </div>
                                </div>
                                <div className="row_subs">
                                    <div className="col-md-12 full-width">
                                    {error && <div className="text-danger">{error}</div>}
                                    {success && <div className="text-success">{success}</div>}
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


        )}
      </div>



    );
}

export default Profile;
