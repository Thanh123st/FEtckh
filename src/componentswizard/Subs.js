import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Wizard.css';
import HeaderSub, { SlideBar } from './HeaderSub';

// Dữ liệu cho các bài viết
const articlesSub1 = [
    { id: '1', author: 'Tên tác giả 1', title: 'Tiêu đề 1', status: 'Trạng thái 1', comments: 2, lastActivity: 'Ngày tháng năm' },
    { id: '2', author: 'Tên tác giả 2', title: 'Tiêu đề 2', status: 'Trạng thái 2', comments: 2, lastActivity: '08/10/2024' },
    // Thêm bài viết khác nếu cần
];

const articlesSub2 = [
    { id: '3', author: 'Tên tác giả 1', title: 'Tiêu đề 1', status: 'Trạng thái 1', comments: 2, lastActivity: 'Ngày tháng năm' },
    { id: '4', author: 'Tên tác giả 2', title: 'Tiêu đề 2', status: 'Trạng thái 2', comments: 2, lastActivity: '08/10/2024' },
    { id: '44', author: 'Tên tác giả 2', title: 'Tiêu đề 2', status: 'Trạng thái 2', comments: 2, lastActivity: '08/10/2024' },
    // Thêm bài viết khác nếu cần
];

function Sub() {
    const [activeTab, setActiveTab] = useState('1');
    const [activeButton, setActiveButton] = useState('1'); // Thêm state để lưu trạng thái button
    const [detailsVisible, setDetailsVisible] = useState({});

    const showContext = (tab) => {
        setActiveTab(tab);
        setActiveButton(tab); // Cập nhật state button khi click vào
    };

    const toggleDetails = (index) => {
        setDetailsVisible((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <div>
            <HeaderSub/>
            <div className="pkp_structure_main">
                <SlideBar></SlideBar>
                <div className="pkp_structure_content">
                    <style>
                        {`
                            .hidden {
                                display: none;
                            }
                        `}
                    </style>
                    <div className="pkp_page_title">
                        <h3>Các bài báo</h3>
                    </div>
                    <div className="pkpTabs">
                        <div className="tabs-list">
                            {/* Thêm class `active` nếu button được click */}
                            <button 
                                onClick={() => showContext('1')}
                                className={activeButton === '1' ? 'active' : ''}
                            >
                                Hàng chờ
                            </button>
                            <button 
                                onClick={() => showContext('2')}
                                className={activeButton === '2' ? 'active' : ''}
                            >
                                Lưu trữ
                            </button>
                        </div>

                        {activeTab === '1' && <Sub1 toggleDetails={toggleDetails} detailsVisible={detailsVisible} />}
                        {activeTab === '2' && <Sub2 toggleDetails={toggleDetails} detailsVisible={detailsVisible} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Sub1({ toggleDetails, detailsVisible }) {
    return (
        <div id="1" className="context active">
            <div className="tabs-nav">
                <h4>Được giao cho tôi</h4>
                <div className="right-group">
                    <div className="nav-search">
                        <input type="text" name="search" placeholder="Tìm kiếm" />
                        <button type="submit" style={{ cursor: 'pointer' }}>
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </div>
                    <Link to="/Wizard">
                        <button className="tabs-nav-button">Gửi bài mới</button>
                    </Link>
                </div>
            </div>
            <div className="pkpListPanel__content">
                <div className="pkpListPanel__empty"> Không tìm thấy bài báo nào. </div>
                {articlesSub1.map((article, index) => (
                    <div key={article.id} className="pkpListPanelItem_summary">
                        <div className="pkpListPanel_Item">
                            <a href="">
                                <div className="pkpPanel_Item_Detail">
                                    <span className="pkpPanel_Item_Detail_span"><strong>ID-bài: {article.id}</strong></span>
                                    <div className="pkpPanel_Item_Detail_nameheading">
                                        <span><p>{article.author}</p></span>
                                        <span><p>{article.title}</p></span>
                                    </div>
                                </div>
                            </a>
                            <div className="pkpListPanelItem_status">
                                <div className="pkpListPanel_Item_Bage">
                                    {article.status}
                                </div>
                                <span style={{ marginTop: '10px', margin: '25px' }}>
                                    <i className="fa-solid fa-comment"></i><span> {article.comments}</span>
                                </span>
                            </div>

                            <button className="pkpListPanelItem__expander" onClick={() => toggleDetails(index)}>
                                <span aria-hidden="true" className={`fa ${detailsVisible[index] ? 'fa-angle-up' : 'fa-angle-down'} toggleIcon`}></span>
                            </button>

                            <div className={`details ${detailsVisible[index] ? '' : 'hidden'}`}>
                                <div className="pkpListPanelItem_haslabel">
                                    <span><i className="fa-solid fa-comment"></i><span> {article.comments}</span></span>
                                    <label htmlFor="text"><span> || </span>Hoạt động cuối cùng được ghi lại vào {article.lastActivity}</label>
                                </div>
                                <Link to="/DetailArticle"><button className="pkpListPanelItem_button">Xem chi tiết</button></Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Sub2({ toggleDetails, detailsVisible }) {
    return (
        <div id="2" className="context active">
            <div className="tabs-nav">
                <h4>Bài nộp được lưu trữ</h4>
                <div className="right-group">
                    <div className="nav-search">
                        <input type="text" name="search" placeholder="Tìm kiếm" />
                        <button type="submit" style={{ cursor: 'pointer' }}>
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </div>
                    <Link to="/Wizard">
                        <button className="tabs-nav-button">Gửi bài mới</button>
                    </Link>
                </div>
            </div>
            <div className="pkpListPanel__content">
                <div className="pkpListPanel__empty"> Không tìm thấy bài báo nào. </div>
                {articlesSub2.map((article, index) => (
                    <div key={article.id} className="pkpListPanelItem_summary">
                        <div className="pkpListPanel_Item">
                            <a href="">
                                <div className="pkpPanel_Item_Detail">
                                    <span className="pkpPanel_Item_Detail_span"><strong>ID-bài: {article.id}</strong></span>
                                    <div className="pkpPanel_Item_Detail_nameheading">
                                        <span><p>{article.author}</p></span>
                                        <span><p>{article.title}</p></span>
                                    </div>
                                </div>
                            </a>
                            <div className="pkpListPanelItem_status">
                                <div className="pkpListPanel_Item_Bage">
                                    {article.status}
                                </div>
                                <span style={{ marginTop: '10px', margin: '25px' }}>
                                    <i className="fa-solid fa-comment"></i><span> {article.comments}</span>
                                </span>
                            </div>
                            <button className="pkpListPanelItem__expander" onClick={() => toggleDetails(index)}>
                                <span aria-hidden="true" className={`fa ${detailsVisible[index] ? 'fa-angle-up' : 'fa-angle-down'} toggleIcon`}></span>
                            </button>
                            <div className={`details ${detailsVisible[index] ? '' : 'hidden'}`}>
                                <div className="pkpListPanelItem_haslabel">
                                    <span><i className="fa-solid fa-comment"></i><span> {article.comments}</span></span>
                                    <label htmlFor="text"><span> || </span>Hoạt động cuối cùng được ghi lại vào {article.lastActivity}</label>
                                </div>
                                <Link to="/DetailArticle"><button className="pkpListPanelItem_button">Xem chi tiết</button></Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sub;
