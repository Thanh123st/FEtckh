import React from "react";
import { Link } from 'react-router-dom';
import HeaderSub, {SlideBar} from "../../components/HeaderSub";

import "../../Css/reviewer.css"; // Import CSS tùy chỉnh

const Reviewer = () => {
  const articles = [
    { id: 1, name: 'Ứng dụng AI trong Y học', status: 'Đang phản biện', deadline: '2024-12-15' },
    { id: 2, name: 'Phân tích Dữ liệu Lớn', status: 'Chưa phản hồi', deadline: '2024-12-20' },
  ];

  // Tính toán thống kê
  const stats = {
    inProgress: articles.filter(article => article.status === 'Đang phản biện').length,
    notResponded: articles.filter(article => article.status === 'Chưa phản hồi').length,
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
              <h1 className="rev_heading">Danh sách bài viết được phân công</h1>

              

              {/* Bảng danh sách bài viết */}
              <table className="rev_table">
                <thead>
                  <tr>
                    <th>Tên bài viết</th>
                    <th>Trạng thái</th>
                    <th>Hạn phản hồi</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article) => (
                    <tr key={article.id}>
                      <td>{article.name}</td>
                      <td>{article.status}</td>
                      <td>{article.deadline}</td>
                      <td>
                        <Link to={"/revdetails"} className="rev_button">Xem chi tiết</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>

        </div>

    
  );
};

export default Reviewer;
