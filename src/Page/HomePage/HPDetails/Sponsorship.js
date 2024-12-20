// Sponsorship.js
import React from 'react';
import Fooster from '../../../components/Fooster';
import Banner from '../../../components/Banner';
function Sponsorship() {
  return (
    <div>
    <Banner/>
    <div class="layout-shared">
        <div class="Content">
            <header class="Content-header">
                <h2>Tài trợ tạp chí</h2>
            </header>
            <article class="Content-main">
                <div class="Content-text">
                    <p><strong>Tài trợ và Chính sách Phí:</strong></p>
                    <p>Tạp chí Khoa học Đại học Kỹ thuật Công nghệ Cần Thơ được tài trợ bởi Trường Đại học Kỹ thuật – Công nghệ Cần Thơ. Chính sách của Tạp chí là không tính phí nộp bài và phí xuất bản. Chúng tôi cam kết cung cấp quyền truy cập mở ngay lập tức vào nội dung của tạp chí theo nguyên tắc cung cấp nghiên cứu miễn phí cho công chúng, nhằm hỗ trợ việc trao đổi kiến thức toàn cầu.</p>

                    <p><strong>Cung cấp Bản in:</strong></p>
                    <p>Mỗi tác giả và đồng tác giả sẽ nhận được một bản in miễn phí của tạp chí có bài viết được đăng, giao trực tiếp tại Tòa soạn hoặc qua đường bưu điện. Tác giả có thể đặt mua thêm bản in của tạp chí sau khi thanh toán trước phí token và phí bưu điện.</p>
                </div>
            </article>
        </div>
    </div>
    <Fooster/>
  </div>

  );
}

export default Sponsorship;
