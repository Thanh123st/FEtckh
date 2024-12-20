import React, { useState, useContext, useEffect } from 'react';
import {  useParams} from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context Status/AuthContext';
import { Contextwizaed } from "../../Context Status/ContextWizard";

const Step2 = () => {
  const { token, apiUrl } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const {postId,setIsStep2Completed , file, setFile}  = useContext(Contextwizaed);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      console.log("Chưa chọn tệp để tải lên");
      return;
    }
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${apiUrl}/api/wizard/step2/${postId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Phản hồi từ máy chủ:", response.data);
      if (response.data.message) {
        setMessage(response.data.message);
        alert("Thành công bước 2");
        setIsStep2Completed(true);
        
      }
    } catch (error) {
      console.error("Lỗi khi tải lên tệp:", error);
    }
  };
  const { idbaiviet } = useParams(); 

  const [fileData, setFileData] = useState(null);
  const [biennamefile, setBiennamefile] = useState(null);
  const [bienpathfile, setBienpathfile] = useState(null);
  const [loadfile, setLoadfile] = useState(true);

  useEffect(() => {
    // Hàm fetch dữ liệu từ API
    const fetchFiles = async () => {
        try {
            setLoadfile(true);
            const response = await axios.get(
                `${apiUrl}/api/user/article/files?article_id=${idbaiviet}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Thay YOUR_TOKEN_HERE bằng token thật
                    },
                }
            );
            console.log("Datafile:",response.data.data[0]);

            if (response.data && response.data.status === 200) {
                const files = response.data.data;

                // Tìm file có file_id lớn nhất
                const maxFile = files.reduce((prev, current) =>
                    prev.file_id > current.file_id ? prev : current
                );

                // Lấy file_name và file_path của file đó
                setFileData({
                    fileName: maxFile.file_name,
                    filePath: maxFile.file_path,
                });
            }
            setBiennamefile(fileData.fileName);
            setBienpathfile(fileData.filePath);
        } catch (err) {
            console.error("Lỗi khi gọi API:", err.message);
        }
        finally{
          setLoadfile(false);
        }
    };

    fetchFiles();
}, [apiUrl, idbaiviet, token]);

  

  

  return (
    <div id="step2" className="context active">
      <form className="pkp_ui_content" onSubmit={handleSubmit}>
        <div>
          <h5>Tải tập tin</h5>
        </div>
        <div
          id="pkpUploaderDropZone"
          className="pkp_uploader_drop_zone"
          style={{ position: 'relative' }}
        >
          <div className="pkp_uploader_drop_zone_label">
            Kéo và thả tệp vào đây để bắt đầu tải lên
          </div>

          <div className="pkp_uploader_details">
            <div className="pkp_grid-container">
              

          <label className="custum-file-upload" htmlFor="file">
            <div className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill viewBox="0 0 24 24"><g strokeWidth={0} id="SVGRepo_bgCarrier" /><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" /><g id="SVGRepo_iconCarrier"> <path fill d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd" /> </g></svg>
            </div>
            <div className="text">
              <span>Click to upload image</span>
            </div>
            <input type="file" id="file" onChange={handleFileChange}/>
          </label>
            </div>
            <span className="pkpUploaderFilename" >
              {file ? file.name : ( biennamefile ? biennamefile:"Chưa có tệp nào được chọn")}
              
            </span>
            
          </div>
          <span>{message}</span>
          <div className="section formButtons form_buttons" style={{ display: "flex", textAlign: "center" }}>
            <button className="pkp_button submitFormButton" type="submit">
              <span className="text_submitFormButton">Lưu và tiếp tục</span>
            </button>
            <a href="#" className="cancelButton">
              Hủy bỏ
            </a>
          </div>
        </div>

      </form>
    </div>
  );
};

export default Step2;
