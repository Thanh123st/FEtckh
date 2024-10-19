import React from 'react';
import Fooster from './Fooster';
import Banner from './Banner';
const Layoutview = () => {
  return (
    <div>
    <Banner/>
    <div className="layout-shared">
      <nav className="cmp-breadcrumb">
        <ol className="breadcrumb">
          <li>
            <a href="/">Trang chủ</a>
          </li>
          <li>
            <a href="/Archiving.html">Lưu trữ</a>
          </li>
          <li>Tập. 1 Số. 1 (2024)</li>
          <li>Khoa công nghệ thông tin</li>
        </ol>
      </nav>
      <div className="content">
        <div className="row">
          <header className="article-header">
            <h3>Ứng dụng trí tuệ nhân tạo trong việc tối ưu hóa hệ thống quản lý dữ liệu tại Khoa Công nghệ Thông tin</h3>
            <p className="info-tgia">
              <strong>Tác giả:</strong>
              <span>Nguyễn Hoàng Thanh <a href=""><i className="fa-regular fa-envelope"></i></a></span>
              <span>Nguyễn Thành Tuấn <a href=""><i className="fa-regular fa-envelope"></i></a></span>
              <span>Nguyễn Thị Cát Tường <a href=""><i className="fa-regular fa-envelope"></i></a></span>
            </p>
            <p className="info-tgia">Liên hệ tác giả: Hoctrohoangthanh@gmail.com</p>
          </header>
          <aside className="article-sidebar">
            <a className="galley-link btn btn-borders btn-xs btn-outline" role="button" data-toggle="modal" data-target="#vojsCitation-1594" style={{ width: '100%', margin: '20px 0' }}>
              <i className="fa-solid fa-file-pdf"></i> PDF
            </a>
            <div className="panel panel-default">
              <div className="panel-heading">Số xuất bản</div>
              <div className="panel-body">
                <a href="">Tập. 1 Số. 1 (2024)</a>
              </div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">Chuyên mục</div>
              <div className="panel-body">Công nghệ thông tin</div>
            </div>
            <div className="panel panel-default">
              <div className="panel-heading">Trích dẫn bài báo</div>
              <div className="panel-body"></div>
            </div>
          </aside>
          <main className="article-details">
            <div className="article-summary">
              <h3>Tóm tắt</h3>
              <div className="article-abstract">
                <p>Recent studies have shown that low-cost multispectral sensors have attracted much interest in developing agricultural applications...</p>
              </div>
              <span><strong>Keywords:</strong> Low-cost, nondestructive assessment, multispectral sensor</span>
            </div>
            <div className="article-summary">
              <h3>Tóm tắt</h3>
              <div className="article-abstract">
                <p>Nhiều nghiên cứu gần đây cho thấy cảm biến đa phổ giá thành thấp được quan tâm nhiều trong việc phát triển các ứng dụng trong nông nghiệp...</p>
              </div>
              <span><strong>Từ khóa:</strong> Đánh giá không phá hủy, cảm biến đa phổ, giá thấp</span>
            </div>
            <div className="article-summary">
              <h4>Từ khóa</h4>
              <p>Công nghệ thông tin, đại học, quận Ninh Kiều, TP.Cần Thơ</p>
            </div>
            <div className="article-summary">
              <h4>Tài liệu tham khảo</h4>
              <p style={{ display: 'inline' }}>
                Ban Chấp hành Trung ương. (2013). Nghị quyết 29- NQ/TW ngày 4 tháng 11 năm 2013...
              </p>
              <a title="google-schooler" href=""><i className="fa-solid fa-link" style={{ display: 'inline', color: 'black', fontSize: '12px' }}></i></a>
            </div>
          </main>
        </div>
      </div>
      <div className="MRA-SA">
        <h3>Các bài viết được đọc nhiều nhất của cùng tác giả</h3>
        <ul>
          <li>
            Nguyễn Văn A, Trần Thị B, <a href="https://ctuet.edu.vn/tin-tuc.html">Quản lý thiết bị dạy học hiện tại tại các trường tiểu học huyện Lộc Ninh, tỉnh Bình Phước</a>,
            <a href="https://ctuet.edu.vn/tin-tuc.html">Tạp chí Khoa học Đại học Kỹ thuật - Công nghệ Cần Thơ: Tập 1 Số 1 (2024): Số đặc biệt về Khoa học xã hội và Nhân văn (Tiếng Việt)</a>
          </li>
          {/* Các bài viết khác... */}
        </ul>
      </div>
    </div>
    <Fooster/>
  </div>

  );
};

export default Layoutview;
