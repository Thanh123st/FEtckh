import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './Wizard.css';
import HeaderSub, { SlideBar } from './HeaderSub';

function DetailArticle() {
    const [activeTab, setActiveTab] = useState('1');
    const [activeSubTab, setActiveSubTab] = useState('4');

    const showContext = (tabId) => {
        setActiveTab(tabId);
    };

    const showContext2 = (subTabId) => {
        setActiveSubTab(subTabId);
    };

    const showPopup = (popupId) => {
        // Implement the logic to show the popup
        alert(`Show popup with ID: ${popupId}`);
    };

    const toggleDetails = (button) => {
        // Implement the logic to toggle details visibility
        const detailsRow = button.closest('tr').nextElementSibling; // Get the next row (details row)
        detailsRow.classList.toggle('hidden'); // Toggle the 'hidden' class
    };

    return (
        <div>
        <HeaderSub/>
        <div className="pkp_structure_main">
            <SlideBar></SlideBar>
            <div className="pkp_structure_content">
            <nav className="cmp-breadcrumb">
                <ol className="breadcrumb">
                    <li>id bài viết</li>
                    <li><strong>Tên tác giả</strong></li>
                    <li>Tiêu đề bài viết</li>                    
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
                        <div className="tabs-list">
                            <button 
                                id="btn-4" 
                                className={activeSubTab === '4' ? 'selected-button' : ''} 
                                onClick={() => showContext2('4')}
                            >
                                Bài nộp
                            </button>
                            <button 
                                id="btn-5" 
                                className={activeSubTab === '5' ? 'selected-button' : ''} 
                                onClick={() => showContext2('5')}
                            >
                                Phản biện
                            </button>
                            <button 
                                id="btn-6" 
                                className={activeSubTab === '6' ? 'selected-button' : ''} 
                                onClick={() => showContext2('6')}
                            >
                                Biên tập
                            </button>
                            <button 
                                id="btn-7" 
                                className={activeSubTab === '7' ? 'selected-button' : ''} 
                                onClick={() => showContext2('7')}
                            >
                                Xuất bản
                            </button>
                        </div>

                        <div id="4" className={activeSubTab === '4' ? 'context2 active2' : 'context2'}>
                            <div className="de-ar-tab-panel-widget">
                                Giai đoạn này chưa được khởi tạo.
                            </div>
                            <div className="de-ar-tab-panel-widget">
                                <div className="de-ar-tab-panel-content">
                                    <div className="de-ar-tab-panel-controller">
                                        <div className="de-ar-panel-controller-header">
                                            <h4>Tệp bài viết</h4>   
                                        </div>

                                        <span className="de-ar-tab-panel-none-file"><em>Không có tệp</em></span>
                                        <table id="de-ar-table" className="de-ar-tab-panel-controller-table">
                                            <colgroup>
                                                <col style={{ width: '75%' }} />
                                                <col style={{ width: '15%' }} />
                                                <col style={{ width: '15%' }} />
                                            </colgroup>
                                            <thead>
                                                <tr>
                                                    <th scope="col" style={{ textAlign: 'center' }}></th>
                                                    <th scope="col" style={{ textAlign: 'left' }}></th>
                                                    <th scope="col" style={{ float: 'right' }}></th>
                                                </tr>
                                            </thead>
                                            <tbody id="file-table-body">
                                                <tr id="file-row">
                                                    <td>
                                                        <span id="file-info">
                                                            <i className="fa-solid fa-file-word"></i>
                                                            <span>6854-1</span>
                                                            <a href="#">Văn bản của bài viết, thanhst84949,<a href="#" id="file-link" title="">eeeee.docx</a></a>
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span id="file-date">
                                                            <span>12/09/2024</span>
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <a href="#" id="edit-file-link" title="Sửa tệp" onClick={() => showPopup(3)}>Chỉnh sửa</a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tbody id="no-file-message" style={{ display: 'none' }}>
                                                <tr>
                                                    <td colSpan="3">Không có tệp</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="de-ar-tab-panel-controller">
                                        <div className="de-ar-panel-controller-header">
                                            <h4>Thảo luận trước phản biện</h4>
                                            <h6><a href="#" onClick={() => showPopup(4)}>Tạo cuộc thảo luận</a></h6>
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
                                                        <span>Tao nè</span>
                                                    </td>
                                                    <td>
                                                        <span>Ngày tháng năm</span>
                                                        <span>Giờ phút giây</span>
                                                    </td>
                                                    <td>
                                                        <button className="toggle-details-btn" onClick={(e) => toggleDetails(e.currentTarget)}>
                                                            <i className="fa-solid fa-angle-down toggleIcon"></i>
                                                        </button>
                                                    </td>
                                                </tr>

                                                <tr className="details-row hidden">
                                                    <td>
                                                        <strong>Phản hồi của biên tập viên:<br /></strong><span>Nội dung</span>
                                                    </td>
                                                    <td>
                                                        <span><a href=""><i className="fa-solid fa-file-word"></i> File.docs</a></span>
                                                    </td>
                                                    <td>
                                                        <span>Biên tập viên</span>
                                                    </td>
                                                    <td>
                                                        <span>Ngày tháng năm</span>
                                                        <span>Giờ phút giây</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tbody id="table-thaoluan">
                                                {/* Các hàng hiện có sẽ được thêm vào đây */}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="5" className={activeSubTab === '5' ? 'context2 active2' : 'context2'}>
                            <div className="de-ar-tab-panel-widget">
                                Giai đoạn này chưa được khởi tạo.
                            </div>
                            <div className="de-ar-tab-panel-widget">
                                <div className="de-ar-tab-panel-content">
                                    <div className="de-ar-tab-panel-pb-details">
                                        <div className="de-ar-pb-header">
                                            <h4>Danh sách thành phần phản biện</h4>
                                        </div>
                                        <div className="de-ar-pb-member-list">
                                            <strong><h6>Tác Giả</h6></strong>
                                            <table className="pb-author-table">
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
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div id="6" className={activeSubTab === '6' ? 'context2 active2' : 'context2'}>
                            <div className="de-ar-tab-panel-widget">
                                Giai đoạn này chưa được khởi tạo.
                            </div>
                        </div>

                        <div id="7" className={activeSubTab === '7' ? 'context2 active2' : 'context2'}>
                            <div className="de-ar-tab-panel-widget">
                                Giai đoạn này chưa được khởi tạo.
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="2" className={activeTab === '2' ? 'context active' : 'context'}>
                    <h2>XUẤT BẢN</h2>
                </div>
            </div>
        </div>
        </div>

        </div>

    );
}

export default DetailArticle;
