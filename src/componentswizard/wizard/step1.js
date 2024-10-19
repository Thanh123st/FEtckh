import React, { useState } from 'react';


const Step1 = () => {


  return (
    <div id="step1" className="context active">
      <form className="pkp_ui_content">
        <div className="pkp_input_container">
          <h5>Chuyên mục</h5>
          <select className="pkp_ui_select">
            <option value="16">Công nghệ</option>
            <option value="2" selected>
              Công nghệ thông tin
            </option>
            <option value="3">Môi trường</option>
            <option value="4">Tự nhiên</option>
            <option value="6">Công nghệ sinh học</option>
            <option value="7">Công nghệ thực phẩm</option>
            <option value="1">Khoa học Chính trị</option>
            <option value="10">Xã hội-Nhân văn</option>
            <option value="13">Kinh tế</option>
            <option value="15">Luật</option>
          </select>
        </div>

        <div className="pkp_input_container">
        <h5>Yêu cầu của bài nộp</h5>
        <p>
        <strong>
          Bạn phải đọc và xác nhận rằng bạn đã hoàn thành các yêu cầu bên dưới trước khi tiếp tục.
        </strong>
        </p>
        <ul className="checkbox_and_radiobutton">
          <li>
            <label>
              <input
                type="checkbox"
                id="checklist-0"
                required
                value="1"
                name="checklist-0"
                className="field checkbox required"
                aria-required="true"
              />
              Bài gửi chưa được xuất bản trước đó, hoặc đang gửi cho một tạp chí khác xem xét (hoặc một lời giải thích đã được cung cấp trong Nhận xét cho Biên tập viên).
            </label>
          </li>

          <li>
            <label>
              <input
                type="checkbox"
                id="checklist-1"
                required
                value="1"
                name="checklist-1"
                className="field checkbox required"
                aria-required="true"
              />
              Tập tin bài gửi ở định dạng tệp tài liệu OpenOffice, Microsoft Word hoặc RTF.
            </label>
          </li>

          <li>
            <label>
              <input
                type="checkbox"
                id="checklist-3"
                required
                value="1"
                name="checklist-3"
                className="field checkbox required"
                aria-required="true"
              />
              Các văn bản là khoảng cách đơn; sử dụng phông chữ 12; sử dụng chữ nghiêng, thay vì gạch chân (trừ địa chỉ URL); và tất cả các hình minh họa, số liệu và bảng được đặt trong văn bản tại các điểm thích hợp, thay vì ở cuối bản thảo.
            </label>
          </li>

          <li>
            <label>
              <input
                type="checkbox"
                id="checklist-4"
                required
                value="1"
                name="checklist-4"
                className="field checkbox required"
                aria-required="true"
              />
              Văn bản tuân thủ các yêu cầu về trình bày văn bản và tài liệu tham khảo được nêu trong Hướng dẫn cho tác giả.
            </label>
          </li>

          <li>
            <label>
              <input
                type="checkbox"
                id="checklist-5"
                required
                value="1"
                name="checklist-5"
                className="field checkbox required"
                aria-required="true"
              />
              Tác giả liên hệ gửi bài phải nhập đầy đủ thông tin của bài viết vào các trường dữ liệu tương ứng theo 2 ngôn ngữ tiếng Việt và tiếng Anh (Danh sách tác giả khi khai báo phải giống thứ tự tác giả trong tập tin).
            </label>
          </li>
        </ul>
        </div>



        <div className="pkp_input_container">
        <h5>Ghi chú cho biên tập viên</h5>
        <div class="pkp_form-group">
          <textarea required="" cols="50" rows="10" id="textarea" name="textarea"></textarea>
        </div>

        <ul className="checkbox_and_radiobutton" style={{ listStyleType: 'none' }}>
          <li>
            <label>
              <input
                type="checkbox"
                id="privacyConsent"
                required

                name="privacyConsent"
                className="field checkbox required"

                aria-required="true"
              />
              Đồng ý thu thập và lưu trữ dữ liệu cá nhân theo{' '}
              <a href="" target="_blank" rel="noopener noreferrer">
                cam kết bảo mật
              </a>.
            </label>
          </li>
        </ul>
        </div>

        <div className="section formButtons form_buttons">
          <button className="pkp_button submitFormButton" type="submit">
            Lưu và tiếp tục
          </button>

          <span></span>

          <a href="#" className="cancelButton">
            Hủy bỏ
          </a>
        </div>
      </form>
    </div>
  );
};

export default Step1;
