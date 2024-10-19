import React, { useState } from 'react';

const Step3 = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [citations, setCitations] = useState([{ title: '', link: '' }]); // state để lưu trữ các trích dẫn

  const showPopup = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const handleAddCitation = () => {
    setCitations([...citations, { title: '', link: '' }]); // Thêm một trích dẫn mới
  };

  const handleCitationChange = (index, field, value) => {
    const newCitations = citations.slice();
    newCitations[index][field] = value;
    setCitations(newCitations); // Cập nhật trích dẫn khi có sự thay đổi
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý dữ liệu form ở đây
    console.log("Form submitted");
  };

  return (
    <div id="step3" className="context active" id="mainBody">
      <form className="pkp_ui_content" onSubmit={handleSubmit}>
      <div className="pkp_input_container">
      <h5>Tiêu đề</h5>
      <input type="text" name="title" id="title" required />
      </div>

      <div className="pkp_input_container">
      <h5>Tóm tắt</h5>
        <p>Phần tóm tắt phải có 250 từ trở xuống.</p>
        <input type="text" name="summary" id="summary" required />
      </div>

      <div className="pkp_input_container">
      <h5>Từ khóa</h5>
        <p>Thêm thông tin bổ sung cho bài nộp của bạn. Nhấn 'enter' sau mỗi thuật ngữ.</p>
        <input type="text" name="keywords" id="keywords" required />
      </div>
        
      <div className="pkp_input_container">
      <div>
          <div className="header">
            <h4>Danh sách đồng tác giả</h4>
            <ul>
              <li>
                <a onClick={showPopup}>
                  Hiện popup
                </a>
              </li>
            </ul>
          </div>
          <table>
            <colgroup>
              <col style={{ width: '20%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '15%' }} />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">Tên</th>
                <th scope="col">E-mail</th>
                <th scope="col">Vai trò</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span>Nguyễn Thanh</span>
                </td>
                <td>
                  <span>hoctrohoangthanh@gmail.com</span>
                </td>
                <td>
                  <span>Tác giả</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

        <div className="pkp_input_container">
        <div className="pkp_ui_references">
          <h1>Thêm nhiều trích dẫn</h1>
            <div id="pkp_ui_references_citation-form">
              {citations.map((citation, index) => (
                <div key={index} className="pkp_ui_references_citation-form">
                  <label htmlFor={`title-${index}`}>Tiêu đề</label>
                  <input
                    type="text"
                    id={`title-${index}`}
                    value={citation.title}
                    onChange={(e) => handleCitationChange(index, 'title', e.target.value)}
                    required
                  />
                  <label htmlFor={`link-${index}`}>Liên kết</label>
                  <input
                    type="url"
                    id={`link-${index}`}
                    value={citation.link}
                    onChange={(e) => handleCitationChange(index, 'link', e.target.value)}
                    required
                  />
                </div>
              ))}
              <button type="button" className="pkp_ui_references_btn" onClick={handleAddCitation}>
                Thêm trích dẫn mới
              </button>
            </div>
          </div>
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

      {isPopupVisible && (
        <div className="overlay" id="overlay">
          <div className="popup">
            <h2>Popup</h2>
            <p>Đây là nội dung của popup.</p>
            <button onClick={closePopup}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step3;
