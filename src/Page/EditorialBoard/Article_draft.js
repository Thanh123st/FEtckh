import React, { useState, useRef, useContext, useEffect } from 'react';
import Editor from '../../components/Editor';
import { Link, useParams } from 'react-router-dom';
import HeaderSub, {SlideBar} from "../../components/HeaderSub";
import "../../Css/reviewer.css"; // Import CSS tùy chỉnh
import { AuthContext } from '../../Context Status/AuthContext';
import axios from 'axios';
const ArticleDraft = () => {
    const { apiUrl } = useContext(AuthContext);
    const token = localStorage.getItem("token");
    const [ article, setArticle] = useState([]);
    const [ files , setFiles] = useState([]);
    const { articleId } = useParams();

    useEffect(() => {
        const fetcharticle = async () => {
          try {
    
            const response = await axios.get(`${apiUrl}/api/submissions?article_id=${articleId}`, {
              headers: {
                "Authorization": `Bearer ${token}`, 
              },
            });
            setArticle(response.data[0].data); 
            console.log("TESTbaiviet",article);
          } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
          }
        };

        const fetchfiles = async () => {
            try {
      
              const response = await axios.get(`${apiUrl}/api/user/article/files?article_id=${articleId}`, {
                headers: {
                  "Authorization": `Bearer ${token}`, 
                },
              });
              setFiles(response.data.data[0]); 
              console.log("TESTfilefile",files);
            } catch (error) {
              console.error("Lỗi khi lấy dữ liệu:", error);
            }
          };
          fetcharticle();
          fetchfiles();
      }, []); 

 



    const [showIframe, setShowIframe] = useState(false);

    const toggleIframe = () => {
    setShowIframe((prev) => !prev);
    };
  return (
    <div>
        <style>
            {`
            .hidden {
                display: none;
            }
            p{
                margin:5px;
            }
            `}
        </style>
        <HeaderSub/>
        <div className="pkp_structure_main">
            <SlideBar></SlideBar>
            <div className="edt_container">
            <div className="derav_draft-details">
            <h1>Chi Tiết Bản Thảo</h1>

            {/* Thông tin bài viết */}
            <div className="derav_article-info">
                <h3>Thông Tin Bài Viết</h3>
                <p><strong>ID Bài Viết:</strong> {article.article_id}</p>
                <p style={{ display: 'flex', alignItems: 'center', fontSize: '1rem' }}>
                <strong style={{ marginRight: '5px' }}>Tên Bài Viết:</strong> 
                <span dangerouslySetInnerHTML={{ __html: article.title }} style={{ fontWeight: 'normal' }}></span>
                </p>
            </div>

            {/* Thông tin bản thảo */}
            <div className="derav_draft-info">
                <h3>Bản Thảo Mới Nhất</h3>
                <p><strong>Tên File:</strong> {files.file_name}</p>
                <div className="derav_draft-actions">
                <a 
                    href={`http://192.168.10.200:8000/api/file/${files.file_id}/download`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="derav_btn-download"
                >
                    Tải File
                </a><br></br>
                <button onClick={toggleIframe} className="derav_btn-toggle-iframe">
                    {showIframe ? "Ẩn Xem Trước" : "Hiện Xem Trước"}
                </button>
                </div>
            </div>

            {/* Khung iframe xem trước */}
            {showIframe && (
                <div className="derav_draft-preview">
                <iframe 
                    src={`http://192.168.10.200:8000/api/file/${files.file_id}`}
                    title="Xem Trước Bản Thảo" 
                    width="100%" 
                    height="500px"
                    style={{ border: "1px solid #ccc" }}
                />
                </div>
            )}
            </div>
            </div>
        </div>

        </div>
    
  );
};

export default ArticleDraft;