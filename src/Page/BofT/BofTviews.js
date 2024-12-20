import React, { useState, useRef, useContext } from 'react';
import Editor from '../../components/Editor';
import { Link,useParams ,useNavigate } from 'react-router-dom';
import HeaderSub, {SlideBar} from "../../components/HeaderSub";
import "../../Css/reviewer.css"; // Import CSS tùy chỉnh
import ArticleDetail from '../../components/DetailAritcle';
import axios from 'axios';
import { AuthContext } from '../../Context Status/AuthContext';

const Boftviews = () => {
    const { articleId } = useParams();
    console.log("id bai viết ",articleId);
    const token = localStorage.getItem("token");
    const {  apiUrl } = useContext(AuthContext);
    const [comments, setComments] = useState('');
    const navigate = useNavigate();  // Hook để điều hướng

    const handleChange = (event) => {
        setComments(event.target.value);
      };

    const handlePostRequest = async (decision, comment = "") => {
        const data = { decision, comment };
        try {
            const response = await axios.post(`${apiUrl}/api/committee/review/${articleId}`, data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`  // Thêm token vào header Authorization
                    }
                }
            );
            console.log('Response:', response.data);
            alert(response.data.message);
            navigate('/boardoftrustees');
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };
  return (
    <div>
        <style>
            {`
            .hidden {
                display: none;
            }
            .cmt_ls_ls {
                font-size: 1.2rem;
                font-weight: bold;
                color: #333;
                display: inline-block;
                margin-bottom: 10px;
                padding: 5px;
                border-radius: 8px;
                
            }

            
            `}
        </style>
        <HeaderSub/>
        <div className="pkp_structure_main">
            <SlideBar></SlideBar>
            <div className="edt_container">
            <ArticleDetail articleid={articleId}/>
            
            <div>
            <label class="cmt_ls_ls">Bình luận về bài viết</label>
            <Editor value={comments} setContent={setComments}></Editor>
            <button className="edt_btn edt_btn-accept" onClick={() => handlePostRequest( 'Send_to_editor', comments)}>Chấp nhận</button>
            <button className="edt_btn edt_btn-reject"  onClick={() => handlePostRequest( 'Rejected', comments)}>Từ chối</button>
            <button className="edt_btn edt_btn-reject" onClick={() => handlePostRequest( 'Not_approved', comments)} style={{ backgroundColor:"#cccc5a" }}>Sữa đổi</button>
            </div>
        </div>
        </div>

        </div>
    
  );
};

export default Boftviews;


