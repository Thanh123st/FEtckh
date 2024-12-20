import React, { useState, useContext , useEffect } from 'react';
import {  Link , useParams} from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context Status/AuthContext';
import { Contextwizaed } from "../../Context Status/ContextWizard";
import Editor from '../../components/Editor';

const Step1 = () => {

  const { token, apiUrl } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const {postId, setPostId, setIsStep1Completed,chuDe, setChuDe,ghiChu, setGhiChu}  = useContext(Contextwizaed);

  
  
  const [articles, setArticles] = useState("");

  const deleteArticle = async (postId) => {
    try {
      await axios.delete(`/api/articles/${postId}`); 
      setArticles(articles.filter(article => article.id !== postId)); 
    } catch (error) {
      console.error('Có lỗi xảy ra khi xóa bài viết!', error);
    }
  };

  
  const [chuDeList, setChuDeList] = useState([]);  // Dữ liệu chuyên đề
  useEffect(() => {
    const fetchChuDe = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/chuyen-de`);
        setChuDeList(response.data);  // Lưu danh sách chuyên đề vào state
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchChuDe();
  }, []);
  console.log("PostID",postId);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Dữ liệu gửi đi:", { category_id: chuDe, note: ghiChu });
    if(postId != null){
      console.log(postId);

      try {
        const response = await axios.post(`${apiUrl}/api/wizard/step1/${postId}`, {
          category_id: chuDe,
          note: ghiChu,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Phản hồi từ máy chủ:", response.data);
        if (response.data.message) {
          setMessage(response.data.message);
          console.log(response.data.article_id);
          setIsStep1Completed(true);
          alert("Cập nhật bước 1 thành công");
          console.log(postId);
        }
      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu:", error);
      }
    }
    else{
      try {
        const response = await axios.post(`${apiUrl}/api/wizard/step1`, {
          category_id: chuDe,
          note: ghiChu,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Phản hồi từ máy chủ:", response.data);
        if (response.data.message) {
          setMessage(response.data.message);
          setPostId(response.data.article_id);
          console.log(response.data.article_id);
          setIsStep1Completed(true);
          alert("Hoàn thành bước 1");
          console.log(postId);
        }
      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu:", error);
      }
    }
  };



  console.log(postId);
  const { idbaiviet } = useParams(); 
  if(idbaiviet){
    setPostId(idbaiviet);
  }

  useEffect(() => {
      const getBaiviet= async () => {
          try {
              const response = await axios.get(`${apiUrl}/api/submissions?article_id=${postId}`, {
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
            });
            console.log("backup",response.data[0]);
            

            setChuDe(response.data[0].data.category_id);
            setGhiChu(response.data[0].data.note);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
      }
  };
  getBaiviet();
  }, []);

  return (
    
    <div id="step1" className="context active">
      <form className="pkp_ui_content" onSubmit={handleSubmit}>
        <div className="pkp_input_container">
          <h5>Chuyên mục</h5>
          <select className="pkp_ui_select" 
            onChange={(e) => setChuDe(e.target.value)}>
            {chuDeList.map((chuDeItem) => (
              <option value={chuDeItem.category_id} selected={chuDeItem.category_id === chuDe}>
                {chuDeItem.name}
              </option>
            ))}
          </select>
        </div>

        <div className="pkp_input_container">
        <h5>Yêu cầu của bài nộp</h5>
        <p>
        <strong>
          Bạn phải đọc và xác nhận rằng bạn đã hoàn thành các yêu cầu bên dưới trước khi tiếp tục.
        </strong>
        </p>
        </div>
        <ul className="checkbox_and_radiobutton">
          <li>
            <label className="checkbox-container">
              <input
                type="checkbox"
                id="checklist-0"
                required
                value="1"
                name="checklist0"
                className="custom-checkbox field checkbox required"
                aria-required="true"
              />
              <span className="checkmark"></span>
              Bài gửi chưa được xuất bản trước đó, hoặc đang gửi cho một tạp chí khác xem xét (hoặc một lời giải thích đã được cung cấp trong Nhận xét cho Biên tập viên).
            </label>
          </li>

          <li>
            <label className="checkbox-container">
              <input
                type="checkbox"
                id="checklist-1"
                required
                value="1"
                name="checklist1"
                className="custom-checkbox field checkbox required"
                aria-required="true"
              />
              <span className="checkmark"></span>
              Tập tin bài gửi ở định dạng tệp tài liệu OpenOffice, Microsoft Word hoặc RTF.
            </label>
          </li>

          <li>
            <label className="checkbox-container">
              <input
                type="checkbox"
                id="checklist-2"
                required
                value="1"
                name="checklist2"
                className="custom-checkbox field checkbox required"
                aria-required="true"
              />
              <span className="checkmark"></span>
              Các văn bản là khoảng cách đơn; sử dụng phông chữ 12; sử dụng chữ nghiêng, thay vì gạch chân (trừ địa chỉ URL); và tất cả các hình minh họa, số liệu và bảng được đặt trong văn bản tại các điểm thích hợp, thay vì ở cuối bản thảo.
              
            </label>
          </li>

          <li>
            <label className="checkbox-container">
              <input
                type="checkbox"
                id="checklist-4"
                required
                value="1"
                name="checklist3"
                className="custom-checkbox field checkbox required"
                aria-required="true"
              />
              <span className="checkmark"></span>
              Văn bản tuân thủ các yêu cầu về trình bày văn bản và tài liệu tham khảo được nêu trong Hướng dẫn cho tác giả.
              
            </label>
          </li>

          <li>
            <label className="checkbox-container">
              <input
                type="checkbox"
                id="checklist-5"
                required
                value="1"
                name="checklist4"
                className="custom-checkbox field checkbox required"
                aria-required="true"
              />
              <span className="checkmark"></span>
              Tác giả liên hệ gửi bài phải nhập đầy đủ thông tin của bài viết vào các trường dữ liệu tương ứng theo 2 ngôn ngữ tiếng Việt và tiếng Anh (Danh sách tác giả khi khai báo phải giống thứ tự tác giả trong tập tin).
              
            </label>
          </li>


        </ul>
        



        <div className="pkp_input_container">
          <h5>Ghi chú cho biên tập viên</h5>
          <Editor value={ghiChu} setContent={setGhiChu}></Editor>
        </div>
        <ul className="checkbox_and_radiobutton" style={{ listStyleType: 'none' }}>
          <li>
            <label className="checkbox-container">
              <input
                type="checkbox"
                id="privacyConsent"
                required

                name="privacyConsent"
                className="custom-checkbox field checkbox required"
                aria-required="true"
              />
              <span className="checkmark"></span>
              Đồng ý thu thập và lưu trữ dữ liệu cá nhân theo{' '}
              <Link to="/privacypolicy ">
                cam kết bảo mật
              </Link>.
            </label>
          </li>
        </ul>
        

        <div className="section formButtons form_buttons" style={{ display: "flex", textAlign: "center"}}>
          <button className="pkp_button submitFormButton" type="submit">
            <span class="text_submitFormButton">Lưu và tiếp tục</span>
          </button>

          <a href="#" className="cancelButton">
            Hủy bỏ
          </a>
        </div>
      </form>
    </div>  

    
  );
};

export default Step1;
