import React, { useState, useContext , useEffect } from 'react';
import {  Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context Status/AuthContext';
import { Contextwizaed } from "../../Context Status/ContextWizard";
import Editor from '../../components/Editor';

const Addinf = (props) => {
    const { token, apiUrl } = useContext(AuthContext);
    const [idtukhoa, setTdtukhoa] = useState("");
    const [tailieuthamkhao,setTailieuthamkhao] = useState("");
    const [ghichu,setGhichu] = useState("");
    const [keywords, setKeywords] = useState([]);

    const fetchSubmissions = async () => {

        try {
            // Gửi yêu cầu GET
            const response = await axios.get(`${apiUrl}/api/submissions?article_id=${props.postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
  
            // Xử lý dữ liệu JSON trả về
            setTailieuthamkhao(response.data[0].data.citations);
            setGhichu(response.data[0].data.note);
            
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error.message);
            if (error.response) {
                console.error("Chi tiết lỗi:", error.response.data);
            }
        }
    };

    const [editorContent, setEditorContent] = useState('');

    const getTukhoa= async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/tukhoa/${props.postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
          });
          
          const Keyword = response.data.data.map(item => item.keyword);
          
          setKeywords(Keyword.join(''));
          console.log("Từ khóa",keywords);
          
      } catch (error) {
          console.error('Lỗi khi lấy dữ liệu:', error);
      }
      };
  
    useEffect(() => {
      fetchSubmissions();
      getTukhoa();
    }, []);



    const handleUpdate = async (event) => {
        event.preventDefault();
        const updatedData = {
          note: ghichu,      
          keyword: keywords,  
          citations: tailieuthamkhao
        };
        console.log("Dữ liệu đi nè: ",updatedData);
    
        try {
          const response = await axios.put(`${apiUrl}/api/articles/${props.postId}/updated`, updatedData, {
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

    return (


    <>
        <form className="pkp_ui_content" onSubmit={handleUpdate}>

            <div className="pkp_input_container">
            <h5>Từ khóa</h5>
            <p>Thêm thông tin bổ sung cho bài nộp của bạn. Thêm dấu "/" sau mỗi thuật ngữ.</p>
            <Editor value={keywords} setContent={setKeywords}></Editor>
            </div>
            <div className="pkp_input_container">
            <h5>Tài liệu tham khảo</h5>
            <Editor value={tailieuthamkhao} setContent={setTailieuthamkhao}></Editor>

            </div>
            <div className="pkp_input_container">
            <h5>Ghi chú cho biên tập viên</h5>
            <Editor value={ghichu} setContent={setGhichu}></Editor>
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

export default Addinf;
