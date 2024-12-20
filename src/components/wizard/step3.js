import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import {  useParams} from 'react-router-dom';
import { AuthContext } from '../../Context Status/AuthContext';
import { Contextwizaed } from "../../Context Status/ContextWizard";
import Editor from '../../components/Editor';
const Step3 = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const {postId , setIsStep3Completed}  = useContext(Contextwizaed);
  const { token, apiUrl } = useContext(AuthContext);

  const showPopup = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const {coAuthors,setCoAuthors,title, setTitle , summary, setSummary,keywords, setKeywords,citations, setCitations, setPostId}  = useContext(Contextwizaed);

  const [role, setRole] = useState("Đồng tác giả");


  console.log("posidsafs id nè:",postId);

//Hàm xử lí nhập Email hiện tên 23 -64
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


  // Hàm để lưu đồng tác giả
  const handleAddCoAuthor = (e) => {
    e.preventDefault();
    if (firstName && lastName && email) {
      setCoAuthors([...coAuthors, { name: `${firstName} ${lastName}`, email, role }]);
      closePopup();
      setEmail('');
      setFirstName('');
      setLastName('');
      setRole("Đồng tác giả");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: title,
      abstract: summary,
      keyword: keywords,
      citations: citations,
      coAuthors: coAuthors.map(coAuthor => ({
        name: coAuthor.name,
        email: coAuthor.email,
        role: coAuthor.role,
      })),
    };
    console.log(data);
    try {
      const response = await axios.post(`${apiUrl}/api/wizard/step3/${postId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log("Phản hồi từ máy chủ:", response.data);
      if (response.data.status===200) {
        alert("Thành công bước 3");
        setIsStep3Completed(true);
        
      }
      
      // Xử lý thành công ở đây, ví dụ như hiển thị thông báo thành công
    } catch (error) {
      console.error('Error submitting data:', error);
      // Xử lý lỗi ở đây
    }
  };


const [authors, setAuthors] = useState([]);
  // Hàm để lấy danh sách tác giả từ API
  const fetchAuthors = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/tac-gia/${postId}`, {
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

  
  useEffect(() => {
    fetchAuthors();
  }, [postId]);


  
  const [userData, setUserData] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const getUserData = async () => {
      setLoading(true); // Bắt đầu tải dữ liệu
      try {
          const response = await axios.get(`${apiUrl}/api/user`, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
          setUserData(response.data.data);
          console.log(response.data);
      } catch (error) {
          setError('Lỗi khi lấy dữ liệu: ' + error.message);
          console.error('Lỗi khi lấy dữ liệu:', error);
      } finally {
          setLoading(false); // Kết thúc tải dữ liệu
      }
  };

  useEffect(() => {
      if (token) {
          getUserData();
      }
  }, [postId]);

  const { idbaiviet } = useParams(); 
  if(idbaiviet){
    setPostId(idbaiviet);
  }

  useEffect(() => {
    const getBaiviet= async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/submissions?article_id=${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
          });
          setTitle(response.data[0].data.title);
          setSummary(response.data[0].data.abstract);
          setCitations(response.data[0].data.citations);
      } catch (error) {
          console.error('Lỗi khi lấy dữ liệu:', error);
        }
    };
    const getTukhoa= async () => {
      try {
          const response = await axios.get(`${apiUrl}/api/tukhoa/${postId}`, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
        });

        
        setKeywords(response.data.data[0].keyword);
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
    }
    };

    getBaiviet();
    getTukhoa();
    }, [postId]);





  return (
    <>
      {isPopupVisible && (
        <div className="overlay" id="overlay">
          <form className="popup" onSubmit={handleAddCoAuthor}>
            
            <h2>Thêm đồng tác giả</h2>
            <label htmlFor="firstName" className="form-label"><strong>Email</strong></label>
            <div style={{ width:"100%", display: "inline-block"}}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="Email"
                    placeholder="Email..."
                    value={email}
                    onChange={handleEmailChange}
                  />
                </div>
              </div>
            <label htmlFor="firstName" className="form-label"><strong>Họ và tên</strong></label>
            <div style={{ display:"flex", gap:"10px"}}>
              <div className="w-1/2" style={{ width:"50%", display: "inline-block"}}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Chữ đệm và tên"
                    value={firstName !== null ? firstName : ''}
                    readOnly
                  />
                  <small className="form-text text-muted">Chữ đệm và tên *</small>
                </div>
              </div>

              <div className="w-1/2" style={{ width:"50%" }}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Họ"
                    value={lastName !== null ? lastName : ''}
                    readOnly
                  />
                  <small className="form-text text-muted">Họ *</small>
                </div>
              </div>
            </div>
          
          <label htmlFor="role" className="form-label"><strong>Vai trò</strong></label>
            <div style={{ width:"100%", display: "inline-block"}}>
                <div className="mb-3">
                  <select className="form-control" id="Role" required style={{ appearance:"menulist-button" }}
                  value={role} // Đặt giá trị của select là role
                  onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="Thành viên">Thành viên</option>
                    <option value="Đồng tác giả">Đồng tác giả</option>
                  </select>
                </div>
              </div>


              
            <button type="submit" style={{ backgroundColor:"#0056b3" }}>Lưu lại</button>
            <button onClick={closePopup} style={{ backgroundColor:"#fc3d3d" }}>Đóng</button>
          </form>
        </div>
      )}
      <div className="context active" id="mainBody">
      <form className="pkp_ui_content" onSubmit={handleSubmit}>
        <div className="pkp_input_container">
          <h5>Tiêu đề</h5>
          <Editor value={title} setContent={setTitle}></Editor>
        </div>
        <div className="pkp_input_container">
          <h5>Tóm tắt</h5>
          <p>Phần tóm tắt phải có 250 từ trở xuống.</p>
          <Editor value={summary} setContent={setSummary}></Editor>
        </div>
        <div className="pkp_input_container">
          <h5>Từ khóa</h5>
          <p>Thêm thông tin bổ sung cho bài nộp của bạn. Thêm dấu "/" sau mỗi thuật ngữ.</p>
          <Editor value={keywords} setContent={setKeywords}></Editor>
        </div>
        
      <div className="pkp_input_container">
      <div>
          <div className="header">
            <h4>Danh sách thành viên</h4>

            <a onClick={showPopup} className='Popup_click'>
              Thêm thành viên
            </a>

          </div>
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
              <tr>
                <td>
                  <span>{userData.first_name} {userData.last_name} </span>
                </td>
                <td>
                  <span>{userData.email}</span>
                </td>
                <td>
                  <span>Tác giả</span>
                </td>
              </tr>
            </tbody>
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
                  <span>{author.vai_tro}</span>
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
        </div>
      </div>
      <div className="pkp_input_container">
          <h5>Tài liệu tham khảo</h5>
          <Editor value={citations} setContent={setCitations}></Editor>

      </div>




                
        <div className="section formButtons form_buttons" style={{ display: "flex", textAlign: "center"}}>
          <button className="pkp_button submitFormButton" type="submit">
            <span class="text_submitFormButton">Lưu và tiếp tục</span>
          </button>

          

          <a href="#" className="cancelButton">
            Hủy bỏ
          </a>
        </div>
      </form>
      
      
    </div>
    </>
    
  );
};

export default Step3;
