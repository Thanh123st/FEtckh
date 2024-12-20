import React, { useState, useRef, useContext, useEffect } from 'react';
import Editor from '../../components/Editor';
import { Link } from 'react-router-dom';
import HeaderSub, {SlideBar} from "../../components/HeaderSub";
import "../../Css/reviewer.css"; // Import CSS tùy chỉnh
import { AuthContext } from '../../Context Status/AuthContext';
import axios from 'axios';
const RedactEB = () => {
    const { apiUrl } = useContext(AuthContext);
    const [ articleUnRev, setArticleUnRev] = useState([]);
    const [ articleste, setArticleste] = useState([]);
    const [approved , setApproved ] = useState([]);
    const token = localStorage.getItem("token");

    const articletestUnRev = [
        {
          article_id: 1,
          title: 'Ứng dụng trí tuệ nhân tạo trong phân tích dữ liệu',
          status: 'Chưa duyệt'
        },
        {
          article_id: 2,
          title: 'Phát triển phần mềm cho hệ thống quản lý bệnh viện',
          status: 'Chưa duyệt'
        }
      ];
      
      const articletestste = [
        {
          article_id: 3,
          title: 'Nghiên cứu về tác động của biến đổi khí hậu đối với nông nghiệp',
          status: 'Chưa duyệt'
        },
        {
          article_id: 4,
          title: 'Tương lai của công nghệ blockchain trong tài chính',
          status: 'Chưa duyệt'
        }
      ];

      const articletestapproved = [
        {
          article_id: 5,
          title: 'Các xu hướng mới trong công nghệ điện toán đám mây',
          status: 'Chưa duyệt'
        }
      ];

    useEffect(() => {
        const fetcharticleUnRev = async () => {
          try {
    
            const response = await axios.get(`${apiUrl}/api/getfull-article?status=Pending_review`, {
              headers: {
                "Authorization": `Bearer ${token}`, 
              },
            });
            setArticleUnRev(response.data.data); 
          } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
          }
        };

        const fetcharticleste = async () => {
            try {
      
              const response = await axios.get(`${apiUrl}/api/getfull-article?status=Send_to_editor`, {
                headers: {
                  "Authorization": `Bearer ${token}`, 
                },
              });
              setArticleste(response.data.data); 
            } catch (error) {
              console.error("Lỗi khi lấy dữ liệu:", error);
            }
          };
          const fetcharticleapproved = async () => {
            try {
      
              const response = await axios.get(`${apiUrl}/api/getfull-article?status=Send_to_editor`, {
                headers: {
                  "Authorization": `Bearer ${token}`, 
                },
              });
              setApproved(response.data.data); 
            } catch (error) {
              console.error("Lỗi khi lấy dữ liệu:", error);
            }
          };
        
    
        fetcharticleUnRev();
        fetcharticleste();
        fetcharticleapproved();
      }, []); 
    
    
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
            <div className="edt_container">

            {/* Danh sách bài viết đang phản biện */}
            <section className="edt_section">
                <h2>Bài Viết Đang Phản Biện</h2>
                <table className="edt_table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên Bài Viết</th>
                            <th>Trạng thái</th>
                            <th>Xem chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* articleUnRev */}
                    {/* articletestUnRev */}
                    {articletestUnRev && articletestUnRev.length > 0 ? (
                        articletestUnRev.map(article => (
                            <tr key={article.article_id}>
                                <td>{article.article_id}</td>
                                <td dangerouslySetInnerHTML={{ __html: article.title }}></td>
                                <td>
                                    {article.status}
                                </td>
                                <td>
                                    <Link to={`/editorialboard/views/${article.article_id}`}><button className="edt_btn edt_btn-deatils">Thông tin</button></Link>
                                    <Link to={`/editorialboard/process/${article.article_id}`} ><button className="edt_btn edt_btn-deatils">Quá trình</button></Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">Không có bài viết nào.</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </section>

            <section className="edt_section">
                <h2>Bài Viết Đang Phản Biện Cần Xác Nhận Bản Thảo</h2>
                <table className="edt_table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên Bài Viết</th>
                            <th>Bản thảo</th>
                            <th>Xem chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* articleste */}
                    {/* articletestste */}
                    {articletestste && articletestste.length > 0 ? (
                        articletestste.map(article => (
                            <tr key={article.article_id}>
                                <td>{article.article_id}</td>
                                <td dangerouslySetInnerHTML={{ __html: article.title }}></td>
                                <td>
                                    <button className="edt_btn edt_btn-accept" >Chấp nhận</button>
                                    <button className="edt_btn edt_btn-reject">Từ chối</button>
                                </td>
                                <td>
                                    <Link to={`/editorialboard/articledraft/${article.article_id}`}>
                                        <button className="edt_btn edt_btn-deatils">Chi tiết bản thảo</button>
                                    </Link>
                                    <Link to={`/editorialboard/views/${article.article_id}`}><button className="edt_btn edt_btn-deatils">Thông tin</button></Link>
                                    <Link  to={`/editorialboard/process/${article.article_id}`}  ><button className="edt_btn edt_btn-deatils">Quá trình</button></Link>
                                </td>
                            </tr>))
                        ) : (
                        <tr>
                            <td colSpan="5">Không có bài viết nào.</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </section>

            {/* Danh sách bài viết đã được chấp thuận */}
            <section className="edt_section">
                <h2>Bài Viết Phản Biện Viên Đã Chấp Thuận</h2>
                <table className="edt_table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên Bài Viết</th>
                            <th>Chức Năng</th>
                            <th>Xem chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* approved */}
                        {/* articletestapproved */}
                        {articletestapproved && articletestapproved.length > 0 ? (
                            articletestapproved.map(article => (
                            <tr key={article.article_id}>
                                <td>{article.article_id}</td>
                                <td dangerouslySetInnerHTML={{ __html: article.title }}></td>
                                <td>
                                    <button className="edt_btn edt_btn-finalize">Hoàn tất</button>
                                    <button className="edt_btn edt_btn-reject">Phản biện tiếp tục</button>
                                </td>
                                <td>
                                    <Link to={`/editorialboard/views/${article.article_id}`}><button className="edt_btn edt_btn-deatils">Thông tin</button></Link>
                                    <Link  to={`/editorialboard/process/${article.article_id}`} ><button className="edt_btn edt_btn-deatils">Quá trình</button></Link>
                                </td>
                            </tr>
                        ))) : (
                            <tr>
                                <td colSpan="5">Không có bài viết nào.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </div>
        </div>

        </div>
    
  );
};

export default RedactEB;
