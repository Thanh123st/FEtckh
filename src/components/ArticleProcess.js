import React, { useState } from "react";

const ArticleProcess = () => {
  const [article] = useState({
    id: "001",
    title: "Tổng quan về AI trong ngành công nghiệp",
    author: "Nguyễn Văn A",
    submissionDate: "2024-11-01",
    status: "Đang xét duyệt",
    process: [
      {
        step: "Nộp bài",
        date: "2024-11-01",
        status: "Hoàn thành",
        note: "Bài viết đã được nộp."
      },
      {
        step: "Xét duyệt",
        date: "2024-11-05",
        status: "Đang xử lý",
        note: "Đang chờ phản hồi từ ban biên tập."
      },
      {
        step: "Phê duyệt",
        date: "2024-11-10",
        status: "Chưa bắt đầu",
        note: "Chưa có đánh giá từ ban biên tập."
      },
      {
        step: "Xuất bản",
        date: "2024-11-20",
        status: "Chưa bắt đầu",
        note: "Chờ phê duyệt từ ban biên tập."
      }
    ],
    latestDraft: {
      fileName: "Ban_thao_AI_nganh_cong_nghiep.docx",
      fileLink: "/uploads/Ban_thao_AI_nganh_cong_nghiep.docx",
      uploadDate: "2024-11-01"
    }
  });

  return (
    <div>
      <h1 className="derav_title">Quá Trình Thực Hiện Bài Viết</h1>
      
      <div className="derav_article-details">
        <h3>Thông Tin Bài Viết</h3>
        <p><strong>ID Bài Viết:</strong> {article.id}</p>
        <p><strong>Tên Bài Viết:</strong> {article.title}</p>
        <p><strong>Tác Giả:</strong> {article.author}</p>
        <p><strong>Ngày Nộp:</strong> {article.submissionDate}</p>
        <p><strong>Trạng Thái:</strong> {article.status}</p>
      </div>

      <div className="derav_process-steps">
        <h3>Các Bước Trong Quá Trình</h3>
        <table className="derav_process-table">
          <thead>
            <tr>
              <th>Bước</th>
              <th>Ngày</th>
              <th>Trạng Thái</th>
              <th>Ghi Chú</th>
            </tr>
          </thead>
          <tbody>
            {article.process.map((step, index) => (
              <tr key={index}>
                <td>{step.step}</td>
                <td>{step.date}</td>
                <td className={`derav_status-${step.status.toLowerCase().replace(" ", "-")}`}>{step.status}</td>
                <td>{step.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArticleProcess;
