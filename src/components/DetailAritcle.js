import React, { useState, useRef, useContext, useEffect} from 'react';
import { AuthContext } from '../Context Status/AuthContext';
import axios from 'axios';

const ArticleDetail = ({ articleid }) => {
  const token = localStorage.getItem("token");
  const { apiUrl } = useContext(AuthContext);
  const [articledata, setArticledata] = useState([]);
  const [authordata, setAuthordata] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchDataArticle = async () => {
      try {

        const response = await axios.get(`${apiUrl}/api/submissions?article_id=${articleid}`, {
          headers: {
            "Authorization": `Bearer ${token}`, 
          },
        });
        setArticledata(response.data[0].data); 
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    const fetchDataAuthor = async () => {
      try {

        const response = await axios.get(`${apiUrl}/api/tac-gia/${articleid}`, {
          headers: {
            "Authorization": `Bearer ${token}`, // Thêm token vào header
          },
        });
        setAuthordata(response.data.data);

      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    const fetchDataKeywords = async () => {
      try {

        const response = await axios.get(`${apiUrl}/api/tukhoa/${articleid}`, {
          headers: {
            "Authorization": `Bearer ${token}`, // Thêm token vào header
          },
        });
        setKeywords(response.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    const fetchDataFile = async () => {
      try {

        const response = await axios.get(`${apiUrl}/api/user/article/files?article_id=${articleid}`, {
          headers: {
            "Authorization": `Bearer ${token}`, // Thêm token vào header
          },
        });
        setFiles(response.data.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchDataArticle(); 
    fetchDataAuthor();
    fetchDataKeywords();
    fetchDataFile();
  }, []); 
  console.log("Dữ liệu cần thiết để copy paste vào",files);

  const article = {
    idbaiviet: articledata.article_id,
    title: articledata.title,
    abstract: articledata.abstract,
    status: articledata.status,
    volume: articledata.volume,
    citations: articledata.citations,
    categoryId: articledata.category_id,
    
  };

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

  return (
    <div>
      <h3 className="edt_heading text-center">Thông Tin Bài Viết</h3>
      <div className="derav_custom-info">
        <div>
            <span className="derav_label">ID bài viết:</span>
            <span className="derav_value">{article.idbaiviet}</span>
        </div>
        <div>
            <span className="derav_label">Trạng thái:</span>
            <span className="derav_value">{article.status}</span>
        </div>
        </div>
      <div className="edt_article-details">
      <div className="edt_section">
        <table className="edt_table">
          <tbody>
            <tr>
              <th className="edt_table-header">Tên Bài Viết</th>
              <td className="edt_table-data" dangerouslySetInnerHTML={{ __html: article.title }}></td>
            </tr>
            <tr>
              <th className="edt_table-header">Tóm Tắt</th>
              <td className="edt_table-data" dangerouslySetInnerHTML={{ __html: article.abstract }}></td>
            </tr>
            <tr>
              <th className="edt_table-header">Số Tạp Chí</th>
              <td className="edt_table-data">{article.volume}</td>
            </tr>
            <tr>
              <th className="edt_table-header">Trích Dẫn</th>
              <td className="edt_table-data" dangerouslySetInnerHTML={{ __html: article.citations }}></td>
            </tr>
            <tr>
              <th className="edt_table-header">Danh Mục</th>
              <td className="edt_table-data">{article.categoryId}</td>
            </tr>
          </tbody>
        </table>
        </div>
        {/* Bảng Từ Khóa */}
        {article.keywords && article.keywords.length > 0 && (
          <div className="edt_section">
            <h3>Từ khóa</h3>
            <table className="edt_keywords_table">
              <thead>
                <tr>
                  <th>Từ khóa</th>
                </tr>
              </thead>
              <tbody>
                {keywords.map((keyword) => (
                  <tr key={keyword.keyword_id}>
                    <td dangerouslySetInnerHTML={{ __html: keyword.keyword }}></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Bảng Danh Sách Tác Giả */}
        
          <div className="edt_section">
            <h3>Danh sách tác giả</h3>
            <table className="edt_table">
              <thead>
                <tr>
                  <th>Tên tác giả</th>
                  <th>Email</th>
                  <th>Vai trò</th>
                </tr>
              </thead>
              <tbody>
              {Array.isArray(authordata) && authordata.length > 0 ? (
                authordata.map((author, index) => (
                  <tr key={author.email || index}> {/* Nếu không có email, dùng index */}
                    <td>{author.first_name} {author.last_name}</td>
                    <td>{author.email}</td>
                    <td>{author.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">Không có dữ liệu tác giả.</td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        
        
          <div className="edt_section">
            <h3>File Bài Viết</h3>
            
              <table className="edt_table">
                <thead>
                  <tr>
                    <th>ID File</th>
                    <th>Tên File</th>
                    <th>Ngày Up File</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file) => (
                    <tr key={file.file_id}>
                      <td>{file.file_id}</td>
                      <td><a href={`${apiUrl}/${file.file_path}`} download={file.file_name} target="_blank" rel="noopener noreferrer">{file.file_name}</a></td>
                      <td>{formatDate(file.updated_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            
          </div>
        

      </div>
    </div>
  );
};



export default ArticleDetail;

