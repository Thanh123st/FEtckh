import React, { useState, useContext , useEffect } from 'react';
import {  Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context Status/AuthContext';
import { Contextwizaed } from "../../Context Status/ContextWizard";
import Editor from '../../components/Editor';


const Co_auth = (prop) => {
    const { token, apiUrl } = useContext(AuthContext);
    const {postId }  = useContext(Contextwizaed);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('Thành viên'); // Giá trị mặc định

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    // Thêm debounce để giảm số lượng request
    const debounceTimeout = setTimeout(async () => {
        if (email) { // Kiểm tra nếu có giá trị email mới gửi request
            try {
                // Gửi request POST tới API với email
                const response = await axios.post(`${apiUrl}/api/users/email`, {
                    email,
                });

                // Kiểm tra dữ liệu trả về từ server
                if (response.data && response.data.first_name && response.data.last_name) {
                    setFirstName(response.data.first_name);
                    setLastName(response.data.last_name);
                } else {
                    // Nếu không có dữ liệu hợp lệ, đặt lại các ô input về null
                    setFirstName(null);
                    setLastName(null);
                }

            } catch (error) {
                console.error('Error fetching user data:', error);
                // Đặt lại các ô input về null trong trường hợp lỗi
                setFirstName(null);
                setLastName(null);
            }
        } else {
            // Nếu không có email, đặt lại các ô input về null
            setFirstName(null);
            setLastName(null);
        }
    }, 500); // Thời gian debounce là 500ms

    // Dọn dẹp timeout trước đó nếu email thay đổi
    return () => clearTimeout(debounceTimeout);

  }, [email]); // useEffect sẽ chạy khi email thay đổi
  
  
  const [coAuthors, setCoAuthors] = useState([]);

  const [userData, setUserData] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Trạng thái loading
  

  const [authors, setAuthors] = useState([]);
  // Hàm để lấy danh sách tác giả từ API
  
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/tac-gia/${prop.postId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data && response.data.data) {
          setAuthors(response.data.data); // Lưu danh sách tác giả vào state
        }
      } catch (error) {
        console.error('Lỗi khi lấy danh sách tác giả:', error);
      }
    };
    fetchAuthors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Dữ liệu gửi đi
    const coAuthorData = {
      coAuthors: [
        {
          name: `${lastName} ${firstName}`,
          email: email,
          role: role,
        },
      ],
    };

    try {
      const response = await axios.post(`${apiUrl}/api/wizard/updatestep3/${prop.postId}`, coAuthorData, {
        headers: {  
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("Đồng tác giả đã được lưu thành công!");
        console.log("Kết quả trả về:", response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lưu đồng tác giả:", error.response?.data || error.message);
      alert("Không thể lưu đồng tác giả. Vui lòng kiểm tra lại!");
    }
  };

  return (
    <div>
        <table className='pkp_ui_author_table'>
            <colgroup>
              <col style={{ width: '20%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '10%' }} />
            </colgroup>
            <thead>
              
              <tr>
                <th scope="col">Tên</th>
                <th scope="col">E-mail</th>
                <th scope="col">Vai trò</th>
              </tr>
            </thead>
            <tbody>
            {authors.map((author, index) => (
              <tr key={index}>
                <td><span>
                {author.first_name} {author.last_name}
                </span></td>
                <td><span>
                {author.email}
                </span>
                </td>
                <td>
                  <span>{author.role}</span>
                </td>
              </tr>
            ))}
          
            </tbody>
            <tbody>
                {coAuthors.map((coAuthor, index) => (
                  <tr key={index}>
                    <td>
                      <span>{coAuthor.name}</span>
                    </td>
                    <td>
                      <span>{coAuthor.email}</span>
                    </td>
                    <td>
                      <span>{coAuthor.role}</span> {/* Hiển thị vai trò */}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        <form className="pkp_ui_content" onSubmit={handleSubmit}>
          
          <h4>Thêm đồng tác giả</h4>

          <label htmlFor="email" className="form-label">
            <strong>Email</strong>
          </label>
          <div style={{ width: '100%', display: 'inline-block' }}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="Email..."
                value={email}
                onChange={handleEmailChange}
              />
            </div>
          </div>

          <label htmlFor="firstName" className="form-label">
            <strong>Họ và tên</strong>
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div className="w-1/2" style={{ width: '50%', display: 'inline-block' }}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="Chữ đệm và tên"
                  value={firstName}
                  readOnly
                />
                <small className="form-text text-muted">Chữ đệm và tên *</small>
              </div>
            </div>

            <div className="w-1/2" style={{ width: '50%' }}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Họ"
                  value={lastName}
                  readOnly
                />
                <small className="form-text text-muted">Họ *</small>
              </div>
            </div>
          </div>

          <label htmlFor="role" className="form-label">
            <strong>Vai trò</strong>
          </label>
          <div style={{ width: '100%', display: 'inline-block' }}>
            <div className="mb-3">
              <select
                className="form-control"
                id="role"
                required
                style={{ appearance: 'menulist-button' }}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Thành viên">Thành viên</option>
                <option value="Đồng tác giả">Đồng tác giả</option>
              </select>
            </div>
          </div>

          <div className="section formButtons form_buttons" style={{ display: "flex", textAlign: "center"}}>
          <button className="pkp_button submitFormButton" type="submit">
            <span class="text_submitFormButton">Lưu lại</span>
          </button>
          </div>
        </form>
      
    </div>
  );
};

export default Co_auth;
