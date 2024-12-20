import React, { useState, useContext , useEffect, useNavigate  } from 'react';
import { Link , useParams } from 'react-router-dom';

import '../../Css/Wizard.css'; 
import HeaderSub, { SlideBar } from '../../components/HeaderSub';
import { AuthContext } from '../../Context Status/AuthContext';
import axios from 'axios';
import LoadingComponent from '../../components/loading';

function Sub() {
    const [activeTab, setActiveTab] = useState('1');
    const [activeButton, setActiveButton] = useState('1'); // Thêm state để lưu trạng thái button
    const [detailsVisible, setDetailsVisible] = useState({});
    const { token, apiUrl } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [loadingtime, setLoadingtime] = useState(false);

    useEffect(() => {
        setTimeout(() => {
        setLoadingtime(false);  // Giả lập thời gian tải trang
        }, 2500);
    }, []);


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

    const [ author, setAuthor] = useState("");
    useEffect(() => {
        const getUserData = async () => {
            setLoadingtime(true); // Bắt đầu tải dữ liệu
            try {
                const response = await axios.get(`${apiUrl}/api/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Truy cập đúng vào dữ liệu
                const userData = response.data.data;
                setAuthor(userData.first_name + " " + userData.last_name);
            } catch (error) {
                setError("Lỗi khi lấy dữ liệu");
                console.error("Lỗi khi lấy dữ liệu:", error.response ? error.response.data : error.message);
            } finally {
                setLoadingtime(false); // Kết thúc tải dữ liệu
            }
        };

        getUserData();
    }, [apiUrl, token]);
    
    


    const [articlesSub1, setArticlesSub1] = useState([]);
    

    useEffect(() => {
        const getBaiviet= async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/bai-viet`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data);
                const updatedArticles = response.data.map(article => ({
                    id: article.article_id.toString(),  
                    title: article.title, 
                    status: article.status,
                    comments: article.citations ? article.citations.length : 0,
                    lastActivity: new Date(article.created_at).toLocaleDateString() 
                }));
                setArticlesSub1(updatedArticles);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        getBaiviet();
    }, []);


    

    const [articlesSub2, setArticlesSub2] = useState([]);
    useEffect(() => {
        const getBaiviet= async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/bai-viet1`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data);
                const updatedArticles = response.data.map(article => ({
                    id: article.article_id.toString(), 
                    title: article.title, 
                    status: article.status,
                    comments: article.citations ? article.citations.length : 0,
                    lastActivity: new Date(article.created_at).toLocaleDateString() 
                }));
                setArticlesSub2(updatedArticles);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };
        getBaiviet();
    }, []);
    

    return (
        <div>
      {loadingtime ? (
        <LoadingComponent></LoadingComponent>
      ) : (
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
                    <div className="pkpTabs">
                        <div className="pkp_page_title">
                            <h3>Các bài viết</h3>
                        </div>
                        <div className="tabs-list">
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

                        {activeTab === '1' && <Sub1 toggleDetails={toggleDetails} detailsVisible={detailsVisible} articlesSub1={articlesSub1} author={author} />}
                        {activeTab === '2' && <Sub2 toggleDetails={toggleDetails} detailsVisible={detailsVisible} articlesSub2={articlesSub2} author={author}/>}
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>

    );
}






function Sub1({ toggleDetails, detailsVisible, articlesSub1,author }) {
    console.log("tac gia",author);  
    return (
        <div id="1" className="context active">
            <div className="tabs-nav">
                <h4>Được giao cho tôi</h4>
                <div className="right-group">
                    <div className="nav-search">
                        <input type="text" name="search" placeholder="Tìm kiếm" 
                        
                        />
                        <button type="submit" style={{ cursor: 'pointer' }} >
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </div>
                    <Link to="/wizard">
                        <button className="tabs-nav-button">Gửi bài mới</button>
                    </Link>
                </div>
            </div>
            <div className="pkpListPanel__content">
                { articlesSub1.length === 0 && <div className="pkpListPanel__empty">Không tìm thấy bài báo nào.</div> }
                
                {articlesSub1.map((article, index) => (
                    <div key={article.id} className="pkpListPanelItem_summary">
                        <div className="pkpListPanel_Item">
                            <>
                                <div className="pkpPanel_Item_Detail">
                                    <span className="pkpPanel_Item_Detail_span"><strong>{article.id}</strong></span>
                                    <div className="pkpPanel_Item_Detail_nameheading">
                                        <span><p>{author}</p></span>
                                        <span dangerouslySetInnerHTML={{ __html: article.title }}></span>
                                    </div>
                                </div>
                            </>
                            <div className="pkpListPanelItem_status">
                                <div className="pkpListPanel_Item_Bage">
                                    {article.status}
                                </div>
                                <span style={{ marginTop: '10px', margin: '5px' }}>
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
                                <Link to={`/wizard/${article.id}`}><button className="pkpListPanelItem_button">Xem chi tiết</button></Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Sub2({ toggleDetails, detailsVisible, articlesSub2, author}) {
    return (
        <div id="2" className="context active">
            <div className="tabs-nav">
                <h4>Bài nộp được lưu trữ</h4>
                <div className="right-group">
                    <div className="nav-search">
                        <input type="text" name="search" placeholder="Tìm kiếm" 
                        
                        />
                        <button type="submit" style={{ cursor: 'pointer' }} >
                            <i className="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </div>
                    <Link to="/wizard">
                        <button className="tabs-nav-button">Gửi bài mới</button>
                    </Link>
                </div>
            </div>
            <div className="pkpListPanel__content">
            { articlesSub2.length === 0 && <div className="pkpListPanel__empty">Không tìm thấy bài báo nào.</div> }
            {articlesSub2.map((article, index) => (
                    <div key={article.id} className="pkpListPanelItem_summary">
                        <div className="pkpListPanel_Item">
                            <>
                                <div className="pkpPanel_Item_Detail">
                                    <span className="pkpPanel_Item_Detail_span"><strong>{article.id}</strong></span>
                                    <div className="pkpPanel_Item_Detail_nameheading">
                                        <span><p>{author}</p></span>
                                        <span dangerouslySetInnerHTML={{ __html: article.title }}></span>
                                    </div>
                                </div>
                            </>
                            <div className="pkpListPanelItem_status">
                                <div className="pkpListPanel_Item_Bage">
                                    {article.status}
                                </div>
                                <span style={{ marginTop: '10px', margin: '5px' }}>
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
                                <Link to={`/detailArticle/${article.id}`}><button className="pkpListPanelItem_button">Xem chi tiết</button></Link>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sub;
