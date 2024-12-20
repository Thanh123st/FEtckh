import React, { useState, useContext , useEffect } from 'react';
import {  Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context Status/AuthContext';
import { Contextwizaed } from "../../Context Status/ContextWizard";
import Editor from '../../components/Editor';

const TitleDA = (prop) => {

  const [chuDe, setChuDe] = useState("");
  const [tiede,setTieude] = useState("");
  const [tomtat,setTomtat] = useState("");

  const { token, apiUrl } = useContext(AuthContext);
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
  console.log(prop.postId);

  const fetchSubmissions = async () => {

      try {
          // Gửi yêu cầu GET
          const response = await axios.get(`${apiUrl}/api/submissions?article_id=${prop.postId}`, {
              headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
              },
          });

          // Xử lý dữ liệu JSON trả về
          console.log("Dữ liệu nhận được:", response.data[0]);
          setChuDe(response.data[0].data.category_id);
          setTieude(response.data[0].data.title);
          setTomtat(response.data[0].data.abstract);
      } catch (error) {
          console.error("Lỗi khi lấy dữ liệu:", error.message);
          if (error.response) {
              console.error("Chi tiết lỗi:", error.response.data);
          }
      }
  };


  const handleUpdate = async (event) => {
    event.preventDefault();
    const updatedData = {
      title: tiede,      
      abstract: tomtat,  
      category_id: chuDe.toString() 
    };
    console.log("Dữ liệu đi nè: ",updatedData);

    try {
      const response = await axios.put(`${apiUrl}/api/articles/${prop.postId}/update`, updatedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Token xác thực
        },
      });
      console.log("Dữ liệu đi nè: ",updatedData);
      if (response.status === 200) {
        alert("Cập nhật thành công!");
        console.log("Dữ liệu phản hồi từ API:", response.data);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật bài viết:", error.response?.data || error.message);
      alert("Cập nhật thất bại. Vui lòng thử lại!");
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return (
    
    <>
        <form className="pkp_ui_content" onSubmit={handleUpdate}>
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
            <h5>Tiêu đề</h5>
            <Editor value={tiede} setContent={setTieude} ></Editor>
            </div>
            <div className="pkp_input_container">
            <h5>Tóm tắt</h5>
            <p>Phần tóm tắt phải có 250 từ trở xuống.</p>
            <Editor value={tomtat} setContent={setTomtat}></Editor>
            </div>
            <div className="section formButtons form_buttons" style={{ display: "flex", textAlign: "center"}}>
            <button className="pkp_button submitFormButton" type="submit">
              <span class="text_submitFormButton">Lưu lại</span>
            </button>
            </div>
        </form>
    </>
    
  );
};

export default TitleDA;
