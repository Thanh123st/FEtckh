// EditEthics.js
import React from 'react';
import Fooster from '../../../components/Fooster';
import Banner from '../../../components/Banner';
function EditEthics() {
  return (
    <div>
    <Banner/>
    <div className="layout-shared">
      <div className="Content">
        <header className="Content-header">
          <h2>Biên tập và đạo đức xuất bản</h2>
        </header>
        <article className="Content-main">
          <div className="Content-text">
            <p><strong>Biên tập</strong></p>
            <p>
              Chúng tôi cam kết duy trì tiêu chuẩn cao nhất trong biên tập và đánh giá các bài báo. Các bài báo được gửi đến Tạp chí Khoa học Đại học Kỹ thuật Công nghệ Cần Thơ sẽ được đánh giá bởi các nhà nghiên cứu và chuyên gia hàng đầu trong lĩnh vực tương ứng. Quá trình đánh giá sẽ bao gồm:
            </p>
            <ul>
              <li>Đánh giá sơ bộ để xác định tính phù hợp và chất lượng cơ bản của bài báo.</li>
              <li>Đánh giá chuyên sâu bởi ít nhất hai phản biện độc lập và có uy tín trong lĩnh vực.</li>
              <li>Đánh giá và quyết định cuối cùng của Hội đồng Biên tập dựa trên các phản biện và khuyến nghị.</li>
            </ul>

            <p><strong>Đạo đức Xuất bản</strong></p>
            <p>
              Tạp chí Khoa học Đại học Kỹ thuật Công nghệ Cần Thơ tuân thủ các nguyên tắc đạo đức xuất bản nghiêm ngặt để đảm bảo tính trung thực và độ tin cậy của các công trình nghiên cứu được công bố. Các nguyên tắc chính bao gồm:
            </p>
            <ul>
              <li>
                Trách nhiệm của tác giả: Tác giả phải đảm bảo rằng các công trình nghiên cứu được công bố là công trình của chính họ, chưa được công bố ở bất kỳ đâu khác và không vi phạm quyền sở hữu trí tuệ.
              </li>
              <li>
                Trách nhiệm của nhà xuất bản: Tạp chí cam kết không can thiệp vào nội dung của bài báo và đảm bảo rằng tất cả các bài báo đều được xử lý công bằng và minh bạch.
              </li>
              <li>
                Đảm bảo bí mật: Thông tin của bài báo sẽ được giữ bí mật trong suốt quá trình đánh giá và xuất bản.
              </li>
              <li>
                Chống đạo văn: Tạp chí sử dụng phần mềm kiểm tra đạo văn để phát hiện các hành vi sao chép và đạo văn trong các bài báo.
              </li>
            </ul>

            <p>
              Chúng tôi khuyến khích các tác giả, biên tập viên và phản biện báo cáo bất kỳ hành vi không đạo đức nào liên quan đến quá trình xuất bản. Mọi cáo buộc sẽ được xem xét nghiêm túc và điều tra đầy đủ để bảo vệ tính trung thực của tạp chí.
            </p>
          </div>
        </article>
      </div>
    </div>
    <Fooster/>
  </div>

  );
}

export default EditEthics;
