import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Fooster from './Fooster';
import Banner from './Banner';
import { AuthContext } from '../AuthContext';


const Submission = () => {
  const { isLoggedIn, email } = useContext(AuthContext);
  return (
    <div>
    <Banner/>
    <div className="layout-shared">
      <nav className="cmp-breadcrumb">
        <ol className="breadcrumb">
          <li>
            <Link to="/">Trang chủ</Link>
          </li>
          <li>
            Gửi bài mới
          </li>                    
        </ol>
      </nav>
      {!isLoggedIn ? (
        <div className="alert alert-info" id="loggedout">
        <Link to="/Login">Đăng nhập</Link> hoặc <Link to="/Register">Đăng kí</Link> để gửi.
      </div>
      ):(      <div className="alert alert-info" id="loggedin">
        <Link to="/Subs">Gửi bài</Link> hoặc <a href="">xem các bài viết của bạn.</a> đã gửi.
      </div>)}


      <div className="Content">
        <header className="Content-header">
          <h2>Danh sách yêu cầu gửi bài</h2>
        </header>
        <article className="Content-main">
          <p>Là một phần của quá trình gửi, các tác giả được yêu cầu kiểm tra việc tuân thủ tất cả các mục sau của bài nộp của họ và các bài nộp có thể được trả lại cho những tác giả không tuân thủ các nguyên tắc này.</p>
          <div className="Content-text">
            <ul className="list-group">
              <li className="list-group-item">
                <span><i className="fa-solid fa-circle-check"></i></span>
                <span className="item-content"><strong>Định dạng tài liệu:</strong> Bài viết phải được gửi dưới dạng tệp Microsoft Word (.docx) hoặc PDF (.pdf). Sử dụng font Times New Roman, cỡ chữ 12, khoảng cách dòng 1.5. Tiêu đề bài viết ngắn gọn, súc tích, không quá 15 từ.</span>
              </li>
              <li className="list-group-item">
                <span><i className="fa-solid fa-circle-check"></i></span>
                <span className="item-content"><strong>Tính nguyên bản:</strong> Bài viết chưa được xuất bản hoặc đang xem xét ở tạp chí khác. Bài viết phải là nghiên cứu mới, không vi phạm bản quyền.</span>
              </li>
              <li className="list-group-item">
                <span><i className="fa-solid fa-circle-check"></i></span>
                <span className="item-content"><strong>Tóm tắt và từ khóa:</strong> Bài viết phải có tóm tắt (150-250 từ) mô tả nội dung chính và kết luận. Cung cấp 3-5 từ khóa liên quan đến nội dung nghiên cứu.</span>
              </li>
              <li className="list-group-item">
                <span><i className="fa-solid fa-circle-check"></i></span>
                <span className="item-content"><strong>Hệ thống tham chiếu:</strong> Trích dẫn và tài liệu tham khảo phải tuân thủ theo quy định trích dẫn của tạp chí (APA, MLA, hoặc Chicago). Danh mục tài liệu tham khảo phải đầy đủ và chính xác.</span>
              </li>
              <li className="list-group-item">
                <span><i className="fa-solid fa-circle-check"></i></span>
                <span className="item-content"><strong>Thông tin tác giả:</strong> Bao gồm tên, cơ quan công tác, địa chỉ email của tất cả các tác giả. Tác giả chính chịu trách nhiệm liên hệ và đảm bảo tính chính xác của thông tin.</span>
              </li>
              <li className="list-group-item">
                <span><i className="fa-solid fa-circle-check"></i></span>
                <span className="item-content"><strong>Đạo đức nghiên cứu:</strong> Nếu liên quan đến nghiên cứu con người, phải có chấp thuận từ Hội đồng Đạo đức nghiên cứu hoặc tài liệu tương đương.</span>
              </li>
              <li className="list-group-item">
                <span><i className="fa-solid fa-circle-check"></i></span>
                <span className="item-content"><strong>Phí xuất bản:</strong> Không yêu cầu phí gửi bài, nhưng tác giả phải tuân thủ quy định xuất bản mở và cung cấp tài liệu liên quan nếu cần.</span>
              </li>
            </ul>                            
          </div>
        </article>

        <header className="Content-header">
          <h2>Thể lệ gửi bài</h2>
        </header>
        <article className="Content-main">
          <div className="Content-text">
            <ol>
              <li>
                Tác giả bài báo chịu trách nhiệm trước pháp luật về chất lượng, nội dung, và tính hợp pháp của bài báo. Tác giả cam kết bài báo không có xung đột về lợi ích với các cá nhân, đơn vị, hoặc tổ chức xã hội.
              </li>
              <li>
                Tác giả phải tuân thủ quy định về đăng bài trên Tạp chí, bao gồm việc chỉnh sửa, bổ sung và hoàn thiện bài báo theo yêu cầu của người phản biện và Hội đồng biên tập. Tác giả không được gửi bản thảo bài báo đang gửi cho Tạp chí Khoa học Trường Đại học Kỹ thuật – Công nghệ Cần Thơ đến tạp chí khác khi chưa có quyết định cuối cùng của Tổng biên tập.
              </li>
              <li>
                Tác giả phải trích dẫn rõ ràng và đầy đủ những ý tưởng, kết quả nghiên cứu liên quan đã được công bố và phải chịu trách nhiệm về kết quả nghiên cứu trùng lặp với các công bố khoa học khác.
              </li>
              <li>
                Tác giả có quyền rút lại bản thảo bài báo hoặc điều chỉnh, bổ sung thông tin của bài báo trong vòng 07 ngày kể từ khi gửi bài đến Tạp chí.
              </li>
              <li>
                Tác giả nộp lệ phí đăng bài theo quy định của Trường Đại học Kỹ thuật – Công nghệ Cần Thơ (nếu có).
              </li>
            </ol>
            <p><strong><Link to="/Auth-Guidelines">Hướng dẫn tác giả.</Link></strong></p> 
            <p><strong><Link to="/Rev-Guidelines">Hướng dẫn phản biện.</Link></strong></p>                       
          </div>
        </article>
      </div>
    </div>
    <Fooster/>
  </div>

  );
};

export default Submission;
