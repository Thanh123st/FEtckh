import React from 'react';

const Step4 = () => {
  return (
    <div id="step4" className="context active">
      <form className="pkp_ui_content">
        <p>
          Bài nộp của bạn đã được lưu lại và sẵn sàng để gửi lên cho tạp chí.
          Bạn có thể quay lại để xem xét và điều chỉnh bất kỳ thông tin nào bạn đã
          nhập trước khi tiếp tục. Nếu bạn đã sẵn sàng, hãy nhấp vào "Hoàn thành
          bài nộp" để gửi bài báo đến cho tạp chí.
        </p>
        <div className="section formButtons form_buttons">
          <button className="pkp_button submitFormButton" type="submit">
            Hoàn thành và xác nhận
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

export default Step4;
