import React, { useState,useRef,useEffect,useContext  } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import '../../Css/Wizard.css'; 
import dayjs from "dayjs";
import Chat from "../../components/Chatbox";
import HeaderSub, { SlideBar } from '../../components/HeaderSub';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context Status/AuthContext';
import Addinf from '../../components/DetailArticle/Addinf';
import TitleDA from '../../components/DetailArticle/Titledesc';
import Co_auth from '../../components/DetailArticle/Co_author';
import Editor from '../../components/Editor';
import Discusswithedit from '../../components/DetailArticle/Discusswe';
import { submitFile } from '../../components/file/fileuploadmore';
function DetailArticle() {
    const [activeTab, setActiveTab] = useState('1');
    const [activeSubTab, setActiveSubTab] = useState('4');
    const [activeSubTab2, setActiveSubTab2] = useState('8');
    const { token, apiUrl } = useContext(AuthContext);

    const showContext = (tabId) => {
        setActiveTab(tabId);
    };

    const showContext2 = (subTabId) => {
        setActiveSubTab(subTabId);
    };

    const showContext3 = (subTabId) => {
        setActiveSubTab2(subTabId);
    };

    const dialog1Ref = useRef(null);
    const dialog2Ref = useRef(null);
    const dialog3Ref = useRef(null);

    const showDialog = (dialogRef) => {
      if (dialogRef.current) {
        dialogRef.current.showModal();

      }
    };
  
    const closeDialog = (dialogRef) => {
      if (dialogRef.current) {
        dialogRef.current.close();
      }
    };

    const { articleId } = useParams();



    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        console.log("File đã chọn:", event.target.files[0]);
      };
      const urlne = `${apiUrl}/api/uploadfile`
      // Xử lý khi người dùng bấm nút tải file
      const handleSubmitFile = async () => {
        if (!file) {
          alert("Vui lòng chọn một file trước khi tải lên.");
          return;
        }
    
        try {
          const result = await submitFile(urlne, file, articleId, token);
          alert("Tải lên thành công!");
          console.log("Kết quả từ server:", result);
        } catch (error) {
          alert("Tải lên thất bại. Vui lòng thử lại.");
          console.error("Chi tiết lỗi:", error.response?.data || error.message);
        }
      };
    
        
    // Đối tượng trạng thái lưu trạng thái ẩn/hiện của mỗi hàng
    const [visibility, setVisibility] = useState({
        row1: false,
        row2: false,
    });

    // Hàm xử lý việc thay đổi trạng thái ẩn/hiện của từng hàng
    const toggleVisibility = (row) => {
        setVisibility(prevState => ({
        ...prevState,
        [row]: !prevState[row], // Chuyển trạng thái từ ẩn sang hiện và ngược lại
        }));
    };


    const [articleData, setArticleData] = useState([{}]);
    const [error, setError] = useState(null);
    const [authorname, setAuthorname] = useState("");
    const [status, setStatus] = useState("");

    
    useEffect(() => {
        const fetchArticleDetail = async () => {
          try {
            const token = localStorage.getItem('token'); // Hoặc lấy từ một nơi khác nếu có
    
            const apiUrlWithParams = `${apiUrl}/api/submissions?article_id=${articleId}`;

            
            const response = await axios.get(apiUrlWithParams, {
              headers: {
                Authorization: `Bearer ${token}`, 
              },
            });
            setArticleData(response.data[0].data); 
            setStatus(response.data[0].data.status);
            console.log("data",articleData);
          } catch (error) {
            setError('Lỗi khi lấy chi tiết bài viết');
            console.error("Lỗi:", error);
          }
        };

        const getUserData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAuthorname(response.data.data.last_name+" "+response.data.data.first_name)

            } catch (error) {
                setError('Lỗi khi lấy dữ liệu: ' + error.message);
                console.error('Lỗi khi lấy dữ liệu:', error);
            } finally {
            }
        };
        getUserData();
        fetchArticleDetail();
    }, [articleId]);

    const [arrayfiles, setArrayfiles] = useState([]);
    const [alinkfile, setAlinkfile] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get(
                    `${apiUrl}/api/user/article/files?article_id=${articleId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setArrayfiles(response.data.data);
                console.log("Dữ liệu arrayfile:", arrayfiles );
                console.log("Dữ liệu arrayfile dgfd:", response.data.data[0].file_name );
                setAlinkfile(response.data.data[0].file_name);
            } catch (err) {
                console.warn(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFiles();
    }, [articleId,file]);


    const [data, setData] = useState(null);

    return (
        <div>
        <style>
            {`
            .hidden {
                display: none;
            }
            `}
        </style>
        <HeaderSub/>
        <div className="pkp_structure_main">
            <SlideBar></SlideBar>
            <div className="pkp_structure_content">
            <nav className="cmp-breadcrumb">
                <ol className="breadcrumb">
                    <li>{articleData.article_id}</li>
                    <li><strong>{authorname}</strong></li>
                                     
                </ol>
            </nav>

            <div className="pkpTabs">
                <div className="tabs-list">
                    <button 
                        id="btn-1" 
                        className={activeTab === '1' ? 'selected-button' : ''} 
                        onClick={() => showContext('1')}
                    >
                        Quy trình
                    </button>
                    <button 
                        id="btn-2" 
                        className={activeTab === '2' ? 'selected-button' : ''} 
                        onClick={() => showContext('2')}
                    >
                        Xuất bản
                    </button>
                </div>

                <div id="1" className={activeTab === '1' ? 'context active' : 'context'}>
                    <div className="pkpListPanel__content">
                        <div className="da_tabs-list">
                            <button 
                                id="btn-4" 
                                className={activeSubTab === '4' ? 'da_selected-button' : ''} 
                                onClick={() => showContext2('4')}
                            >
                                Phản Biện
                            </button>
                            <button 
                                id="btn-5" 
                                className={activeSubTab === '5' ? 'da_selected-button' : ''} 
                                onClick={() => showContext2('5')}
                                style={{ display:"none" }}
                            >
                                Phản biện
                            </button>
                            <button 
                                id="btn-6" 
                                className={activeSubTab === '6' ? 'da_selected-button' : ''} 
                                onClick={() => showContext2('6')}
                                
                            >
                                Biên tập
                            </button>
                            <button 
                                id="btn-7" 
                                className={activeSubTab === '7' ? 'da_selected-button' : ''} 
                                onClick={() => showContext2('7')}
                            >
                                Sản xuất
                            </button>
                        </div>

                        <div id="4" className={activeSubTab === '4' ? 'context2 active2' : 'context2'}>
                        {!articleData.article_id ? (
                            <div className="de-ar-tab-panel-widget">
                                Giai đoạn này chưa được khởi tạo.
                            </div>
                        ) : (
                            <div className="de-ar-tab-panel-widget">
                                <div className="de-ar-tab-panel-content">
                                    <dialog ref={dialog2Ref} className="centered-dialog">
                                        {/* Label for drag and drop upload area */}
                                        

                                        
                                        <div className="pkp_uploader_drop_zone_label">
                                            <strong style={{ fontSize:'22px' }}>Tải tập tin lên:</strong>
                                        </div>

                                        {/* Details about the upload progress */}
                                        <div className="pkp_uploader_details">
                                            <div className="pkp_uploader_progress_bar_wrapper">
                                            <div class="pkp_grid-container">
                                            <label className="custum-file-upload" htmlFor="file">
                                                <div className="icon">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill viewBox="0 0 24 24"><g strokeWidth={0} id="SVGRepo_bgCarrier" /><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" /><g id="SVGRepo_iconCarrier"> <path fill d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd" /> </g></svg>
                                                </div>
                                                <div className="text">
                                                <span>Click to upload files</span>
                                                </div>
                                                <input type="file" id="file" onChange={handleFileChange}/>
                                            </label>
                                            </div>

                                            </div>
                                            <span className="pkpUploaderFilename"></span>
                                        </div>
                                        <button className='dia_btn_save' type='submit' onClick={handleSubmitFile}>Lưu lại</button>
                                        <button className='dia_btn_close' type="button" onClick={() => closeDialog(dialog2Ref)}>Đóng</button>
                                        
                                    </dialog>
                                    <div className="de-ar-tab-panel-controller">
                                        <div className="de-ar-panel-controller-header">
                                            <h4>Tệp bài viết</h4>   
                                            <a href="#" id="edit-file-link" title="Sửa tệp" onClick={() => showDialog(dialog2Ref)}>Thêm tệp mới</a>
                                        </div>
                                        {!arrayfiles?(<span className="de-ar-tab-panel-none-file" style={{ paddingTop:"10px" }}><em>Không có tệp</em></span>):(
                                        
                                        
                                        <table id="de-ar-table" className="de-ar-tab-panel-controller-table">
                                            <colgroup>
                                                <col style={{ width: '70%' }} />
                                                <col style={{ width: '17%' }} />
                                                
                                            </colgroup>
                                            <thead>
                                                <tr>
                                                    <th scope="col" style={{ textAlign: 'center' }}></th>
                                                    <th scope="col" style={{ textAlign: 'right' }}></th>
                                                    
                                                </tr>
                                            </thead>
                                            {arrayfiles.map((arrayfile) => (
                                            <tbody id="file-table-body" key={arrayfile.file_id}>
                                                <tr id="file-row">
                                                    <td>
                                                        <span id="file-info">
                                                            <i className="fa-solid fa-file-word"></i>
                                                            <span> {arrayfile.article_id}-{arrayfile.file_id}</span>
                                                            <a href="#"> {arrayfile.file_name} ,<a href="#" id="file-link" title="">{arrayfile.generated_name}</a></a>
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span id="file-date">
                                                            <span>
                                                            {dayjs(arrayfile.updated_at).format("DD/MM/YYYY")} - 
                                                            {dayjs(arrayfile.updated_at).format("HH:mm:ss")}
                                                            </span>
                                                        </span>
                                                    </td>
                                                    
                                                </tr>
                                            </tbody>
                                            ))}
                                        </table>)}

                                    </div>
                                    
                                    <dialog ref={dialog1Ref} className="centered-dialog centered-dialog_2">
                                        <h3>Thảo luận</h3>
                                        <div className="pkp_input_container">
                                        <h5>Nội dung</h5>
                                        <Editor></Editor>
                                        </div>
                                        
                                        

                                        {/* Details about the upload progress */}
                                        <div className="pkp_uploader_details">
                                            <div className="pkp_uploader_progress_bar_wrapper">
                                            <div>
                                                <strong>Tải tập tin lên:</strong>
                                                <label className="custum-file-upload" htmlFor="file" style={{ width:"100%" }}>
                                                    <div className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill viewBox="0 0 24 24"><g strokeWidth={0} id="SVGRepo_bgCarrier" /><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" /><g id="SVGRepo_iconCarrier"> <path fill d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd" /> </g></svg>
                                                    </div>
                                                    <div className="text">
                                                    <span>Click to upload image</span>
                                                    </div>
                                                    <input type="file" id="file" onChange={handleFileChange} />
                                                </label>
                                            </div>

                                            </div>
                                            <span className="pkpUploaderFilename"></span>
                                        </div>
                                        <button className='dia_btn_save' type='submit'>Lưu lại</button>
                                        <button className='dia_btn_close' type="button" onClick={() => closeDialog(dialog1Ref)}>Đóng</button>
                                    </dialog>

                                    <div className="de-ar-tab-panel-controller">
                                        <div className="de-ar-panel-controller-header">
                                            <h4>Thảo luận phản biện</h4>
                                            <h6><a href="#" onClick={() => showDialog(dialog1Ref)} >Tạo cuộc thảo luận</a></h6>
                                        </div>
                                        <table className="de-ar-tab-panel-controller-table">
                                            <colgroup>
                                                <col style={{ width: '40%' }} />
                                                <col style={{ width: '30%' }} />
                                                <col style={{ width: '15%' }} />
                                                <col style={{ width: '15%' }} />
                                            </colgroup>
                                            <thead>
                                                <tr>
                                                    <th scope="col">Nội dung</th>
                                                    <th scope="col">Tệp</th>
                                                    <th scope="col">Người gửi</th>
                                                    <th scope="col">Thời gian</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                <td>
                                                    <span>Nội dung lời nhắn</span>
                                                </td>
                                                <td>
                                                    <span><a href=""><i className="fa-solid fa-file-word"></i> File.docs</a></span>
                                                </td>
                                                <td>
                                                    <span>Tác giả</span>
                                                </td>
                                                <td>
                                                    <span>Ngày tháng năm</span>
                                                    <span>Giờ phút giây</span>
                                                </td>
                                                <td>
                                                <button className="toggle-details-btn" onClick={() => toggleVisibility('row1')}>
                                                    {visibility.row1 ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}
                                                </button>
                                                </td>
                                                </tr>
                                            </tbody>
                                            {visibility.row1 && (
                                            <tbody>
                                                <tr className="details-row">
                                                <td><strong>Phản hồi của biên tập viên:<br /></strong><span>Nội dung phản hồi 1</span></td>
                                                <td><span><a href=""><i className="fa-solid fa-file-word"></i> File1-docs</a></span></td>
                                                <td><span>Biên tập viên 1</span></td>
                                                <td><span>Ngày tháng năm</span></td>
                                                </tr>
                                            </tbody>
                                            )}
                                            <tbody>
                                                <tr>
                                                <td>
                                                    <span>Nội dung lời nhắn</span>
                                                </td>
                                                <td>
                                                    <span><a href=""><i className="fa-solid fa-file-word"></i> File.docs</a></span>
                                                </td>
                                                <td>
                                                    <span>Phản biện viên</span>
                                                </td>
                                                <td>
                                                    <span>Ngày tháng năm</span>
                                                    <span>Giờ phút giây</span>
                                                </td>
                                                <td>
                                                <button className="toggle-details-btn" onClick={() => toggleVisibility('row2')}>
                                                    {visibility.row2 ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>}
                                                </button>
                                                </td>
                                                </tr>
                                            </tbody>
                                            {!data ? (
                                                visibility.row2 && (
                                            <tbody>
                                                <tr className="details-row">
                                                    <td colSpan="3"></td>
                                                    
                                                    <td colSpan="2" style={{ textAlign:"right" }}>
                                                        <span><a href="#" style={{ padding:"10px" }} onClick={() => showDialog(dialog3Ref)}>Phản hồi</a></span>
                                                    </td>
                                                </tr>
                                            </tbody>)
                                            ) : (
                                            visibility.row2 && (
                                                <tbody>
                                                <tr className="details-row">
                                                    <td>
                                                    <strong>Phản hồi của biên tập viên:<br /></strong>
                                                    <span>Nội dung phản hồi 2</span>
                                                    </td>
                                                    <td>
                                                    <span><a href=""><i className="fa-solid fa-file-word"></i> File2-docs</a></span>
                                                    </td>
                                                    <td><span>Biên tập viên 2</span></td>
                                                    <td><span>Ngày tháng năm</span></td>
                                                </tr>
                                                </tbody>
                                            )
                                            )}
                                        </table>
                                        <dialog ref={dialog3Ref} className="centered-dialog centered-dialog_2">
                                            <h3>Phản hồi cuộc thảo luận</h3>
                                            <div className="pkp_input_container">
                                            <h5>Nội dung</h5>
                                            <Editor></Editor>
                                            </div>
                                            {/* Details about the upload progress */}
                                            <div className="pkp_uploader_details">
                                                <div className="pkp_uploader_progress_bar_wrapper">
                                                <div>
                                                <strong>Tải tập tin lên:</strong>

                                                <label className="custum-file-upload" htmlFor="file" style={{ width:"100%" }}>
                                                    <div className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill viewBox="0 0 24 24"><g strokeWidth={0} id="SVGRepo_bgCarrier" /><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier" /><g id="SVGRepo_iconCarrier"> <path fill d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd" /> </g></svg>
                                                    </div>
                                                    <div className="text">
                                                    <span>Click to upload image</span>
                                                    </div>
                                                    <input type="file" id="file" />
                                                </label>
                                                </div>

                                                </div>
                                                <span className="pkpUploaderFilename"></span>
                                            </div>
                                            <button className='dia_btn_save' type='submit'>Lưu lại</button>
                                            <button className='dia_btn_close' type="button" onClick={() => closeDialog(dialog3Ref)}>Đóng</button>
                                        </dialog>
                                    </div>
                                </div>
                            </div>
                        )}
                        </div>

                        <div id="5" className={activeSubTab === '5' ? 'context2 active2' : 'context2'}>
                            
                            <div className="de-ar-tab-panel-widget">
                                <div className="de-ar-tab-panel-content">
                                    <div className="de-ar-tab-panel-pb-details">
                                        <div className="de-ar-pb-header">
                                            <h4>Danh sách thành phần phản biện</h4>
                                        </div>
                                        <div className="de-ar-pb-member-list">
                                            <strong><h6>Tác Giả</h6></strong>
                                            <table className="pb-author-table">
                                                <colgroup>
                                                    <col style={{ width: '40%' }} />
                                                    <col style={{ width: '45%' }} />
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th>Tên tác giả</th>
                                                        <th>Email</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Tên tác giả 1</td>
                                                        <td>author1@example.com</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Tên tác giả 2</td>
                                                        <td>author2@example.com</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="de-ar-pb-member-list">
                                            <strong><h6>Phản biện viên</h6></strong>
                                            <table className="pb-author-table">
                                                <colgroup>
                                                    <col style={{ width: '40%' }} />
                                                    <col style={{ width: '45%' }} />
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th>Tên Phản biện viên</th>
                                                        <th>Email</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Tên Phản biện viên 1</td>
                                                        <td>author1@example.com</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Tên Phản biện viên 2</td>
                                                        <td>author2@example.com</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <Chat></Chat>
                                    </div>

                                </div>
                            </div>
                        </div>
                        
                        <div id="6" className={activeSubTab === '6' ? 'context2 active2' : 'context2'}>
                            {!articleData.article_id ? (
                            <div className="de-ar-tab-panel-widget">
                                Giai đoạn này chưa được khởi tạo.
                            </div>):(
                                <div className="de-ar-tab-panel-widget">
                                    <Discusswithedit></Discusswithedit>
                                </div>
                            )}
                        </div>

                        <div id="7" className={activeSubTab === '7' ? 'context2 active2' : 'context2'}>
                            <div className="de-ar-tab-panel-widget">
                                Giai đoạn này chưa được khởi tạo.
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="2" className={activeTab === '2' ? 'context active' : 'context'}>
                    <div className="pkpListPanel__content">
                    <span><b>Trạng thái:</b> {status}</span>
                    <div className="da_tabs-list">
                            <button 
                                id="btn-8" 
                                className={activeSubTab2 === '8' ? 'da_selected-button' : ''} 
                                onClick={() => showContext3('8')}
                            >
                                Thông tin tiêu đề và mô tả
                            </button>
                            <button 
                                id="btn-9" 
                                className={activeSubTab2 === '9' ? 'da_selected-button' : ''} 
                                onClick={() => showContext3('9')}
                            >
                                Đồng tác giả
                            </button>
                            <button 
                                id="btn-10" 
                                className={activeSubTab2 === '10' ? 'da_selected-button' : ''} 
                                onClick={() => showContext3('10')}
                            >
                                Thông tin bổ sung
                            </button>
                        </div>

                        

                        <div id="8" className={activeSubTab2 === '8' ? 'context3 active3' : 'context3'}>
                            <div className="de-ar-tab-panel-widget">
                                <div className="de-ar-tab-panel-content">
                                    <div className="de-ar-tab-panel-pb-details">
                                        <div className="de-ar-pb-header">
                                            <TitleDA postId={articleId}></TitleDA>
                                        </div>
                                        
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div id="9" className={activeSubTab2 === '9' ? 'context3 active3' : 'context3'}>
                            <div className="de-ar-tab-panel-widget">
                                <div className="de-ar-tab-panel-content">
                                    <div className="de-ar-tab-panel-pb-details">
                                        <div className="de-ar-pb-header">
                                            <h4>Danh sách đồng tác giả</h4>
                                            <Co_auth postId={articleId}></Co_auth>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="10" className={activeSubTab2 === '10' ? 'context3 active3' : 'context3'}>
                            <div className="de-ar-tab-panel-widget">
                                <div className="de-ar-tab-panel-content">
                                    <div className="de-ar-tab-panel-pb-details">
                                        <div className="de-ar-pb-header">
                                            <Addinf postId={articleId}></Addinf>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>

        </div>

    );
}

export default DetailArticle;

