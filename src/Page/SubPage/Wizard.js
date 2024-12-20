import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Step1 from '../../components/wizard/step1';
import Step2 from '../../components/wizard/step2';
import Step3 from '../../components/wizard/step3';
import Step4 from '../../components/wizard/step4';
import Step5 from '../../components/wizard/step5';
import Sub from './Subs';
import { Contextwizaed } from "../../Context Status/ContextWizard";
import '../../Css/Wizard.css'; 
import { AuthContext } from '../../Context Status/AuthContext';
import LoadingComponent from '../../components/loading';
import HeaderSub, { SlideBar } from '../../components/HeaderSub';

const Wizard = () => {
    const [isAppLoading, setIsAppLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
        setIsAppLoading(false); 
        }, 2000); 

        return () => clearTimeout(timer);
    }, []);
   
    const [currentStep, setCurrentStep] = useState(1);
    const { setCoAuthors,postId,resetAuthState, setChuDe, setGhiChu, setFile, setTitle, setSummary,setKeywords,setCitations, setPostId }= useContext(Contextwizaed);
    const { isStep1Completed,isStep2Completed,isStep3Completed,setIsStep3Completed,isStep4Completed,setIsStep1Completed,setIsStep2Completed,setIsStep4Completed }= useContext(Contextwizaed);

    const { token, apiUrl } = useContext(AuthContext);

    const { idbaiviet } = useParams(); 
    console.log("Lấy từ url",idbaiviet);


    useEffect(() => {
        if (!idbaiviet) {
            setPostId(null);
            resetAuthState();
            setCurrentStep(1);
            setChuDe("1");
            setGhiChu("");
            setFile(null);
            setTitle("");
            setSummary("");
            setKeywords("");
            setCitations("");
            setCoAuthors([]);
        }
    
        return () => {
            console.log('Wizard component will unmount');
            setPostId(null);
            resetAuthState();
            setChuDe("1");
            setGhiChu("");
            setFile(null);
            setTitle("");
            setSummary("");
            setKeywords("");
            setCitations("");
            setCoAuthors([]);
        };
    }, [idbaiviet]);  
    
    
    useEffect(() => {
        if (idbaiviet) {
            const fetchArticleDetail = async () => {
                try {
                    const token = localStorage.getItem('token');
                    const apiUrlWithParams = `${apiUrl}/api/submissions?article_id=${idbaiviet}`;
    
                    const response = await axios.get(apiUrlWithParams, {
                        headers: {
                            Authorization: `Bearer ${token}`, // Thêm token vào header Authorization
                        },
                    });
    
                    console.log("data", response.data[0]);
                    setPostId(idbaiviet);
                    setCurrentStep(response.data[0].current_step+1);
                    if (response.data[0].current_step >= 1) {
                        setIsStep1Completed(true);
                    }
                    
                    if (response.data[0].current_step >= 2) {
                        setIsStep2Completed(true);
                    }
                    
                    if (response.data[0].current_step >= 3) {
                        setIsStep3Completed(true);
                    }

                    console.log("Thành công không check",isStep1Completed,isStep2Completed,isStep3Completed,isStep4Completed);

                } catch (error) {
                    console.error("Lỗi:", error);
                }
            };
    
            fetchArticleDetail();
        }
    }, [idbaiviet]); 

    

    

    
    useEffect(() => {
        if (isStep1Completed) {
            setCurrentStep(2);
        }
    }, [isStep1Completed]);

    useEffect(() => {
        if (isStep2Completed) {
            setCurrentStep(3);
        }
    }, [isStep2Completed]);

    useEffect(() => {
        if (isStep3Completed) {
            setCurrentStep(4);
        }
    }, [isStep3Completed]);

    useEffect(() => {
        if (isStep4Completed) {
            setCurrentStep(5);
        }
    }, [isStep4Completed]);

    const canProceedToStep = (step) => {
        if (step < currentStep) return true; 
        switch (step) {
            case 2:
                return isStep1Completed;
            case 3:
                return isStep2Completed;
            case 4:
                return isStep3Completed;
            default:
                return true;
        }
    };

    const handleStepClick = (step) => {
        if (canProceedToStep(step)) {
            setCurrentStep(step);
        }
    };



    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Step1 />;
            case 2:
                return <Step2 />;
            case 3:
                return <Step3 />;
            case 4:
                return <Step4 />;
            case 5:
                return <Step5 />;
            default:
                resetAuthState(); 
                return <Sub />;
        }
    };

    if (isAppLoading) {
        return <LoadingComponent />; 
    }
    return (
        <div>
            <HeaderSub /> {/* Gọi component HeaderSub */}
            <div className="pkp_structure_main">
                <SlideBar /> {/* Gọi component SlideBar */}
                <div className="pkp_structure_content">
                    <div className="pkp_page_title">
                        <h3>Gửi một bài báo mới</h3>
                    </div>
                    <div className="pkpTabs">
                        <div className="tabs-list">
                            <button
                                className={`tab-button btn-step ${currentStep === 1 ? 'active' : ''}`}
                                onClick={() => handleStepClick(1)}
                                
                            >
                                Bắt đầu
                            </button>
                            <button
                                className={`tab-button btn-step ${currentStep === 2 ? 'active' : ''}`}
                                onClick={() => handleStepClick(2)}
                                disabled={!isStep1Completed && currentStep < 2}
                            >
                                Tải lên bài nộp
                            </button>
                            <button
                                className={`tab-button btn-step ${currentStep === 3 ? 'active' : ''}`}
                                onClick={() => setCurrentStep(3)}
                                disabled={!isStep2Completed && currentStep < 3}
                            >
                                Nhập dữ liệu
                            </button>
                            <button
                                className={`tab-button btn-step ${currentStep === 4 ? 'active' : ''}`}
                                onClick={() => setCurrentStep(4)}
                                disabled={!isStep3Completed && currentStep < 4}
                            >
                                Xác nhận
                            </button>
                            <button
                                className={`tab-button btn-step ${currentStep === 5 ? 'active' : ''}`}
                                onClick={() => setCurrentStep(5)}
                                disabled={!isStep4Completed && currentStep < 5}
                            >
                                Lưu trữ
                            </button>
                        </div>
                        <div className="step-content">
                            {renderStep()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wizard;
