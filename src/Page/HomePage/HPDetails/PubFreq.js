// PubFreq.js
import React from 'react';
import Fooster from '../../../components/Fooster';
import Banner from '../../../components/Banner';
function PubFreq() {
  return (
    <div>
    <Banner/>
    <div class="layout-shared">
        <div class="Content">
            <header class="Content-header">
                <h2>Tần suất xuất bản</h2>
            </header>
            <article class="Content-main">
                <div class="Content-text">
                    <p><strong>Tạp chí Khoa học Đại học Kỹ thuật Công nghệ Cần Thơ xuất bản định kỳ 09 số mỗi năm, bao gồm:</strong></p>

                    <ul>
                        <li>Số 1: Chuyên san Khoa học Xã hội và Nhân văn (Tiếng Việt) xuất bản trước ngày 15/02.</li>
                        <li>Số 2: Chuyên san Khoa học Tự nhiên (Tiếng Việt) xuất bản trước ngày 15/03.</li>
                        <li>Số 3: Chuyên san Khoa học Xã hội và Nhân văn (Tiếng Anh) xuất bản trước ngày 15/04.</li>
                        <li>Số 4: Chuyên san Khoa học Xã hội và Nhân văn (Tiếng Việt) xuất bản trước ngày 15/06.</li>
                        <li>Số 5: Chuyên san Khoa học Tự nhiên (Tiếng Anh) xuất bản trước ngày 15/07.</li>
                        <li>Số 6: Chuyên san Khoa học Xã hội và Nhân văn (Tiếng Việt) xuất bản trước ngày 15/08.</li>
                        <li>Số 7: Chuyên san Khoa học Xã hội và Nhân văn (Tiếng Anh) xuất bản trước ngày 15/10.</li>
                        <li>Số 8: Chuyên san Khoa học Tự nhiên (Tiếng Việt) xuất bản trước ngày 15/11.</li>
                        <li>Số 9: Chuyên san Khoa học Xã hội và Nhân văn (Tiếng Việt) xuất bản trước ngày 15/12.</li>
                    </ul>
                    
                    <p>Để biết thêm thông tin về các số đặc biệt và các bài viết đã xuất bản, vui lòng truy cập vào Hệ thống quản lý xuất bản kỹ thuật số của Tạp chí.</p>
                </div>
            </article>
        </div>
    </div>
    <Fooster/>
  </div>

  );
}

export default PubFreq;
