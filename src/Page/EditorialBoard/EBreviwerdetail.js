import React, { useState, useContext, useEffect } from 'react';
import { Link , useParams} from 'react-router-dom';
import HeaderSub, { SlideBar } from "../../components/HeaderSub";
import axios from 'axios';
import { AuthContext } from '../../Context Status/AuthContext';
const Reviewerdetails = () => {
    const [reviewerInfo, setReviewerInfo] = useState([]);
    const token = localStorage.getItem("token");
    const { apiUrl } = useContext(AuthContext);
    const { idRev } = useParams();
    useEffect(() => {
        const fetchReviewers = async () => {
          try {
    
            const response = await axios.get(`${apiUrl}/api/reviewers?id=${idRev}`, {
              headers: {
                "Authorization": `Bearer ${token}`, 
              },
            });
            setReviewerInfo(response.data.data[0]); 
            console.log("TEST", reviewerInfo);
          } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
          }
        };
        fetchReviewers();
      }, []); 

    const currentReviews = [
        { id: 1, title: 'Bài Viết 1', author: 'Tác Giả 1', date: '2024-12-01' },
        { id: 2, title: 'Bài Viết 2', author: 'Tác Giả 2', date: '2024-12-05' },
    ];

    const pastReviews = [
        { id: 3, title: 'Bài Viết 3', author: 'Tác Giả 3', date: '2024-11-20' },
        { id: 4, title: 'Bài Viết 4', author: 'Tác Giả 4', date: '2024-10-15' },
    ];

    return (
        <div>
            <HeaderSub />
            <div className="pkp_structure_main">
                <SlideBar />
                <div className="rev_container">
                <div className='botf_container'>
                    <h2>Thông Tin Biên Tập Viên</h2>
                    <div className="reviewer-info">
                        <p><strong>Họ tên:</strong> {reviewerInfo.name}</p>
                        <p><strong>Email:</strong> {reviewerInfo.email}</p>
                        <p><strong>Vị trí:</strong> Biên tập viên</p>
                    </div>

                    <h3>Các Bài Viết Đang Phụ Trách Phản Biện</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID Bài Viết</th>
                                <th>Tiêu Đề</th>
                                <th>Tác Giả</th>
                                <th>Ngày Giao</th>
                                <th>Chi Tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentReviews.map((review) => (
                                <tr key={review.id}>
                                    <td>{review.id}</td>
                                    <td>{review.title}</td>
                                    <td>{review.author}</td>
                                    <td>{review.date}</td>
                                    <td>
                                        <Link to={`/editorialboard/views/${review.id}`} className="botf_btn">Xem Chi Tiết</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h3>Các Bài Viết Đã Phản Biện</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID Bài Viết</th>
                                <th>Tiêu Đề</th>
                                <th>Tác Giả</th>
                                <th>Ngày Giao</th>
                                <th>Chi Tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pastReviews.map((review) => (
                                <tr key={review.id}>
                                    <td>{review.id}</td>
                                    <td>{review.title}</td>
                                    <td>{review.author}</td>
                                    <td>{review.date}</td>
                                    <td>
                                        <Link to={`/editorialboard/views/${review.id}`} className="botf_btn">Xem Chi Tiết</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div></div>
            </div>
        </div>
    );
};

export default Reviewerdetails;

