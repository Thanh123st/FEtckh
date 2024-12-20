import React, { useState, useRef, useEffect, useContext } from 'react';
import Editor from '../../components/Editor';
import { Link } from 'react-router-dom';
import HeaderSub, {SlideBar} from "../../components/HeaderSub";
import { AuthContext } from '../../Context Status/AuthContext';
import axios from 'axios';
import moment from 'moment';

const Boft = () => {
    const {  apiUrl } = useContext(AuthContext);
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(true);
    const [mess,setMess] = useState("");
    useEffect(() => {
        // Hàm fetch API
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/committee/review-articles`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data.data);
                setNewarticles(response.data.data);
            } catch (err) {
                console.log("error:", err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData(); 
    }, [token,mess]);
    
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

    
    const [newarticles, setNewarticles] = useState([]);

   
    const handlePostRequest = async (articleId, decision, comment = "") => {
        const data = { decision, comment };
        try {
            const response = await axios.post(`${apiUrl}/api/committee/review/${articleId}`, data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`  // Thêm token vào header Authorization
                    }
                }
            );
            setMess(response.data.message);
            console.log('Response:', response.data);
            alert(response.data.message);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
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
            <SlideBar></SlideBar>
            <div className="rev_container">
            <div className="botf_container">

                <section className="edt_section">
                    <h2>Bài Viết Mới Cần Xác Nhận</h2>
                    <table className="edt_table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên Bài Viết</th>
                                <th>Ngày nộp</th>
                                <th>Chức Năng</th>
                                <th>Xem chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {newarticles.map(article => (
                                <tr key={article.article_id}>
                                    <td>{article.article_id}</td>
                                    <td dangerouslySetInnerHTML={{ __html: article.title }}></td>
                                    <td>{formatDate(article.created_at)}</td>
                                    <td>
                                        <button className="edt_btn edt_btn-accept" onClick={() => handlePostRequest(article.article_id, 'Send_to_editor', 'right')}>Chấp nhận</button>
                                        <button className="edt_btn edt_btn-reject"  onClick={() => handlePostRequest(article.article_id, 'Rejected', 'right')}>Từ chối</button>
                                    </td>
                                    <td>
                                        <Link to={`/boardoftrustees/view/${article.article_id}`}><button className="edt_btn edt_btn-deatils">Thông tin</button></Link>                                
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
                

                
                </div>
            </div>
        </div>

        </div>
    
  );
};

export default Boft;
