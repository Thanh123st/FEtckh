import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import HeaderSub, { SlideBar } from "../../components/HeaderSub";
import { AuthContext } from '../../Context Status/AuthContext';
import axios from 'axios';
import moment from 'moment';
const EBAss = () => {
    const [query1, setQuery1] = useState('');
    const [query2, setQuery2] = useState('');
    const [selectedReviewer, setSelectedReviewer] = useState('');
    const [selectedArticle, setSelectedArticle] = useState('');
    const [showPopover, setShowPopover] = useState(false);
    const [item1, setItem1] = useState(null);
    const [item2, setItem2] = useState(null);
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const { apiUrl } = useContext(AuthContext);
    const token = localStorage.getItem("token");

    const formatDate = (dateString) => {
        const formattedDate = new Date(dateString).toLocaleString('vi-VN', {
            weekday: 'long', // Thứ trong tuần (optional)
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });
        return formattedDate;
    };

    useEffect(() => {
        // Hàm fetch API
        const fetchData1 = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/reviewers`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data.data);
                setData1(response.data.data);
            } catch (err) {
                console.log("error:", err.message);
            }
        };

        const fetchData2 = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/pending-articles`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data.data);
                setData2(response.data.data);
            } catch (err) {
                console.log("error:", err.message);
            }
        };

        fetchData1(); 
        fetchData2(); 
    }, []);

    const assignReviewer = () => {
        if (selectedReviewer && selectedArticle) {
            setShowPopover(true);
            setItem1(data1.find((item) => item.id === parseInt(selectedReviewer)));
            setItem2(data2.find((item) => item.article_id === parseInt(selectedArticle)));
        } else {
            alert("Vui lòng chọn phản biện viên và bài viết.");
        }
    };

    const filterTable1 = (data, query) => {
        if (!Array.isArray(data)) return [];  // Kiểm tra xem data có phải là mảng không
        return data.filter(item => 
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.email.toLowerCase().includes(query.toLowerCase())
        );
    };
    
    const filterTable2 = (data, query) => {
        if (!Array.isArray(data)) return [];  // Kiểm tra xem data có phải là mảng không
        return data.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.created_at.toLowerCase().includes(query.toLowerCase())
        );
    };

    
    const [submissionDate, setSubmissionDate] = useState('');
    const [error, setError] = useState('');
    
    const handleSubmit = async (e) => {
      e.preventDefault();  
      const submissionDate = moment().format('YYYY-MM-DD HH:mm:ss');
      const datapost = {
        article_id: String(item2.article_id), 
        reviewer_id: String(item1.id), 
        submission_date: submissionDate,
      };

      console.log("Dữ liệu gửi đi:", datapost); 
      try {
  
        // Gửi yêu cầu POST với axios
        const response = await axios.post(`${apiUrl}/api/editorial/assign-reviewer`, datapost, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        
        alert(response.data.message);
       
        
      } catch (error) {
        console.error("Error during assignment:", error);
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError('Mất kết nối với server');
        }
      }
    };
  
    useEffect(() => {
      if (submissionDate) {
        handleSubmit({ preventDefault: () => {} }); 
      }
    }, []); 
  
    const handleDateChange = (e) => {
      setSubmissionDate(e.target.value); 
    };

    return (
        <div>
            <style>
                {`
                .hidden {
                    display: none;
                }
                `}
            </style>
            <HeaderSub/>
            <div className="pkp_structure_main">
                <SlideBar />
                <div className="rev_container">
                    <div className="botf_container">

                        {/* Danh sách phản biện viên */}
                        <section className="botf_section">
                            <h2 className="botf_section-title">Danh Sách Phản Biện Viên</h2>
                            <input
                                type="text"
                                value={query1}
                                onChange={(e) => setQuery1(e.target.value)}
                                placeholder="Tìm kiếm trong bảng 1"
                                className="botf_search-input"
                            />
                            <div className="edt_table_wrapper">
                                <table className="botf_table">
                                    <colgroup>
                                        <col style={{ width: '10%' }} />
                                        <col style={{ width: '25%' }} />
                                        <col style={{ width: '30%' }} />
                                        <col style={{ width: '20%' }} />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Họ Tên</th>
                                            <th>Email</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filterTable1(data1, query1).map((row) => (
                                            <tr key={row.id}>
                                                <td>{row.id}</td>
                                                <td>{row.name}</td>
                                                <td>{row.email}</td>
                                                <td className='text-center'>
                                                    <Link to={`/editorialboard/reviwerdetails/${row.id}`} className="botf_btn">Xem Chi Tiết</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Danh sách bài viết cần phân công phản biện */}
                        <section className="botf_section">
                            <h2 className="botf_section-title">Danh Sách Bài Viết Cần Phân Công Phản Biện</h2>
                            <input
                                type="text"
                                value={query2}
                                onChange={(e) => setQuery2(e.target.value)}
                                placeholder="Tìm kiếm trong bảng 2"
                                className="botf_search-input"
                            />
                            <div className="edt_table_wrapper">
                                <table className="botf_table">
                                    <colgroup>
                                        <col style={{ width: '10%' }} />
                                        <col style={{ width: '20%' }} />
                                        <col style={{ width: '15%' }} />
                                        <col style={{ width: '15%' }} />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>ID Bài Viết</th>
                                            <th>Tiêu Đề</th>
                                            <th>Ngày Giao</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filterTable2(data2, query2).map((row) => (
                                            <tr key={row.article_id}>
                                                <td>{row.article_id}</td>
                                                <td dangerouslySetInnerHTML={{ __html: row.title }}></td>
                                                <td>{formatDate(row.created_at)}</td>
                                                <td className='text-center'>
                                                    <Link to={`/editorialboard/views/${row.article_id}`} className="botf_btn">Xem Chi Tiết</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Phân Công Phản Biện */}
                        <section className="botf_section">
                            <h2 className="botf_section-title">Phân Công Phản Biện</h2>
                            <div className="botf_assignment-container">
                                <div className="botf_assignment-selects">
                                    <select
                                        value={selectedReviewer}
                                        onChange={(e) => setSelectedReviewer(e.target.value)}
                                        className="botf_select"
                                    >
                                        <option value="">Chọn Phản Biện Viên</option>
                                        {filterTable1(data1, query1).map((row) => (
                                            <option key={row.id} value={row.id}>
                                                {row.name}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        value={selectedArticle}
                                        onChange={(e) => setSelectedArticle(e.target.value)}
                                        className="botf_select"
                                    >
                                        <option value="">Chọn Bài Viết</option>
                                        {filterTable2(data2, query2).map((row) => (
                                            <option key={row.id} value={row.article_id}>
                                                {row.title && row.title.replace(/<\/?[^>]+(>|$)/g, "")}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {showPopover && (
                                    <div className="botf_popover-content">
                                        <div className="boftz_container">
                                            {item1 && (
                                                <div className="boftz_info">
                                                    <h3>Thông tin phản biện viên:</h3>
                                                    <p>Id phản biện viên: {item1.id}</p>
                                                    <p>Họ tên: {item1.name}</p>
                                                    <p>Email: {item1.email}</p>
                                                </div>
                                            )}

                                            {item2 && (
                                                <div className="boftz_info">
                                                    <h3>Thông tin bài viết:</h3>
                                                    <p>Id bài viết: {item2.article_id}</p>
                                                    <p style={{ display: 'inline-block', whiteSpace: 'nowrap', fontSize: '1rem' }}>
                                                    Tiêu đề: <span style={{ fontWeight: 'normal' }}>
                                                        {item2.title.replace(/<\/?[^>]+(>|$)/g, "")}
                                                    </span>
                                                    </p>
                                                    <p>Tác giả: {formatDate(item2.created_at)}</p>
                                                </div>
                                            )}
                                            <label>
                                            Hạn phản biện:
                                            <input
                                                type="datetime-local"
                                                value={submissionDate}
                                                onChange={handleDateChange}
                                            />
                                            </label>
                                            {error && <p style={{ color: 'red' }}>{error}</p>}
                                        </div>
                                    </div>
                                )}

                                {showPopover && (
                                    <button className="botf_btn-assign" onClick={handleSubmit}>
                                        Xác nhận
                                    </button>
                                )}

                                <button className="botf_btn-assign" onClick={assignReviewer}>
                                    Phân Công
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EBAss;
