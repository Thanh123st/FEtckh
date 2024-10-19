import React from 'react';
import { Link } from 'react-router-dom';

const Step5 = () => {
  return (
    <div id="step5" className="context active">
      <form className="pkp_ui_content">
        <h5>Hoàn thành việc gửi bài</h5>
        <p>
          Cảm ơn bạn đã nộp bài vào Tạp chí Khoa học Đại học Kỹ thuật - Công nghệ Cần Thơ.
        </p>

        <span></span>

        <p>
          Ban biên tập đã nhận được thông báo về bài nộp của bạn và bạn cũng đã được gửi
          email xác nhận cho bài nộp của mình. Khi ban biên tập xem xét nội dung bài
          nộp, họ sẽ liên hệ với bạn sau.
        </p>

        <ul>
          <Link to="/DetailArticle"><li><a href="">Xem lại bài nộp</a></li></Link>
          <Link to="/Wizard"><li><a href="">Gửi bài mới</a></li></Link>
          <Link to="/Subs"><li><a href="">Quay lại</a></li></Link>
        </ul>
      </form>
    </div>
  );
};

export default Step5;
