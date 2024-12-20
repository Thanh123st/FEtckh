import React, { useState, useRef } from 'react';
import Editor from '../../components/Editor';
import { Link } from 'react-router-dom';
import HeaderSub, {SlideBar} from "../../components/HeaderSub";
const Revdeatils = () => {
  const dialog1Ref = useRef(null);
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

  const article = {
    id: 1,
    name: 'Ứng dụng AI trong Y học',
    status: 'Đang phản biện',
    deadline: '2024-12-15',
    file: '/files/ai_in_medicine.pdf',
  };
  const [data, setData] = useState(null);
  const [showIframe, setShowIframe] = useState(false);

  const [comments, setComments] = useState("");

  

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
            <div className="rev_container">
            <h1 className="rev_heading">Chi tiết bài viết</h1>
            <div className="rev_details">
                <p><strong>Tên bài viết:</strong> {article.name}</p>
                <p><strong>Trạng thái:</strong> {article.status}</p>
                <p><strong>Hạn phản hồi:</strong> {article.deadline}</p>
                <p><strong>Tệp bài viết:</strong> 
                    <button onClick={() => setShowIframe(!showIframe)} className="rev_link_ifame">Xem bài viết</button>
                </p>
            </div>
            {showIframe && (
            <div className="iframe-container">
                <iframe src={article.file} width="100%" height="600px" title="Bài viết"></iframe>
            </div>
            )}
            {/* Dialog for creating a discussion */}
            <dialog ref={dialog1Ref} className="centered-dialog centered-dialog_2">
                <h3>Thảo luận</h3>
                <div className="pkp_input_container">
                <h5>Nội dung</h5>
                <Editor value={comments} setContent={setComments}/>
                </div>

                {/* Details about the upload progress */}
                <div className="pkp_uploader_details">
                <div className="pkp_uploader_progress_bar_wrapper">
                    <strong>Tải tập tin lên:</strong>
                    <label className="custum-file-upload" htmlFor="file" style={{ width: "100%" }}>
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill viewBox="0 0 24 24">
                        {/* SVG icon here */}
                        </svg>
                    </div>
                    <div className="text">
                        <span>Click to upload image</span>
                    </div>
                    <input type="file" id="file" />
                    </label>
                </div>
                <span className="pkpUploaderFilename"></span>
                </div>
                <button className="dia_btn_save" type="submit">Lưu lại</button>
                <button className="dia_btn_close" type="button" onClick={() => closeDialog(dialog1Ref)}>Đóng</button>
            </dialog>

            {/* Discussion Table */}
            <div className="de-ar-tab-panel-controller">
                <div className="de-ar-panel-controller-header">
                    <h4>Thảo luận phản biện</h4>
                    <h6><a href="#" onClick={() => showDialog(dialog1Ref)}>Tạo cuộc thảo luận</a></h6>
                </div>
                <div className='edt_table_wrapper'>
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
                        <span>Tao nè</span>
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
                        <span>Tao nè</span>
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
                </table></div>
                <dialog ref={dialog3Ref} className="centered-dialog centered-dialog_2">
                    <h3>Phản hồi cuộc thảo luận</h3>
                    <div className="pkp_input_container">
                    <h5>Nội dung</h5>
                    <Editor value={comments} setContent={setComments}></Editor>
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

        </div>
    
  );
};

export default Revdeatils;
