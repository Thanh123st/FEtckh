import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context Status/AuthContext';
import { Contextwizaed } from "../../Context Status/ContextWizard";


const Step4 = ({ formData }) => { // Nhận formData từ props hoặc context
  const { token, apiUrl } = useContext(AuthContext);
  const [dataToSend] = useState("");
  const {postId , setIsStep4Completed}  = useContext(Contextwizaed);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang

    try {
      const response = await axios.post(`${apiUrl}/api/wizard/step4/${postId}`, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log("Phản hồi từ máy chủ:", response.data);
      setIsStep4Completed(true);
      
    } catch (error) {
      console.error('Error submitting data:', error);
      
    }
  };

  return (
    <div id="step4" className="context active">
      <form className="pkp_ui_content" onSubmit={handleSubmit}>
        <p>
          Bài nộp của bạn đã được lưu lại và sẵn sàng để gửi lên cho tạp chí.
          Bạn có thể quay lại để xem xét và điều chỉnh bất kỳ thông tin nào bạn đã
          nhập trước khi tiếp tục. Nếu bạn đã sẵn sàng, hãy nhấp vào "Hoàn thành
          bài nộp" để gửi bài báo đến cho tạp chí.
        </p>
        <div className="section formButtons form_buttons" style={{ display: "flex", textAlign: "center"}}>
          <button className="pkp_button submitFormButton" type="submit">
            <span className="text_submitFormButton">Lưu và tiếp tục</span>
          </button>
          <a href="#" className="cancelButton">
            Hủy bỏ
          </a>
        </div>
      </form>
    </div>
  );
};

export default Step4;
