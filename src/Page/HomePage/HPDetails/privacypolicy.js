import React from 'react';
import Banner from "../../../components/Banner";
import Fooster from '../../../components/Fooster';
const PrivacyPolicy = () => {
  return (
    <>
        <Banner/>
        
        <div className="privacy-policy">
      <style jsx>{`
        .privacy-policy {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        h2 {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 20px;
        }
        h4 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 16px 0 8px;
        }
        p {
          margin-bottom: 16px;
        }
        ul {
          list-style-type: disc;
          margin-left: 20px;
          margin-bottom: 16px;
        }
        strong {
          font-weight: bold;
        }
      `}</style>
      
      <h2>Cam Kết Bảo Mật</h2>

      <h4>1. Mục đích thu thập thông tin cá nhân</h4>
      <p>
        Chúng tôi cam kết bảo vệ quyền riêng tư của người dùng. Thông tin cá nhân của bạn được thu thập nhằm mục đích:
      </p>
      <ul>
        <li>Cung cấp dịch vụ xuất bản và xem xét bài báo.</li>
        <li>Xác minh danh tính và liên lạc với người dùng.</li>
        <li>Cải thiện trải nghiệm người dùng và tối ưu hóa các dịch vụ của chúng tôi.</li>
      </ul>

      <h4>2. Phạm vi thu thập thông tin</h4>
      <p>
        Chúng tôi chỉ thu thập các thông tin cần thiết để cung cấp dịch vụ, bao gồm:
      </p>
      <ul>
        <li>Họ và tên, địa chỉ email, và thông tin liên lạc.</li>
        <li>Lịch sử truy cập và các thông tin liên quan đến hoạt động của bạn trên trang web.</li>
        <li>Thông tin về các bài viết mà bạn gửi đến tạp chí, bao gồm tiêu đề, nội dung và các tác giả liên quan.</li>
      </ul>

      <h4>3. Sử dụng thông tin cá nhân</h4>
      <p>
        Thông tin cá nhân thu thập được sẽ chỉ được sử dụng trong phạm vi:
      </p>
      <ul>
        <li>Cải tiến dịch vụ và cung cấp hỗ trợ người dùng.</li>
        <li>Quản lý quá trình đăng ký và xuất bản bài báo.</li>
        <li>Thông báo về các bản tin, sự kiện, hoặc các cập nhật liên quan đến tạp chí (với sự cho phép của bạn).</li>
      </ul>

      <h4>4. Chia sẻ thông tin cá nhân</h4>
      <p>
        Chúng tôi cam kết không chia sẻ thông tin cá nhân của bạn với bên thứ ba ngoại trừ các trường hợp sau:
      </p>
      <ul>
        <li><strong>Khi có yêu cầu từ cơ quan chức năng</strong> theo quy định của pháp luật.</li>
        <li><strong>Đối tác được ủy quyền</strong> tham gia vào quy trình xử lý, xét duyệt và xuất bản bài báo.</li>
      </ul>

      <h4>5. Bảo vệ thông tin cá nhân</h4>
      <p>
        Chúng tôi áp dụng các biện pháp an ninh phù hợp để bảo vệ thông tin cá nhân của bạn khỏi truy cập trái phép, mất mát, hoặc hư hỏng. Các biện pháp bao gồm:
      </p>
      <ul>
        <li>Sử dụng mã hóa <strong>SSL</strong> cho các kết nối mạng.</li>
        <li>Hạn chế quyền truy cập vào dữ liệu cá nhân.</li>
        <li>Cập nhật và kiểm tra hệ thống thường xuyên để ngăn chặn các cuộc tấn công.</li>
      </ul>

      <h4>6. Quyền lợi của người dùng đối với thông tin cá nhân</h4>
      <p>
        Bạn có quyền:
      </p>
      <ul>
        <li><strong>Yêu cầu xem, chỉnh sửa, hoặc xóa</strong> thông tin cá nhân của mình.</li>
        <li>Từ chối nhận các thông tin quảng cáo hoặc cập nhật không cần thiết.</li>
        <li><strong>Đưa ra các khiếu nại</strong> liên quan đến việc xử lý thông tin cá nhân của bạn.</li>
      </ul>

      <h4>7. Liên hệ</h4>
      <p>
        Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào về cam kết bảo mật của chúng tôi, vui lòng liên hệ:
      </p>
      <ul>
        <li><strong>Email:</strong> tapchikhoahoc@ctuet.edu.vn</li>
        <li><strong>Địa chỉ:</strong> Trường Đại học Kỹ thuật - Công nghệ Cần Thơ, 256 Nguyễn Văn Cừ, TP. Cần Thơ</li>
      </ul>
    </div>
        <Fooster/>
    </>

  );
};

export default PrivacyPolicy;